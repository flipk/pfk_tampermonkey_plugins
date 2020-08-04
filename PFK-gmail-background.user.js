// ==UserScript==
// @name         PFK gmail background
// @namespace    http://tampermonkey.net/
// @version      2020.0729.1648
// @description  stupid corp config won't let you set a custom background in gmail tab, so this script will set one for you.
// @author       You
// @match        https://mail.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var bg = "background-image:url(https://4122a438-a-62cb3a1a-s-sites.googlegroups.com/site/phillipfknaack/home/pics/batarang/batarang_2_1280x1024.png)";
// "background:#102030;"

    var setBackground = function() {
        var bgSet = 0;
        var pfkDivs = document.getElementsByClassName("no");
        if (pfkDivs !== undefined)
        {
            var pfkDiv = pfkDivs[1];
            if (pfkDiv !== undefined)
            {
                pfkDiv.setAttribute("style",bg);
                bgSet = 1;
            }
        }

        if (bgSet === 0)
        {
//          console.warn("PFK Gmail Background Setter did not find the right div");
            window.setTimeout(setBackground,2000);
        }
    };

    setBackground();

    // set "a3s" and "g6" to font-family Roboto, font-size 120%
    function setfonts(classname) {
        var ind, pfkDivs = document.getElementsByClassName(classname);
        if (pfkDivs != undefined) {
            for (ind = 0; ind < pfkDivs.length; ind++) {
                var d = pfkDivs[ind];
                d.setAttribute("style","font-family:Roboto; font-size:120%");
            }
        }
    }

    var setTextFonts = function() {
        setfonts("a3s"); // expanded messages
        setfonts("g6"); // one-line preview unexpanded message
        setfonts("editable"); // compose box
        window.setTimeout(setTextFonts,2000);
    };

// disabled because it sucks    setTextFonts();

})();
