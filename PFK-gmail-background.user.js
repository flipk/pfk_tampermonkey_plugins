// ==UserScript==
// @name         PFK gmail background
// @namespace    http://tampermonkey.net/
// @version      2022.1103.2344
// @description  put background image in the proper div since theirs sucks.
// @author       pfk@pfk.org
// @match        https://mail.google.com/mail/*
// @grant        GM_addStyle
// ==/UserScript==

// NOTE if you only match mail.google.com/*, this will fire in the chat PWA app too.
//      to prevent that, it must match mail.google.com/mail/* instead.

(function() {
    'use strict';

    var bgUrl = "https://4122a438-a-62cb3a1a-s-sites.googlegroups.com/site/phillipfknaack/home/pics/batarang/batarang_2_1280x1024.png";
    var bg = "background-image:url(" + bgUrl + ");" +
        "background-size: cover;" +
        "background-position: center;";

    var setBackground = function() {
        var bgSet = 0, pfkDivs;

        // background of common div for all mail folders
        pfkDivs = document.getElementsByClassName("Tm");
        if (pfkDivs !== undefined)
        {
            var pfkDiv = pfkDivs[0];
            if (pfkDiv !== undefined)
            {
                pfkDiv.setAttribute("style",bg);
                bgSet += 1;
            }
        }
        else
        {
            console.warn("PFK Gmail Background Setter did not find the right div1");
        }

	// new gmail view's left thingy is a slightly too prominent color.
        pfkDivs = document.getElementsByClassName("a6o");
        if (pfkDivs !== undefined)
        {
            pfkDiv = pfkDivs[0];
            if (pfkDiv !== undefined)
            {
                pfkDiv.setAttribute("style","background-color: black");
                bgSet += 1;

                // why so much margin between msgs and iconbar?
                pfkDivs = document.getElementsByClassName("nH bkK");
                if (pfkDivs.length > 0)
                {
                    pfkDivs[0].style.marginLeft = 0;
                }
            }
        }
        else
        {
            console.warn("PFK Gmail Background Setter did not find the right div2");
        }

        if (bgSet !== 2)
        {
            window.setTimeout(setBackground,2000);
        }
    };

    setBackground();

    // i HATE HATE HATE HATE HATE popup vCards!
    GM_addStyle(".YADHBe {display:none !important;}");

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
