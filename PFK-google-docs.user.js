// ==UserScript==
// @name         GDocsTweaks
// @namespace    http://tampermonkey.net/
// @version      2022.0623.2001
// @description  Tweaks to Google Docs
// @author       pfk@pfk.org
// @match        https://docs.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function lookForThings() {
        var pdlist = document.getElementsByClassName("picker-dialog");
        if (pdlist.length == 1) {
            var pd = pdlist[0];
            console.log("found picker dialog:",pd);
            pd.style.top = '50px';
            var mdclist = document.getElementsByClassName("picker modal-dialog-content");
            if (mdclist.length == 1) {
                var mdc = mdclist[0];
                console.log("found modal dialog content:",mdc);
                mdc.style.height = '900px';
            }
        }
        window.setTimeout(lookForThings,2000);
    }

    window.setTimeout(lookForThings,2000);
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
