// ==UserScript==
// @name         PFK chat tweaker
// @namespace    http://tampermonkey.net/
// @version      2020.0902.0923
// @description  make unread things red
// @author       pfk@pfk.org
// @match        https://chat.google.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {

    'use strict';

    var i, d, dd, ddd, ind;
    var pfkChatValues = {};

    pfkChatValues.msgBGColor = "#a9b1ba"; // lighter
    pfkChatValues.cardBGColor = "#657d99"; // darker
    pfkChatValues.dayBGColor = "#395b82"; // even darker
    pfkChatValues.windowBackground = "#121F36"; // darkest
    pfkChatValues.dateColor = "#cccc00"; // yellow
    pfkChatValues.textColor = "#000000"; // black
    pfkChatValues.count1=0;
    pfkChatValues.intervals=0;
    pfkChatValues.moreInstalled=false;
    pfkChatValues.moreVisible=false;
    pfkChatValues.botsHidden=false;
    pfkChatValues.userInfo = new Map();

    // debug trick! make a non-displaying div at the end
    // of <body> and hide the data-model object as a new
    // member of that div, so you can access it from the
    // console using (e.g.):
    //    v = document.getElementById("pfkChatValues").pfkChatValues
    //    v.userInfo
    // TODO : add functions to this object so you can change stuff
    //        on the fly!

    dd = document.createElement("div");
    dd.style.display = "none";
    dd.id = "pfkChatValues";
    dd.pfkChatValues = pfkChatValues;
    d = document.getElementsByTagName("body");
    d[0].appendChild(dd);

    function turnStuffRed() {
        pfkChatValues.intervals++;
//dbg   console.log("PFK chat unread timer, intervals = ",intervals,"count1 = ",count1);

        // this plugin gets fired multiple times on a single page,
        // but only one is inside the iframe containing the DOM that we
        // want to watch and modify. all the other instances need to
        // eventually die off. so search for the div that holds contact
        // names, and if it is never found, the timer that fires this
        // code is stopped.
        if (pfkChatValues.count1 == 0) {
            d = document.getElementsByClassName("njhDLd");
            if (d && d[0]) {
                pfkChatValues.count1++;
            }
        }

        // closing a conversation button
        dd = document.getElementsByClassName("wYx9me");
        if (dd.length == 1)
        {
            // if a conversation is open, check if it has a close button
            if (document.getElementById("pfkClose") == null)
            {
                // if it doesn't have a close button, add one
                d = document.createElement("div");
                d.innerHTML =
                    '<button id="pfkClose"'+
                    '        style="height:20px;'+
                    '               margin-top:11px;'+
                    '               border: solid 1px black;'+
                    '               border-radius: 6px;'+
                    '               background-color:'+pfkChatValues.cardBGColor+';">'+
                    'X'+
                    '</button>';
                d.firstChild.onclick = function() {
                    // find the "<" (even when it's hidden, it's there)
                    var d3 = document.getElementsByClassName("ETeOHc");
                    if (d3.length > 0) {
                        // and click it.
                        d3[0].click();
                    }
                };
                dd[0].insertBefore(d,dd[0].firstChild);
            }
        }

        var dateObj = new Date();
        var timeNow = dateObj.getTime();

        // spans with class="IL9EXe PL5Wwe dHI9xe rcdhB WD3P7" are contacts.
        // add "qs41qe" class for selected.
        // add "H7du2" if it has unread messages.
        // this span also has a unique "id".

        if (0) // this is now done with a ".H7du2 .njhDLd" rule
        {
            // find every contact which has the "unread" class on it.
            d = document.getElementsByClassName("H7du2");
            if (d) {
                for (ind = 0; ind < d.length; ind++) {
                    // descend into that contact and find the div
                    // with the contact's name in it.
                    dd = d[ind].getElementsByClassName("njhDLd");
                    if (dd && dd.length > 0) {
//equivalent            dd[0].setAttribute("style","color:red");
//equivalent            dd[0].style.setProperty("color","red");
                        dd[0].style.color = "red";
                    }
                }
            }
        }

        // loop over all contacts
        dd = document.getElementsByClassName("IL9EXe");
        for (ind = 0; ind < dd.length; ind++)
        {
            d = dd[ind].getElementsByClassName("Qgwczb"); // is the dot green?
            ddd = dd[ind].getElementsByClassName("FvYVyf"); // the time of last message span
            if (d && ddd && ddd.length > 0)
            {
                var thisUser = pfkChatValues.userInfo.get(dd[ind].id);
                if (thisUser == undefined)
                {
                    thisUser = { lastActiveTime: 0 };
                    pfkChatValues.userInfo.set(dd[ind].id,thisUser);
                    var usernameSpan = dd[ind].getElementsByClassName("njhDLd");
                    if (usernameSpan.length > 0)
                    {
                        // for debug
                        thisUser.username = usernameSpan[0].innerText;
                        pfkChatValues.userInfo[thisUser.username] = thisUser;
                    }
                }

                if (d.length > 0)
                {
                    // the dot is green.
                    ddd[0].innerText = "";
                    thisUser.lastActiveTime = timeNow;
                }
                else
                {
                    // the dot is not green.
                    // time is in units of milliseconds.
                    var timeDiff = (timeNow - thisUser.lastActiveTime) / 1000;
                    if (thisUser.lastActiveTime == 0)
                    {
                        timeDiff = ""; // just show "idle"
                    }
                    else if (timeDiff < 120)
                    {
                        timeDiff = Math.trunc(timeDiff) + "s";
                    }
                    else if (timeDiff < 3600)
                    {
                        timeDiff = Math.trunc(timeDiff / 60) + "m";
                    }
                    else if (timeDiff < 86400)
                    {
                        var timeDiffHours = Math.trunc(timeDiff / 3600);
                        timeDiff = timeDiff - (timeDiffHours * 3600);
                        timeDiff = timeDiffHours + "h " + Math.trunc(timeDiff / 60) + "m";
                    }
                    else
                    {
                        var timeDiffDays = Math.trunc(timeDiff / 86400);
                        timeDiff = timeDiff - (timeDiffDays * 86400);
                        timeDiff = timeDiffDays + "d " + Math.trunc(timeDiff / 3600) + "h";
                    }
                    ddd[0].innerText = "idle " + timeDiff;
                }
            }
        }

        // CHAT +more
        if (pfkChatValues.moreInstalled == false)
        {
            var more_dd;
            if (document.getElementsByClassName("qa7SYc").length > 0) // in gmail tab only!
            {
                // qa7SYc is only used in a gmail tab, that's how we know we're
                // running as a gmail plugin and not as a PWA.
                d = document.getElementsByClassName("aOHsTc");
                if (d && d.length > 0)
                {
                    // there's two aOHsTc, one for CHAT and one for ROOMS;
                    // d[0] is the CHAT one so that's where we'll put our button.
                    more_dd = document.createElement("span");
                    more_dd.setAttribute("id","pfkMoreContacts");
                    more_dd.style.setProperty("cursor","pointer");
                    more_dd.innerText = "+more";
                    more_dd.onclick = function() {
                        // XXPYvf is where the remainder of the contacts
                        // are populated, lets toggle it's visibility.
                        var more_d = document.getElementById("XXPYvf");
                        if (more_d)
                        {
                            if (pfkChatValues.moreVisible)
                            {
                                // make the "more" contacts disappear
//equivalent                    more_d.setAttribute("style","display:none");
//equivalent                    more_d.style.setProperty("display","none");
                                more_d.style.display = "none";
                                pfkChatValues.moreVisible = false;
                                more_dd.innerText = "+more";
                            }
                            else
                            {
                                // make the "more" contacts display
//equivalent                    more_d.setAttribute("style","display:block");
//equivalent                    more_d.style.setProperty("display","block");
                                more_d.style.display = "block";
                                more_dd.innerText = "-less";
                                pfkChatValues.moreVisible = true;
                            }
                        }
                    };
                    d[0].appendChild(more_dd);
                    pfkChatValues.moreInstalled = true;
                }
            }
            else
            {
                // this ID only exists in the chat PWA app. it is
                // the div containing "CHAT" and the first 6 contacts.
                d = document.getElementById("c6vFhc/tJHJj");
                if (d)
                {
                    more_dd = document.createElement("span");
                    more_dd.setAttribute("id","pfkMoreContacts");
                    more_dd.style.setProperty("cursor","pointer");
                    more_dd.innerText = "+more";
                    more_dd.onclick = function() {
                        // XXPYvf is where the remainder of the contacts
                        // are populated, lets toggle it's visibility.
                        var more_d = document.getElementById("XXPYvf");
                        if (more_d)
                        {
                            if (pfkChatValues.moreVisible)
                            {
                                // make the "more" contacts disappear
//equivalent                    more_d.setAttribute("style","display:none");
//equivalent                    more_d.style.setProperty("display","none");
                                more_d.style.display = "none";
                                pfkChatValues.moreVisible = false;
                                more_dd.innerText = "+more";
                            }
                            else
                            {
                                // make the "more" contacts display
//equivalent                    more_d.setAttribute("style","display:block");
//equivalent                    more_d.style.setProperty("display","block");
                                more_d.style.display = "block";
                                more_dd.innerText = "-less";
                                pfkChatValues.moreVisible = true;
                            }
                        }
                    };
                    // put the more-button inside the div containing "CHAT"
                    d.firstChild.firstChild.appendChild(more_dd);
                    pfkChatValues.moreInstalled = true;
                }
            }
        }

        // the "+" button inside the chat box is too tall
        GM_addStyle(".gNOOBf {height:17px;} " +
                    ".cq5Gac {height:20px;}");

        if (pfkChatValues.botsHidden == false)
        {
            // hide "BOTS", wtf? i'm never going to use that.
            d = document.getElementById("MLa5Sb/tJHJj");
            if (d) {
//equivalent    d.setAttribute("style","display:none");
//equivalent    d.style.setProperty("display","none");
                d.style.display = "none";
                pfkChatValues.botsHidden = true;
            }
        }

        if (pfkChatValues.intervals > 5 && pfkChatValues.count1 == 0) {
//dbg       console.log("PFK chat unread found nothing, giving up");
        } else {
            window.setTimeout(turnStuffRed, 2000);
        }
    }

    // start the clock ticking.
    window.setTimeout(turnStuffRed, 2000);

    // Contact list background, username background, selected username background
    GM_addStyle(".teTAFe {background-color:" + pfkChatValues.cardBGColor + ";" +
		"         border-radius:0px;"+
		"         margin:2px;}");
    GM_addStyle(".njhDLd {color: " + pfkChatValues.textColor + ";}");

    // most recent message preview color
    GM_addStyle(".RsRwdf {color: " + pfkChatValues.textColor + ";}");

    // scrunch the contacts and more-contacts panels together and square them up
    GM_addStyle(".teTAFe.IkYAKb {border-radius:0px; margin-bottom:0px;}");
    GM_addStyle(".teTAFe.KLLiS.iiAEw.K8Zd6e {border-radius:0px; margin-top:0px;}");

    // get rid of "more" header.
    GM_addStyle("span.IL9EXe.PL5Wwe.tuKyod.RQw3Sd {display:none;}");

    // scrunch up the usernames to take up stupid whitespace;
    // also get rid of huge left-padding
    GM_addStyle(".LoYJxb {height:32px;}");
    GM_addStyle(".t5F5nf, .wR3Nid {line-height:12px;}");
    GM_addStyle(".Eb3cg, .nz9RLc {padding-left:5px;}");

    // color of a selected user; note that the top-level span
    // for a user adds the class "qs41qe" when the row is selected
    GM_addStyle("div .dHI9xe.qs41qe { background-color: "+pfkChatValues.msgBGColor+"; }");
    // square off the silly looking rounds
    GM_addStyle(".PL5Wwe {border-bottom-right-radius: 0px;"+
                "         border-top-right-radius:    0px;}");

    // make a user's name turn red when he has unread messages
    GM_addStyle(".H7du2 .njhDLd {color:red;}");

    // make the unread count badge not red, because reasons
    GM_addStyle(".EdWvwd { border: solid 2px #5c4e3d; background-color: sienna; }");

    // conversations in squished chat windows need to nudge the
    // cards just a the tiniest bit away from the edge
    GM_addStyle(".Bl2pUd {margin-left:2px};}");

    // section headers ("STARRED","CHAT","ROOMS","BOTS")
    // take up way too much space, scrunch them up.
    GM_addStyle(".aOHsTc {margin-top:1px; height:24px;}");

    // "find" box is way too big, and font too big
    GM_addStyle(".GbZFNe { min-height:30px; }");
    GM_addStyle(".d6pS5 { min-height:32px; }");
    GM_addStyle(".HLTcjb {font-size:0.6rem;}");
    // get rid of the glowy shit around the find box
    GM_addStyle(".d6pS5 {box-shadow:none;}");

    // don't allow text selection in the contact list
    GM_addStyle(".yxIv1d {user-select:none;}");

    // margin on message cards is too big
    GM_addStyle(".XbbXmb:not(:last-child) .hu21Y     {margin-bottom:2px;}");
    GM_addStyle(".XbbXmb.zzVqCe+.ajCeRb:not(.zzVqCe) {padding-top:3px;}");
    GM_addStyle(".WQKmIb .ajCeRb:not(.zzVqCe)        {padding-top:3px;}");
    // put a little margin between msgs
    GM_addStyle(".XbbXmb.zzVqCe {padding:0px;}");

    // waste of space to the left and right of every msg
    GM_addStyle(".jGyvbd {margin-left:5px; padding:0px;}");

    // make 'last message' span visible all the time
    GM_addStyle(".sFuxxd { display:flex; }");
    // make 'last message' span colored differently when the contact
    // is selected (so it's still readable)
    GM_addStyle(".WD3P7.qs41qe .FvYVyf {color:black;}");

    // Card background around a contiguous group of messages
    let cards = [".dsoUjb", ".oGsu4", ".HTZBof", ".AflJR"];
    for(i=0; i<cards.length; i++) {
        GM_addStyle(cards[i] + '{background-color: ' + pfkChatValues.cardBGColor + ';}');
    }

    // text too close to the scrollbar looks scrunched and
    // makes you think it's actually clipping something --
    // add a small pad.
    GM_addStyle(".oGsu4 {padding-right:5px;}");
    // border-radius on messages looks silly
    GM_addStyle(".dsoUjb {border-radius:0px;}");

    // nudge picture down a few pixels to make a prettier margin
    GM_addStyle(".HTZBof {margin-top:5px;}");

    // Contents of each message within a card
    GM_addStyle(".zlPNZe {background-color: " + pfkChatValues.msgBGColor + ";}");

    // The little divider that separates days
    GM_addStyle(".mCOR5e {background-color: " + pfkChatValues.dayBGColor + ";}");

    // The date string on a card, and the date in the day-separators
    GM_addStyle(".FvYVyf {color:" + pfkChatValues.dateColor + "; font-style: italic; }");
    GM_addStyle(".QQodff .FvYVyf {color:" + pfkChatValues.dateColor + ";}");

    // make the day separators smaller vertically
    GM_addStyle(".WQKmIb .k1lILc, .WQKmIb .n5uYMe { height:15px; }");
    GM_addStyle(".A2BXPe.n5uYMe.pYTmjf.mCOR5e { padding:0px; margin:2px; }");

    // where you type, the div with all the icons in it is too tall,
    // and the box expands ridiculously
    GM_addStyle(".EFNTcf, .CfUpN {min-height:30px;}");
    GM_addStyle(".igYHTd {min-height:10px;}");
    GM_addStyle(".oAzRtb {padding:9px;}");
    GM_addStyle(".wAZd3e {width:22px; margin:0px;}");
    GM_addStyle(".LsSwGf {width:30px;}");
    GM_addStyle(".WQKmIb .IEIJqd .XganBc {padding-bottom:2px; padding-top:2px;}");
    GM_addStyle(".Ct5IYc {padding-bottom:8px;}");
    // when window is squished to one conversation, the typing box is still too big
    GM_addStyle(".IEIJqd .BScnzc {padding-bottom:0px;}");

    // the colors where you type
    GM_addStyle(".PhFuQe.yXgmRe .dJ9vNe { background: transparent;}");
    GM_addStyle(".XganBc {background-color: "+pfkChatValues.msgBGColor+" ;"+
                "         border-radius: 0px; }");

    // when someone is typing, a div with class "bNfiFb" becomes "bNfiFb qs41qe"

    // "CHAT" logo at top is too tall
    GM_addStyle(".DWzK6d { height:48px; }");
    // colorize the background up there, left side, then right
    GM_addStyle(".Riuhhf {background-color:" + pfkChatValues.cardBGColor + ";"+
                "         border-right: 0px;}");
    GM_addStyle(".QTQg5e {background-color:" + pfkChatValues.cardBGColor + ";"+
                "         border-bottom: 0px; }");
    // active status on conversation panel
    GM_addStyle(".W44DQ .ejd9mb { color:black; }");

    // chat icon is too big, and spice it up a bit
    var chatNodes = document.getElementsByClassName("SZ9zpc");
    if(chatNodes.length >= 1) {
        var headerDiv = document.createElement("div");
        headerDiv.innerHTML =
            '<div style="padding-left:15px; padding-top:7px;' +
            ' font-size: 32px; color:black;">💩 Chat</div>';
        var chatNode = chatNodes[0];
        chatNode.replaceChild(headerDiv, chatNode.firstChild);
    }

    // background of entire contact and conversation windows
    GM_addStyle(".WK4gNc { background-color: " + pfkChatValues.windowBackground + "; }");
    GM_addStyle(".WQKmIb .Bl2pUd { background-color: " + pfkChatValues.windowBackground + "; }"); // closed
    GM_addStyle(".DLc2vb .Bqp03e { background-color: " + pfkChatValues.windowBackground + "; }"); // open
    // tiny little border to the right of contacts
    GM_addStyle(".X9KLPc { border-right: solid 1px black; }");
    // around conversation window and around where you type
    GM_addStyle(".bzJiD { background-color: black; }");

    // make the 'where you type' go all the way left and right,
    // but leave a small gap from the words above
    GM_addStyle(".byY7Yb.cFc9ae {padding-left:0px;"+
                "                padding-right:0px;"+
                "                padding-top:4px;}");

    // scrollbars!
    GM_addStyle(
        "::-webkit-scrollbar-track {"+
        "box-shadow: inset 0 0 6px " + pfkChatValues.cardBGColor + ";"+
        "border-radius: 10px; }");
    GM_addStyle(
        "::-webkit-scrollbar-thumb {"+
        "border-radius: 10px; background: " + pfkChatValues.cardBGColor + ";"+
        "box-shadow: inset 0 0 6px " + pfkChatValues.msgBGColor + "; }");
    GM_addStyle(
        "::-webkit-scrollbar-thumb:hover {"+
        "background: " + pfkChatValues.cardBGColor + ";"+
        "box-shadow: inset 0 0 6px " + pfkChatValues.msgBGColor + "; }");
    GM_addStyle(
        "::-webkit-scrollbar-thumb:window-inactive {"+
        "background: " + pfkChatValues.cardBGColor + ";" +
        "box-shadow: inset 0 0 6px " + pfkChatValues.msgBGColor + "; }");

})();
