// ==UserScript==
// @name         PFK gmail background
// @namespace    http://tampermonkey.net/
// @version      2024.0206.2039
// @description  put background image in the proper div since theirs sucks.
// @author       pfk@pfk.org
// @match        https://mail.google.com/mail/*
// @grant        GM_addStyle
// ==/UserScript==

// NOTE if you only match mail.google.com/*, this will fire in the chat PWA app too.
//      to prevent that, it must match mail.google.com/mail/* instead.

(function() {
    'use strict';

    var bgUrl = "https://github.com/flipk/pfk_tampermonkey_plugins/raw/main/gmail_background.png";
    var bg = "background-image:url(" + bgUrl + ");" +
        "background-size: cover; background-position: center;";

    var setBackground = function() {
        var bgSet = 0, divs, div;

        divs = document.getElementsByClassName("nH ar4 z")
        if (divs !== undefined && divs.length > 0)
        {
            div = divs[0]
            div.setAttribute("style", bg);
            bgSet += 1;

            // update the titlebar to a darker color
            var meta = document.createElement('meta');
            meta.name = "theme-color";
            meta.content = "#3c4043";
            document.getElementsByTagName('head')[0].appendChild(meta);
        }
        else
        {
            console.warn("PFK Gmail Background Setter did not find the right div1");
        }

        if (bgSet !== 1)
        {
            // this only needs to fire once.
            window.setTimeout(setBackground,2000);
        }
    };

    setBackground();

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
