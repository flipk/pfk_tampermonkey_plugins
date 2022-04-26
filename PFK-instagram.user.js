// ==UserScript==
// @name         PFK instagram click-enabler
// @namespace    http://tampermonkey.net/
// @version      2022.0425.2142
// @description  enable image and video processing on instagram
// @author       PFK
// @match        https://www.instagram.com/*
// @icon         https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    var infodiv = null;
    var prev_nestpicdiv = null;

    function lookForThings() {
        var nestpicdiv = document.getElementsByClassName("kPFhm");
        if (nestpicdiv.length == 0) {
            if (infodiv != null) {
                infodiv = null;
            }
        }
        else if (nestpicdiv.length == 1) {

            if (prev_nestpicdiv !== nestpicdiv[0]) {
                infodiv = null;
            }
            prev_nestpicdiv = nestpicdiv[0];

            if (infodiv == null) {
                infodiv = document.createElement("div");
                infodiv.style.zIndex = 1000;
                infodiv.style.width = 1000;
                infodiv.style.display = 'inline';
                // position absolute or something?
                nestpicdiv[0].insertBefore(infodiv,
                                           nestpicdiv[0].firstChild);
            }
            infodiv.innerHTML = "";
            var imgs = document.getElementsByTagName("img");
            var ind = 0;
            for (ind = 0; ind < imgs.length; ind++)
            {
                var i = imgs[ind];
//                console.log("processing ind ",ind," which is ",i);
                if (i.srcset !== undefined &&
                    i.srcset !== null &&
                    i.srcset !== '') {
                    var srcset = i.srcset;
                    var srcspecs = srcset.split(',');
                    var ind2 = 0;
                    var biggestdim = 0;
                    var biggestind = 0;
                    var biggesturl = "";
                    for (ind2 = 0; ind2 < srcspecs.length; ind2++) {
                        var srcspec = srcspecs[ind2];
                        var urlwidth = srcspec.split(' ');
                        var url=urlwidth[0];
                        var execresult=/([0-9]*)w/.exec(urlwidth[1]);
                        var width=null;
                        if (execresult !== null) {
                            width=execresult[1];
                        }
                        if (width !== null && biggestdim < width) {
                            biggestdim = width;
                            biggestind = ind2;
                            biggesturl = url;
                        }
                    }
                    if (biggestdim > 0) {
                        infodiv.innerHTML +=
                            "<a href=\"" + biggesturl + "\">" +
                            biggestdim + "w </a> ";
                    }
                }
                else if (i.src && i.width > 64) {
                    infodiv.innerHTML +=
                        "<a href=\"" + i.src + "\">" +
                        i.width + "x" + i.height + " " +
                        "</a> ";
                }
            }
        }
        window.setTimeout(lookForThings, 1000);
    }

    function installThings() {

        // for images
        // - make _9AhH0 have display:none so the <img> comes to top
        // - make FFVAD have user-select: all
        GM_addStyle("._9AhH0 { display:none; }");
        GM_addStyle(".FFVAD { user-select: all; }");

        // for videos: make fXIG0 display:none so <video> comes to top
        GM_addStyle(".fXIG0 { display:none !important; }");
        GM_addStyle(".PyenC { display:none !important; }");

        lookForThings();
    }

    window.setTimeout(installThings, 1000);
})();


// videos:

// In the Network tab of chrome debugger you can find a “fetch” for a
// “webm” file.  Remove the bytestart= and byteend= from the url and
// wget that.  Then convert to mp4:

// ffmpeg -i b.webm -strict experimental -c:v libx264 -preset fast
// -crf 18 -an -y b2.mp4

// Now vlc can play it

// The trick? How to find this url in the source document.  THE URL is
// in the javascript, either webm or webp, at least for the one I
// found.

// example:
// https://scontent-hou1-1.cdninstagram.com/v/t66.30100-16/49227004_388827406076556_1900417603931306924_n.webm?
// _nc_ht=scontent-hou1-1.cdninstagram.com&_nc_cat=100&_nc_ohc=QeREOBqJl0EAX-Cox_o&edm=AABBvjUBAAAA&ccb=7-4&
// oh=00_AT8nF-XxgOhhEKb8jsGH1BGpHUNJmTsnWlglFzVHAfNWoA&oe=62613F95&_nc_sid=83d603

// var scripts=document.getElementsByTagName("script");
// Search scripts[*].innerHTML for the url



// Local Variables:
// mode: javascript
// indent-tabs-mode: nil
// tab-width: 8
// eval: (add-hook 'write-file-functions 'time-stamp)
// time-stamp-start: "last modified = "
// time-stamp-format: "%:y-%02m-%02d.%02H:%02M:%02S"
// time-stamp-end: "$"
// End:
