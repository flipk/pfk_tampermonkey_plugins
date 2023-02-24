// ==UserScript==
// @name         comed outage map stretcher
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.comed.com/Outages/CheckOutageStatus/Pages/OutageMap.aspx
// @icon         https://www.google.com/s2/favicons?sz=64&domain=comed.com
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle(".map-container { height: 1200px !important; }");
})();
