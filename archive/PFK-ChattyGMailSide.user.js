// ==UserScript==
// @name         ChattyGMailSide
// @namespace    http://tampermonkey.net/
// @version      2023.1005.2218
// @description  Chatty ChattyGMailSide
// @author       You
// @match        https://mail.google.com/chat/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    var bgUrl = "https://github.com/flipk/pfk_tampermonkey_plugins/raw/main/gmail_background.png";
    var bg = "background-image:url(" + bgUrl + ");" +
        "background-size: cover; background-position: center;";

    var setBackground = function() {
        var divs, div
        divs = document.getElementsByClassName("bro")
        if (divs !== undefined && divs.length > 0)
        {
            div = divs[0]
            if (div.pfk_installed_bg == undefined)
            {
                div.innerHTML = "<img src=" + bgUrl + ">"
                div.pfk_installed_bg = true
            }
        }
        // this needs to keep firing, because if you fullscreen
        // a conversation and then close it, the entire div
        // is rebuilt (apparently from a template) and so we
        // have to just keep patching it back up again.
        window.setTimeout(setBackground,1000)
    }
    setBackground()
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
