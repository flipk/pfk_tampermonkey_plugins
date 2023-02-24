// ==UserScript==
// @name         debuggex width
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.debuggex.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=debuggex.com
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(".width-restricted { width: 100%; }");
})();
