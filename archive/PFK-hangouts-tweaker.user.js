// ==UserScript==
// @name         PFK hangouts tweaker
// @namespace    http://tampermonkey.net/
// @version      2020.0813.2130
// @description  make unread things red
// @author       pfk@pfk.org
// @match        https://hangouts.google.com/webchat/*
// @grant        GM_addStyle
// ==/UserScript==

// Klz5ue Bb xZYdOe f0 ko CN Bm b3KmC XP ee
// Klz5ue Bb xZYdOe f0 ko CN Bm b3KmC XP

(function() {

    'use strict';

    var pfkHangoutValues = {};

    pfkHangoutValues.msgBGColor = "#a9b1ba"; // lighter
    pfkHangoutValues.cardBGColor = "#657d99"; // darker
    pfkHangoutValues.dayBGColor = "#395b82"; // even darker
    pfkHangoutValues.windowBackground = "#121F36"; // darkest
    pfkHangoutValues.dateColor = "#cccc00"; // yellow
    pfkHangoutValues.textColor = "#000000"; // black
    pfkHangoutValues.iterations = 0;
    pfkHangoutValues.count1=0;

    function turnStuffRed()
    {

        pfkHangoutValues.iterations++;

//      console.log("PFK hangouts unread timer, iterations = ", iterations, "count1 = ",count1);

        var ind, d, dd;
        /* first reset all entries */
        d = document.getElementsByClassName("Klz5ue");
        if (d)
	{
            for (ind = 0; ind < d.length; ind++)
            {
                dd = d[ind].getElementsByClassName("Xk");
                if (dd && dd[0])
                {
                    dd[0].setAttribute("style","");
                }
            }
            if (d.length > 0)
            {
                pfkHangoutValues.count1 ++;
            }
            if (pfkHangoutValues.count1 == 1)
            {
                // on the 0-to-1 transition, install the debug div.
                // debug trick! make a non-displaying div at the end
                // of <body> and hide the data-model object as a new
                // member of that div, so you can access it from the
                // console using (e.g.):
                //    v = document.getElementById("pfkHangoutValues").pfkHangoutValues
                //    v.userInfo
                // TODO : add functions to this object so you can change stuff
                //        on the fly!

                dd = document.createElement("div");
                dd.style.display = "none";
                dd.id = "pfkHangoutValues";
                dd.pfkHangoutValues = pfkHangoutValues;
                d = document.getElementsByTagName("body");
                d[0].appendChild(dd);
            }
        }

        /* this finds a hangouts user with unread messages (has "ee") and turns the icon red */
        d = document.getElementsByClassName("ee");
        if (d)
	{
            for (ind = 0; ind < d.length; ind++)
            {
                dd = d[ind].getElementsByClassName("Xk");
                if (dd && dd[0])
                {
                    dd[0].setAttribute("style","background-color:red");
                }
            }
        }

        if (pfkHangoutValues.iterations > 6 && pfkHangoutValues.count1 == 0)
        {
//          console.log("PFK hangouts unread found nothing, giving up");
        }
        else
        {
            window.setTimeout(turnStuffRed, 5000);
        }
    }
    window.setTimeout(turnStuffRed, 5000);

    // background color for the whole conversation window
    GM_addStyle(".fkp8p      { background-color: "+pfkHangoutValues.cardBGColor+";}");
    // background for the other person's "ive read to here" avatar
    GM_addStyle(".so.Fj>.xA  { background-color: "+pfkHangoutValues.cardBGColor+";}");
    // background and typing box for 'where i type'
    GM_addStyle(".My         { background-color: "+pfkHangoutValues.cardBGColor+";}");
    GM_addStyle(".vE         { background-color: "+pfkHangoutValues.msgBGColor +";"+
                "              border-radius: 5px; margin-left: 4px;}");
    // other person's inbound message background, and that little tail
    GM_addStyle(".Sn .KRQuhe { background-color: "+pfkHangoutValues.msgBGColor +"; }");
    GM_addStyle(".Sn .jHldnd { border: 8px solid "+pfkHangoutValues.msgBGColor +"; }");
    // my outbound message background, and it's tail
    GM_addStyle(".pj .KRQuhe { background-color: "+pfkHangoutValues.msgBGColor +"; }");
    GM_addStyle(".pj .jHldnd { border: 8px solid "+pfkHangoutValues.msgBGColor +"; }");

    // animate the box that appears when the other person is typing
    GM_addStyle(".iF9mle.V8WHrc { transition: all .2s linear .2s; }");

})();
