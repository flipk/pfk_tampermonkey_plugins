// ==UserScript==
// @name         ChattyChatSide
// @namespace    http://tampermonkey.net/
// @version      2023.1005.2216
// @description  Chatty ChattyChatSide
// @author       You
// @match        https://chat.google.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // scrunch up the userlist cuz there's just too much whitespace
    GM_addStyle(".LoYJxb { height: 32px; }")

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
