// ==UserScript==
// @name         PFK gmail unread red
// @namespace    http://tampermonkey.net/
// @version      2022.1104.2137
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

    // styles used by minimized conversation decorations
    GM_addStyle(".PFKstatusdiv { height: 11px; width: 11px; position: absolute; "+
                "top: 20px; left: 27px; z-index: 1000; border-radius: 50%; }")
    GM_addStyle(".PFKstatusdiv.PFKstatusActive { background-color: green; }")
    GM_addStyle(".PFKstatusdiv.PFKstatusIdle { background-color: #e37400; }")
    GM_addStyle(".PFKtimediv { position: absolute; z-index: 100; color: white; "+
                "top: 27px; left: -14px; font-size: 15px; }")
    GM_addStyle(".PFKBottomDiv { position: absolute; bottom: 0px; color: white; "+
                "left: 75px; opacity: 70%; }")
    GM_addStyle(".PFKBottomScrollMsg { display: block; width: 100%; }")

    // turn a number of seconds into HH:MM:SS format.
    function formatSeconds(sec) {
        var d = new Date()
        d.setTime(sec * 1000)
        var timePattern = /.*(..:..:..).*/
        var hms = timePattern.exec(d.toISOString())
        return hms[1]
    }

    function findMinimizedConversations(userStates) {
        // minimized conversations are in a div named "alY".
        // NOTE this div doesn't exist if there's no minimized conversations.
        var convs = document.getElementsByClassName("alY");
        if (convs.length > 0)
        {
            for (var i = 0; i < convs.length; i++)
            {
                var conv = convs[i]
                if ('data-group-id' in conv.attributes)
                {
                    var dgid = conv.attributes['data-group-id'].value
                    if (dgid in userStates)
                    {
                        var u = userStates[dgid]
                        // the "amy" div is the container of the avatar img
                        var amyDiv = conv.getElementsByClassName("amy")
                        if (amyDiv.length > 0)
                        {
                            amyDiv = amyDiv[0]
                            // look divs we added for the status circle and time
                            var statusDiv = amyDiv.getElementsByClassName("PFKstatusdiv")
                            var timeDiv = amyDiv.getElementsByClassName("PFKtimediv")
                            if (statusDiv.length == 0)
                            {
                                // not there, add them.
                                statusDiv = document.createElement("div")
                                statusDiv.classList.add("PFKstatusdiv")
                                timeDiv = document.createElement("div")
                                timeDiv.classList.add("PFKtimediv")
                                amyDiv.append(statusDiv)
                                amyDiv.append(timeDiv)
                            }
                            else
                            {
                                // found! update them.
                                statusDiv = statusDiv[0]
                                timeDiv = timeDiv[0]
                            }
                            timeDiv.innerHTML = formatSeconds(u.age)
                            switch (u.statusId)
                            {
                                case 2: // Active
                                    statusDiv.classList.add("PFKstatusActive")
                                    statusDiv.classList.remove("PFKstatusIdle")
                                    break
                                case 1: // Idle
                                    statusDiv.classList.add("PFKstatusIdle")
                                    statusDiv.classList.remove("PFKstatusActive")
                                    break
                                case 0: // Away
                                    statusDiv.classList.remove("PFKstatusActive")
                                    statusDiv.classList.remove("PFKstatusIdle")
                                    break
                            }
                        }
                    }
                }
            }
        }
    }

    // open up a div to log chat status changes.
    var pu = document.createElement("div")
    pu.classList.add("PFKBottomDiv")

    // can't add it right away, needs to be at the end.
    window.setTimeout(function() {
        document.body.appendChild(pu)
    }, 5000)

    // a utility function for adding output to the log window.
    // removes a message after 60 seconds.
    function logString(str) {
        var scrollMsg = document.createElement("div")
        scrollMsg.classList.add("PFKBottomScrollMsg")
        scrollMsg.innerHTML = str
        window.setTimeout(function () {
            pu.removeChild(scrollMsg)
        }, 60000)
        pu.appendChild(scrollMsg)
    }

    // this part communicates with PFK chat tweaker.
    window.addEventListener('message', (evt) => {
        if ('data' in evt &&
            typeof(evt.data) == 'object' &&
            'pfk_gm_message_type' in evt.data)
        {
            var ev = evt.data
            var dateNow = new Date()
            var timeStamp = dateNow.getTime()
            if (ev.pfk_gm_message_type == 'chat_active_list' &&
                'userStates' in ev)
            {
                var us = ev.userStates
                findMinimizedConversations(us)
                for (var mukey of Object.keys(us))
                {
                    var mu = us[mukey]
                    if (mu.ischanged)
                    {
                        var d = new Date();
                        d.setTime(mu.timeStamp)
                        logString(d.toTimeString() +": " + mu.name +
                                  " from "+ mu.prevStatus +
                                  " to " + mu.status)
                    }
                }
            }
        }
    })

})();



// install a callback to close the popup when the tab closes.
// do not use 'beforeunload' unless you want to cancel the close.
// window.addEventListener('unload', function (e) {
//    pu.close()
//    e.returnValue = ''
// })


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
