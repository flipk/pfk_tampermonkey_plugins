// ==UserScript==
// @name         PFK gmail unread red
// @namespace    http://tampermonkey.net/
// @version      2022.1109.1554
// @description  make unread stuff red
// @author       pfk@pfk.org
// @match        https://mail.google.com/mail/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {

    'use strict';

    // the "n1" class is added to unread folder names
    GM_addStyle(".nU.n1>.n0 { color:red !important; }")

    // i HATE HATE HATE HATE HATE popup vCards!
    GM_addStyle(".YADHBe {display:none !important;}")

})();

// THE OLD WAY!!!
// function turnStuffRed() {
//     var ind, d;
//     d = document.getElementsByClassName("bsU");
//     if (d) {
//         for (ind = 0; ind < d.length; ind++) {
//             var dd = d[ind].parentNode.parentNode.getElementsByTagName("a");
//             if (dd && dd[0]) {
//                 dd[0].setAttribute("style","color:red");
//             }
//         }
//     }
// }
// window.setInterval(turnStuffRed, 2000);

// Local Variables:
// mode: javascript
// indent-tabs-mode: nil
// tab-width: 8
// eval: (add-hook 'write-file-functions 'time-stamp)
// time-stamp-start: "@version      "
// time-stamp-format: "%Y.%02m%02d.%02H%02M"
// time-stamp-end: "$"
// End:
