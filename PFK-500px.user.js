// ==UserScript==
// @name         500px features
// @namespace    http://tampermonkey.net/
// @version      2022.0623.2001
// @description  feature modification on 500px.com
// @author       pfk@pfk.org
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
    GM_addStyle(".eFliHb { display: none !important; }");
    // nsfw covers on the preview page
    GM_addStyle(".BHviU  { display: none !important; }");

    window.setInterval(function() {

        var r = document.getElementById("root");
        if (r != null && infodiv == null)
        {
            infodiv = document.createElement("div");
            document.body.insertBefore(infodiv, r);
        }
        infodiv.innerHTML = "";

        // look for the user's cover image at the top,
        // which is specified using css background url.
        var bgddiv = document.getElementById("banner");
        if (bgddiv !== null)
        {
            var cs = getComputedStyle(bgddiv);
            var bgi = cs.backgroundImage;
            if (bgi !== undefined && bgi !== null) {
                const getUrl = /url\((.*)\)/;
                var o=getUrl.exec(bgi);
                if (o !== null && o.length == 2) {
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

        // NSFW buttons have more than one class (!!!)
        var exposebuttons = document.getElementsByClassName("jvTtuX");
        if (exposebuttons.length == 0)
            exposebuttons = document.getElementsByClassName("bbxIau");
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
// time-stamp-start: "@version      "
// time-stamp-format: "%Y.%02m%02d.%02H%02M"
// time-stamp-end: "$"
// End:
