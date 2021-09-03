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

    var bgUrl = "https://4122a438-a-62cb3a1a-s-sites.googlegroups.com/site/phillipfknaack/home/pics/batarang/batarang_2_1280x1024.png";
    var bg = "background-image:url(" + bgUrl + ");" +
        "width: 100%;" +
        "height: 100%;" +
        "background-size: cover;" +
        "background-position: center;";

    var setBackground = function() {
        var bgSet = 0;
        var pfkDivs = document.getElementsByClassName("wl");
        if (pfkDivs !== undefined)
        {
            var pfkDiv = pfkDivs[0];
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

})();
