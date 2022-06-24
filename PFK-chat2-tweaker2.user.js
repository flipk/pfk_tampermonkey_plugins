// ==UserScript==
// @name         PFK chat2 tweaker2
// @namespace    http://tampermonkey.net/
// @version      2022.0623.2001
// @description  chat tweaker broken so chat2 tweaker2 lives
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

    function installScrollBarEnhancements() {
        // scrollbars!
        GM_addStyle(
            "::-webkit-scrollbar-track {"+
            "box-shadow: inset 0 0 6px " + configSettings.cardBGColor + ";"+
            "border-radius: 10px; }");
        GM_addStyle(
            "::-webkit-scrollbar-thumb {"+
            "border-radius: 10px; background: " + configSettings.cardBGColor + ";"+
            "box-shadow: inset 0 0 6px " + configSettings.msgBGColor + "; }");
        GM_addStyle(
            "::-webkit-scrollbar-thumb:hover {"+
            "background: " + configSettings.cardBGColor + ";"+
            "box-shadow: inset 0 0 6px " + configSettings.msgBGColor + "; }");
        GM_addStyle(
            "::-webkit-scrollbar-thumb:window-inactive {"+
            "background: " + configSettings.cardBGColor + ";" +
            "box-shadow: inset 0 0 6px " + configSettings.msgBGColor + "; }");
    }

    if (1) // PWA APP
    {
        // vertical spacing of users needs to be tightened up
        GM_addStyle(".LoYJxb, .fZcEod, .VPhfpf { height: 28px; }");
        // username font should be smaller
        GM_addStyle(".t5F5nf.t5F5nf, .XFzPX .PL5Wwe.H7du2 .t5F5nf.t5F5nf { font-size: 0.7rem; }");
        // message preview font should be smaller
        GM_addStyle(".kjWKTd { font-size: 0.7rem;  line-height: 8px; }");

    }

    if (1) // GMAIL CHAT APP!
    {
        // vertical spacing of users needs to be tightened up
        GM_addStyle(".qa7SYc .LoYJxb, .qa7SYc .fZcEod, .qa7SYc .VPhfpf, .qa7SYc .RQw3Sd { height: 25px; }");
        // usernames should turn red when there's unread messages
        GM_addStyle(".H7du2 .njhDLd { color: red; }");

        // Card background around a contiguous group of messages
        let cards = [".dsoUjb", ".oGsu4", ".HTZBof", ".AflJR"];
        for(var i=0; i<cards.length; i++) {
            GM_addStyle(cards[i] + '{background-color: ' + configSettings.cardBGColor + ';}');
        }

        // make the dot red instead of green or white if there's unread messages.
        GM_addStyle(".H7du2 .fLKygf { background-color: red; }");
        GM_addStyle(".H7du2 .Qgwczb { background-color: red; }");

        // make conversations go full width of window
        GM_addStyle(".Bl2pUd { padding: 0 2px 0 2px; }");

        // background color around messages
        GM_addStyle(".WQKmIb .Bl2pUd { background-color: " + configSettings.windowBackground + ";}");

        // put a small margin between msgs
        GM_addStyle(".WQKmIb .ajCeRb:not(.zzVqCe) { padding: 0px; }");

        // too much whitespace between lines of text, scrunch it up a little.
        GM_addStyle(".Zc1Emd {line-height: 1.00rem;}");
        // same in the text-entry box
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

        // active status on conversation panel
        GM_addStyle(".tRuV8b .pS5UB { background-color:" + configSettings.msgBGColor + "; }" +
                    ".tRuV8b .dKv0S .S7oIUc, .tRuV8b .dKv0S .W44DQ .ejd9mb " +
                    "{ color:" + configSettings.textColor + "; }");

        // nudge picture down a few pixels to make a prettier margin
        GM_addStyle(".HTZBof {margin-top:5px;}");

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

        // if the conversation window gets bigger than 375px, a different
        // set of rules kick in!
        GM_addStyle(".WQKmIb .IEIJqd .XganBc { padding: 0; }");
        GM_addStyle(".I0LFzc { border-radius: 0; }");
        GM_addStyle(".Ct5IYc { padding: 0; }");
        GM_addStyle(".PhFuQe.yXgmRe .dJ9vNe { background-color: "+configSettings.msgBGColor+"; }");
        // the buttons and switches on the right of the whereyoutype are way to spacey
        GM_addStyle(".LsSwGf { width: 24px; }" +
                    ".wmbLw { margin: 0; }" +
                    ".EFNTcf .zS8jHe { margin: 0; }" +
                    ".wAZd3e { height: 24px; width; 24px; }" +
                    ".EFNTcf, .CfUpN { min-height: 32px; }" +
                    ".XT3Vq { margin: 3px; }" +
                    ".WQKmIb .IEIJqd .I0LFzc { background-color: " + configSettings.msgBGColor + "; }"
                   );

        // if you maximize a conversation to the gmail window, yet
        // another set of rules kick in!
        GM_addStyle(".dsoUjb { border-radius: 0; }" +
                    ".EFNTcf, .CfUpN { min-height: 24px; }" +
                    ".oAzRtb { padding: 0; }"
                   );

        installScrollBarEnhancements();
    }

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
