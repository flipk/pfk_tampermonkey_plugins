// ==UserScript==
// @name         PFK chat tweaker
// @namespace    http://tampermonkey.net/
// @version      2022.1029.1459
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
