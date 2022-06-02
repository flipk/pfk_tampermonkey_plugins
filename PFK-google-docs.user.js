// ==UserScript==
// @name         GDocsTweaks
// @namespace    http://tampermonkey.net/
// @version      0.1
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
