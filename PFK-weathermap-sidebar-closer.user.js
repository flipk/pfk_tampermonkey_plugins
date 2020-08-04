// ==UserScript==
// @name         PFK weather map sidebar closer
// @namespace    http://tampermonkey.net/
// @version      2020.0729.1656
// @description  stupid map sidebar is huge and useless, close it
// @author       pfk@pfk.org
// @match        https://weather.com/weather/radar/interactive/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {

    'use strict';

    var clickThatButton = function()
    {
        var count=0, pfkDivs;

        if (0) // just close the sidebar
	{
            pfkDivs = document.getElementsByClassName("styles__MapRightRailDrawerButton__3pAxc");
            if (pfkDivs != undefined)
	    {
                count = pfkDivs.length;
                if (count > 0)
                {
                    pfkDivs[0].click();
                }
            }
        }
	else // go full-window
	{
            pfkDivs = document.getElementsByClassName("styles__Tools__3JYDQ");
            if (pfkDivs != undefined)
	    {
                count = pfkDivs.length;
                if (count > 0)
                {
                    pfkDivs[0].lastElementChild.firstChild.click();
                }
            }
        }

        if (count == 0)
	{
            window.setTimeout(clickThatButton, 2000);
        }
    }

    window.setTimeout(clickThatButton, 5000);

})();
