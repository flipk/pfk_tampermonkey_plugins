// ==UserScript==
// @name         PFK 500px picture clicker
// @namespace    http://tampermonkey.net/
// @version      2022.0425.2142
// @description  enable image manipulation on 500px.com
// @author       PFK
// @match        https://500px.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=500px.com
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    var infodiv = null;

    // there are cover-divs that prevent clicking and inspecting;
    // make them go away so that 'inspect' selects the actual <img>
    GM_addStyle(".eJfFdC { display: none !important; }");
    GM_addStyle(".kBJrgd { display: none !important; }");

    // nsfw covers on the preview page
    GM_addStyle(".BHviU  { display: none !important; }");

    window.setInterval(function() {
        var r = document.getElementById("root");
        if (r != null && infodiv == null)
        {
            console.log("PFK making infodiv");
            infodiv = document.createElement("div");
            document.body.insertBefore(infodiv, r);
        }
        infodiv.innerHTML = "";

        // look for the user's cover image at the top,
        // which is specified using css background url.
        var bgd=document.getElementsByClassName("iAcGNs");
        if (bgd.length == 1) {
            var cs = getComputedStyle(bgd[0]);
            var bgi = cs.backgroundImage;
            if (bgi !== undefined && bgi !== null) {
                const getUrl = /url\((.*)\)/;
                var o=getUrl.exec(bgi);
                if (o.length == 2) {
                    var url = o[1];
                    infodiv.innerHTML +=
                        '<a href=' + url + '>' +
                        'background</a> ';
                }
            }
        }

        var imgs = document.getElementsByTagName("img");
        var ind = 0;
        for (ind = 0; ind < imgs.length; ind++)
        {
            var i = imgs[ind];
            if (i.src && i.width > 64)
            {
                infodiv.innerHTML +=
                    "<a href=\"" + i.src + "\">" +
                    i.width + "x" + i.height +
                    "</a> ";
            }
        }

        var exposebuttons = document.getElementsByClassName("jvTtuX");
        if (exposebuttons.length == 1)
        {
            console.log("clicking");
            exposebuttons[0].click();
        }

    }, 1000);
})();

// Local Variables:
// mode: javascript
// indent-tabs-mode: nil
// tab-width: 8
// eval: (add-hook 'write-file-functions 'time-stamp)
// time-stamp-start: "last modified = "
// time-stamp-format: "%:y-%02m-%02d.%02H:%02M:%02S"
// time-stamp-end: "$"
// End:
