// ==UserScript==
// @name         PFK calendar tweaker
// @namespace    http://tampermonkey.net/
// @version      2020.0729.1648
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

// conference room name : NI2kfb qZvm2d-ibnC6b-bN97Pc DX3x9d
// unsub button : U26fgb mUbCce fKz7Od rF3YF uRguKd TJ2tCc qZvm2d-ibnC6b-JIbuQc M9Bg4d
// options button : U26fgb JRtysb WzwrXb rF3YF uRguKd TJ2tCc qZvm2d-ibnC6b-JIbuQc

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
                if (t.startsWith("CR-IL06-VIDEO-0")) {
                    d.innerText = t.substring(15,80);
                } else if (t.startsWith("CR-IL06-0")) {
                    d.innerText = t.substring(9,80);
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
            var count = shortenCrNames("JClzi");
            count += shortenCrNames("K9QN7e");
            count += shortenCrNames("NI2kfb");
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
