// ==UserScript==
// @name         PFK Chat Simplify
// @namespace    http://tampermonkey.net/
// @version      2025.0925.1818
// @description  making a chat window simple
// @author       You
// @match        https://chat.google.com/u/0/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    var user_list_div_class = "cYHKzf oMuP2d AcjvMc"
    var header_div_class = "pGxpHc"
    var invocation_count = 0
    function removeDivs() {
        console.log('PFK: removeDivs running')
        var divs = document.getElementsByClassName(user_list_div_class)
        if (divs.length == 1) {
            console.log('PFK: removeDivs found user list')
            divs[0].remove()
        } else {
            console.log('PFK: removeDivs did not find user list')
        }
        divs = document.getElementsByClassName(header_div_class);
        if (divs.length == 1) {
            console.log('PFK: removeDivs found header')
            divs[0].remove()
        } else {
            console.log('PFK: removeDivs did not find header')
        }
        invocation_count += 1
        if (invocation_count < 10) {
            console.log('PFK: removeDivs setting a timer for itself again')
            window.setTimeout(removeDivs,2000)
        }
    }

    console.log('calling removeDivs the first time')
    removeDivs()
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
