// ==UserScript==
// @name         instagram features
// @namespace    http://tampermonkey.net/
// @version      2022.0601.2036
// @description  feature modification on instagram
// @author       pfk@pfk.org
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
        // - make cover div have display:none so the <img> comes to top
        GM_addStyle("._aagw { display:none !important; }");

        // for videos: make fXIG0 display:none so <video> comes to top
        GM_addStyle(".fXIG0 { display:none !important; }");
        GM_addStyle(".PyenC { display:none !important; }");

//        lookForThings();
    }

    window.setTimeout(installThings, 1000);

    // doesnt work but fun to write, saving here for future reference
    document.findmp4 = function() {
        var sdivs = document.getElementsByTagName("script");
        var ret = [];
        var retind = 0;
        var widest = 0;
        var widesturl = "";
        for (var ind = 0; ind < sdivs.length; ind++) {
            var sdiv = sdivs[ind];
            if (sdiv.innerHTML.length > 0) {
                var res = /(.*)__additionalDataLoaded\('.*',(.*)\);/.exec(sdivs[22].innerHTML);
                if (res != null) {
                    var ds = JSON.parse(res[2]);
                    if (ds != null) {
                        ret[retind++] = ds;
                        for (var itemind = 0; itemind < ds.items.length; itemind++) {
                            var item = ds.items[itemind];
                            for (var videoind = 0; videoind < item.video_versions.length; videoind++) {
                                var vv = item.video_versions[videoind];
                                if (vv.width > widest) {
                                    widest = vv.width;
                                    widesturl = vv.url;
                                }
                            }
                        }
                    }
                }
            }
        }
        console.log("url:",widesturl);
        return ret;
    };

})();
