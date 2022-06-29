// ==UserScript==
// @name         gocomics features
// @namespace    http://tampermonkey.net/
// @version      2022.0629.1015
// @description  feature modification on gocomics.com
// @author       pfk@pfk.org
// @match        https://www.gocomics.com/*
// @grant        GM_addStyle
// ==/UserScript==
//  icon         https://www.google.com/s2/favicons?sz=64&domain=500px.com

(function() {
    'use strict';

    var infodiv = null;
    var containerdiv = null;

    function lookForImgs() {
        var r = document.getElementsByClassName("gc-container"); // index 1
// i'd use this one, but it moves the img to the right, i'd
// need to change the layout and resize the containing div,
// and that smacks of effort.
//        var r = document.getElementsByClassName("comic__wrapper"); // index 0
        if (r.length > 1 && infodiv == null)
        {
            containerdiv = r[1];
            infodiv = document.createElement("div");
            containerdiv.insertBefore(infodiv, containerdiv.firstChild);
        }
        if (infodiv != null)
        {
            infodiv.innerHTML = "";

            // search for all img tags
            var imgs = containerdiv.getElementsByTagName("img");
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
        }

        window.setTimeout(lookForImgs, 1000);
    };

    lookForImgs();

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
