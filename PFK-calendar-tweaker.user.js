// ==UserScript==
// @name         PFK calendar tweaker
// @namespace    http://tampermonkey.net/
// @version      2023.0111.1130
// @description  stupid corp conference room names are sooooo wide
// @author       pfk@pfk.org
// @match        https://calendar.google.com/calendar/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var config = { known : false, gmail : false };
    var columnCounter = 0;

    function removeToolTip(classname) {
        var pfkDivs, count, d, ind;
        pfkDivs = document.getElementsByClassName(classname);
        if (pfkDivs != undefined) {
            count = pfkDivs.length;
            for (ind = 0; ind < count; ind++) {
                d = pfkDivs[ind];
                d.removeAttribute("data-text");
                d.removeAttribute("data-tooltip");
            }
        }
    }

    function disableToolTips() {
        removeToolTip("U26fgb");
        removeToolTip("NI2kfb");
        if (config.known == false || config.gmail == false) {
            window.setTimeout(disableToolTips,2000);
        } else {
//          console.warn("PFK disabling toolTip changer because gmail");
        }
    }

    disableToolTips();

    function shortenCrNames(classname) {
        var pfkDivs, d, ind, count = 0;
        pfkDivs = document.getElementsByClassName(classname);
        if (pfkDivs != undefined) {
            count = pfkDivs.length;
            for (ind = 0; ind < count; ind++) {
                d = pfkDivs[ind];
                var t = d.innerText;
                if (t.startsWith("IL06-SCHAUMBURG-0")) {
                    d.innerText = t.substring(17,80);
                } else if (t.startsWith("IL06-SCHAUMBURG-VIDEO-0")) {
                    d.innerText = t.substring(23,80);
                }
            }
        }
        return count;
    }

    var setCrNames = function() {
        var ind;
        // class name "JClzi" is the <span> in an event containing a room name
        // "K9QN7e" is in some large (all day?) events.
        var pfkDivs;
        if (config.known == false || config.gmail == false) {
//dbg       console.warn("PFK looking for calendar's divs");
            var count = shortenCrNames("toUqff");
            if (count > 0) {
//dbg           console.warn("PFK found calendar, setting gmail to false");
                config.gmail = false;
                config.known = true;
            }
        }
        if (config.known == false || config.gmail == true) {
//dbg       console.warn("PFK looking for gmail calendar's divs");
            // class name "gOSbGe" is the <span> in gmail calendar containing a room name
            if (shortenCrNames("gOSbGe") > 0) {
//dbg           console.warn("PFK found gmail, setting gmail to true");
                config.gmail = true;
                config.known = true;
            }
        }
        window.setTimeout(setCrNames,2000);
    };

    setCrNames();

})();

// Local Variables:
// mode: javascript
// indent-tabs-mode: nil
// tab-width: 8
// eval: (add-hook 'write-file-functions 'time-stamp)
// time-stamp-start: "@version      "
// time-stamp-format: "%Y.%02m%02d.%02H%02M"
// time-stamp-end: "$"
// End:
