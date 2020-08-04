// ==UserScript==
// @name         PFK gmail unread red
// @namespace    http://tampermonkey.net/
// @version      2020.0729.1653
// @description  make unread stuff red
// @author       pfk@pfk.org
// @match        https://mail.google.com/mail/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {

    'use strict';

    function turnStuffRed() {

        var ind, d;

        /* turns out i don't need this, gmail does this for you
        d = document.getElementsByClassName("n0");
        if (d)
        {
            for (ind = 0; ind < d.length; ind++)
            {
                d[ind].setAttribute("style","");
            }
        }
        */

        d = document.getElementsByClassName("bsU");
        if (d)
	{
            for (ind = 0; ind < d.length; ind++)
            {
                var dd = d[ind].parentNode.parentNode.getElementsByTagName("a");
                if (dd && dd[0])
                {
                    dd[0].setAttribute("style","color:red");
                }
            }
        }
    }

    window.setInterval(turnStuffRed, 2000);

})();
