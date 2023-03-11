// ==UserScript==
// @name         PFK chat tweaker
// @namespace    http://tampermonkey.net/
// @version      2023.0310.1837
// @description  chat3 tweaker3
// @author       pfk@pfk.org
// @match        https://chat.google.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {

    'use strict';

    var configSettings = {};

    configSettings.msgBGColor = "#a9b1ba"; // lighter
    configSettings.cardBGColor = "#657d99"; // darker
    configSettings.dayBGColor = "#395b82"; // even darker
    configSettings.windowBackground = "#121F36"; // darkest
    configSettings.dateColor = "#cccc00"; // yellow
    configSettings.textColor = "#000000"; // black

    //<c-wiz jsrenderer="MhqlIf" class="SSPGKf aM97s ZCbGl tRuV8b uooVCd qa7SYc Pc6wn n0GTjf Ni4E7e"
    //  <div class="T4LgNb" jsname="a9kxte">
    //    <div jsname="qJTHM" class="kFwPee">
    //      <div class="RWqrJc AjjIA tI2DJ DgPCpc">
    //        <div class="vIO7af ">
    //          <div class="Bqp03e" >
    //            <c-wiz jsrenderer="cFe9tc" class="dKv0S AUFR7b" >
    //
    // the class name Ni4E7e is toggled on:
    //   <c-wiz jsrenderer="MhqlIf" class="SSPGKf aM97s ZCbGl tRuV8b uooVCd qa7SYc Pc6wn n0GTjf"
    // to mark a conversation as unread (changing color of title bar);
    //   .tRuV8b.Ni4E7e .dKv0S { background-color: #0b57d0; }
    // otherwise governed by
    //   .tRuV8b .dKv0S { background-color: #f2f2f2;flex-wrap: wrap; }
    GM_addStyle(".tRuV8b .dKv0S { background-color: "+configSettings.cardBGColor+"; }");
    GM_addStyle(".tRuV8b.Ni4E7e .dKv0S { background-color: red; }");

    // the Active/Away part should be different colors.
    GM_addStyle(".tRuV8b .pS5UB { background-color: "+configSettings.msgBGColor+"; }");
    GM_addStyle(".tRuV8b .dKv0S .W44DQ .ejd9mb { color: "+configSettings.textColor+"; }");

    // usernames should turn red when there's unread messages
    GM_addStyle(".H7du2 .njhDLd { color: red; }");

    // Card background around a contiguous group of messages
    let cards = [".dsoUjb", ".oGsu4", ".HTZBof", ".AflJR"];
    for(var i=0; i<cards.length; i++) {
        GM_addStyle(cards[i] + '{background-color: ' + configSettings.cardBGColor + ';}');
    }

    // make conversations go full width of window
    GM_addStyle(".Bl2pUd { padding: 0 2px 0 2px; }");

    // stupid "User is typing..." notification now comes up
    // OVER THE TOP OF THE LAST MESSAGE. make it transparent so
    // it doesn't completely obscure that message. stupid
    GM_addStyle(".tRuV8b .bNfiFb { background: transparent; }");

    // background color around messages
    GM_addStyle(".WQKmIb .Bl2pUd { background-color: " + configSettings.windowBackground + ";}");

    // put a small margin between msgs
    GM_addStyle(".WQKmIb .ajCeRb:not(.zzVqCe) { padding: 0px; }");

    // too much whitespace between lines of text, scrunch it up a little.
    // same in the text-entry box
    GM_addStyle(".Zc1Emd {line-height: 1.00rem;}");
    GM_addStyle(".BScnzc {line-height: 1.00rem; min-height: 0;}");

    // border-radius on messages looks silly
    GM_addStyle(".tRuV8b .dsoUjb {border-radius:0px;}");

    // Contents of each message within a card
    GM_addStyle(".zlPNZe {background-color: " + configSettings.msgBGColor + ";}");

    // The little divider that separates days
    GM_addStyle(".mCOR5e {background-color: " + configSettings.dayBGColor + ";}");

    // The date string on a card, and the date in the day-separators
    GM_addStyle(".FvYVyf {color:" + configSettings.dateColor + "; font-style: italic; }");
    GM_addStyle(".QQodff .FvYVyf {color:" + configSettings.dateColor + ";}");

    // make the day separators smaller vertically
    GM_addStyle(".WQKmIb .k1lILc, .WQKmIb .n5uYMe { height:15px; }");
    GM_addStyle(".A2BXPe.n5uYMe.pYTmjf.mCOR5e { padding:0px; margin:2px; }");

    // another massive gap between messages to scrunch up.
    GM_addStyle(".XbbXmb.zzVqCe+.ajCeRb:not(.zzVqCe) { padding-top: 2px; }");

    // there's a massive gap between the last message and the typing box;
    // this is where the 'user is typing...' message goes, but when that message
    // isn't there, it should be small.
    GM_addStyle(".tRuV8b .WQKmIb .auHzcc { margin-bottom: 3px; padding-bottom: 0px; }");
    // dont translate the "user is typing..." up to the top of that little
    // blue box, move it down.
    GM_addStyle(".tRuV8b .bNfiFb { transform: none; }");

    // where you type
    GM_addStyle(".IEIJqd.qs41qe { background-color: "+configSettings.msgBGColor+"; }");
    GM_addStyle(".XganBc { border-radius: 0px; }");

    // make it not so freaking tall and with less pointless whitespace
    GM_addStyle(".igYHTd { min-height: 24px; }" +
                ".I0LFzc { min-height: 24px; }" +
                ".zFe2Ef { height: 24px; min-height: 24px; }"
               );
    GM_addStyle(".tRuV8b .dJ9vNe.DbQnIe { border-radius: 0; flex-direction: row; min-height: 24px; }" +
                ".tRuV8b .dJ9vNe.DbQnIe .EFNTcf { min-height: 24px; }" +
                ".tRuV8b .I0LFzc .dJ9vNe.DbQnIe .stD1Se { margin: 0; }" +
                ".tRuV8b .I0LFzc .dJ9vNe.DbQnIe .cXQBz { height: 40px; }" +
                ".tRuV8b .dJ9vNe.DbQnIe .stD1Se { margin: 0; }" +
                ".tRuV8b .I0LFzc .dJ9vNe.DbQnIe .oAzRtb { margin: 0; padding: 0; }"
               );

    // when a conversation is fullscreened, new rules kick in.
    // NOTE the following rules also apply when a popout conversation
    // is widened beyond 375 pixels.

    // background of username/title
    GM_addStyle(".vIO7af { background: "+configSettings.cardBGColor+"; }");
    // font of username/title
    GM_addStyle(".zmXnlc .iNfgyc { fill: black; color: black; } ");
    GM_addStyle(".nk7hB .cAW0Vc { color: black; }");
    GM_addStyle(".S6YNQd { fill: black; }");
    GM_addStyle(".W44DQ .ejd9mb { color: black; }");

    // rounded corners on the messages look stupid.
    GM_addStyle(".McQwEc { border-radius: 0px; }");

    // background of typing area
    GM_addStyle(".XganBc { background-color: "+configSettings.msgBGColor+";");
    // typing area should be square.
    GM_addStyle(".dJ9vNe { border-radius: 0px; }");
    // way too much whitespace below the typing box.
    GM_addStyle(".zmXnlc .WQKmIb .XganBc { padding-bottom: 20px; }");

    // in the chat userlist, the names are too far apart -- scrunch up
    GM_addStyle(".qa7SYc .LoYJxb { height: 24px; }");

    // in the chat user list, a green dot looks like this:
    //   E2XEef NYNc9d.ENeJAb dDI85b.fLKygf cPjwNc  Qgwczb
    // while an Away dot looks like this:
    //   E2XEef NYNc9d.ENeJAb dDI85b.fLKygf cPjwNc  R90p3b.vMbxHf.H14eUd

    // document.getElementsByClassName("fh7VDd")   -> returns a list of all users in the chat list.
    // getElementsByClassName("Qgwczb")  -> returns if a user is Active or not.
    // getElementsByClassName("dDI85b fLKygf")   -> returns the "id" of each user,
    //     like id="world/dm/0U1b2gAAAAE/h4gUu"

    // persistent variable: this gets bound up into
    // the setInterval closure.
    //  .name : string
    //  .status : string "Active" "Idle" "Away"
    //  .prevStatus : string
    //  .customStatus : whatever the user entered for custom status
    //  .prevCustomStatus : string
    //  .statusId : integer  2 = Active, 1 = Idle, 0 = Away
    //  .changed : boolean
    //  .timeStamp : integer  Date().getTime(), time in milliseconds
    //               NOTE timeStamp == -1 if never seen a change.
    //  .age : integer in seconds since last timeStamp
    var userStates = {}

    // this part communicates with PFK gmail unread red
    function checkUserStatus() {
        var evt = {}
        evt.pfk_gm_message_type = 'chat_active_list'
        var jsdataParser = /.*(dm\/[0-9a-zA-Z_-]+);.*/
        var userlist = document.getElementsByClassName("fh7VDd");
        for (i = 0; i < userlist.length; i++)
        {
            var u = userlist[i]
            var personName = "personName"
            var statusString = null
            var statusId = null
            var customStatus = ""
            var dmId = null
            // the u div has a js-data with the dm/<id> in it.
            if ('jsdata' in u.attributes)
            {
                dmId = jsdataParser.exec(u.attributes.jsdata.value);
                if (dmId)
                {
                    // what i really want is the first parenthesized
                    // subexpression of the regex ("dm/XXXXXXXXX")
                    dmId = dmId[1]
                }
                else
                {
                    // group conversations don't actually have a dmId in them.
                    // i'm skipping those.
                    dmId = null
                }
            }
            if (dmId)
            {
                // a span with a class of cPjwNc has the word Away or Idle or Active in it.
                var statusSpan = u.getElementsByClassName("cPjwNc");
                if (statusSpan.length > 0)
                {
                    statusString = statusSpan[0].innerHTML;
                    if (statusString == "Active")
                    {
                        statusId = 2
                    }
                    else if (statusString == "Idle")
                    {
                        statusId = 1
                    }
                    else if (statusString == "Away")
                    {
                        statusId = 0
                    }
                }
                if (statusString)
                {
                    // div with class "tzwwSb" has data-name="person's name"
                    var tzwwdiv = u.getElementsByClassName("tzwwSb")
                    if (tzwwdiv.length > 0 &&
                        'data-name' in tzwwdiv[0].attributes)
                    {
                        personName = tzwwdiv[0].attributes['data-name'].value
                    }

                    // span with class "yKB7" has the user's custom status, if entered
                    var yKB7span = u.getElementsByClassName("yKB7")
                    if (yKB7span.length > 0 &&
                        'aria-label' in yKB7span[0].attributes)
                    {
                        customStatus = yKB7span[0].attributes['aria-label'].value
                    }

                    var us;
                    var ischanged = false
                    var dateNow = new Date()
                    var timeStamp = dateNow.getTime()

                    if (dmId in userStates)
                    {
                        us = userStates[dmId]
                        if (us.status != statusString ||
                            us.customStatus != customStatus)
                        {
                            us.prevStatus = us.status
                            us.prevCustomStatus = us.customStatus
                            ischanged = true
                            us.timeStamp = timeStamp
                        }
                    }
                    else
                    {
                        // brand new entries do not get marked as 'changed'
                        us = {}
                        userStates[dmId] = us
                        us.timeStamp = -1
                        us.prevStatus = statusString
                        us.prevCustomStatus = customStatus
                    }

                    us.name = personName
                    us.status = statusString
                    us.statusId = statusId
                    us.customStatus = customStatus
                    us.ischanged = ischanged
                    if (us.timeStamp == -1)
                    {
                        us.age = -1
                    }
                    else
                    {
                        us.age = (timeStamp - us.timeStamp) / 1000
                    }
                }
            }
        }
        evt.userStates = userStates
        window.parent.postMessage(evt, 'https://mail.google.com')
//      console.info("PFK sending event",evt)
    }

    if (document.getElementsByClassName("fh7VDd").length > 0)
    {
        window.setInterval(checkUserStatus, 2000);
    }

})();

// one of these will run in the chat app, the other in the gmail app,
// so they need to communicate.
//   https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage

// inside the chat user list:
//     window.addEventListener('message', (evt) => { some stuff })
// then in the toplevel doc:
//     chlif = document.getElementById('gtn-roster-iframe-id')
//     chlif.contentWindow.postMessage('this is a test', 'https://chat.google.com')

// other way, parent:
//     window.addEventListener('message', (evt) => { some stuff })
// child iframe:
//     window.parent.postMessage('this is a test message!', 'https://mail.google.com')

// not used anymore because statusString works better
// div with class "Qgwczb" draws the green dot, so it's active.
// var act = u.getElementsByClassName("Qgwczb");
// if (act.length > 0)
// {
//   activeIds[dmId] = personName
// }

// Local Variables:
// mode: javascript
// indent-tabs-mode: nil
// tab-width: 8
// eval: (add-hook 'write-file-functions 'time-stamp)
// time-stamp-start: "@version      "
// time-stamp-format: "%Y.%02m%02d.%02H%02M"
// time-stamp-end: "$"
// End:
