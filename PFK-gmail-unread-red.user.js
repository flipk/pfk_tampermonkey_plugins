// ==UserScript==
// @name         PFK gmail unread red
// @namespace    http://tampermonkey.net/
// @version      2020.1007.2050
// @description  make unread stuff red
// @author       pfk@pfk.org
// @match        https://mail.google.com/mail/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {

    'use strict';

    // the "n1" class is added to unread folder names
    GM_addStyle(".TO .nU.n1>.n0 { color:red; }");

    if (0) // THE OLD WAY!!!
    {
        function turnStuffRed() {
            var ind, d;
            d = document.getElementsByClassName("bsU");
            if (d) {
                for (ind = 0; ind < d.length; ind++) {
                    var dd = d[ind].parentNode.parentNode.getElementsByTagName("a");
                    if (dd && dd[0]) {
                        dd[0].setAttribute("style","color:red");
                    }
                }
            }
        }
        window.setInterval(turnStuffRed, 2000);
    }

})();
