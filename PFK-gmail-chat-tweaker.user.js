// ==UserScript==
// @name         PFK gmail chat tweaker
// @namespace    http://tampermonkey.net/
// @version      2022.1109.1600
// @description  the gmail side of doing things to chat
// @author       pfk@pfk.org
// @match        https://mail.google.com/mail/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {

    'use strict';

    // styles used by minimized conversation decorations
    GM_addStyle(".PFKstatusdiv { height: 11px; width: 11px; position: absolute; "+
                "top: 20px; left: 27px; z-index: 1000; border-radius: 50%; }")
    GM_addStyle(".PFKstatusdiv.PFKstatusActive { background-color: green; }")
    GM_addStyle(".PFKstatusdiv.PFKstatusIdle { background-color: #e37400; }")
    GM_addStyle(".PFKtimediv { position: absolute; z-index: 100; color: white; "+
                "top: 31px; left: -9px; font-size: 12px; }")

    GM_addStyle(".PFKBottomDiv { position: absolute; bottom: 0px; " +
                "color: white; left: 75px; transition: 0.2s; }")

    GM_addStyle(".PFKBottomScrollMsg { display: block; width: 100%; opacity: 20%;}")
    GM_addStyle(".PFKBottomScrollMsgHighlight { opacity: 100%; background: #000; }")
    GM_addStyle(".PFKBottomScrollMsgFaded { opacity: 5%; }")

    GM_addStyle(".PFKBottomDiv:hover { background: #000; }")
    GM_addStyle(".PFKBottomDiv:hover .PFKBottomScrollMsg { opacity: 30%; }")
    GM_addStyle(".PFKBottomDiv:hover .PFKBottomScrollMsg:hover { opacity: 100%; }")

    // turn a number of seconds into HH:MM:SS format, but
    // with leading zeros stripped off.
    var timePattern = /.*(00:00(:..)|00:0(.:..)|00:(..:..)|0(.:..:..)|(..:..:..)).*/
    function formatSeconds(sec) {
        var d = new Date()
        d.setTime(sec * 1000)
        var hms = timePattern.exec(d.toISOString())
        if (hms)
        {
	    if      (hms[2]) hms = hms[2]
	    else if (hms[3]) hms = hms[3]
	    else if (hms[4]) hms = hms[4]
	    else if (hms[5]) hms = hms[5]
	    else if (hms[6]) hms = hms[6]
	    else           hms = null
        }
        return hms
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
                            if (u.age == -1)
                            {
                                timeDiv.innerHTML = "-"
                            }
                            else
                            {
                                timeDiv.innerHTML = formatSeconds(u.age)
                            }
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
    }, 10000)

    // a utility function for adding output to the log window.
    // removes a message after 60 seconds.
    function logString(str) {
        var scrollMsg = document.createElement("div")
        scrollMsg.innerHTML = str
        scrollMsg.classList.add("PFKBottomScrollMsg")
        scrollMsg.classList.add("PFKBottomScrollMsgHighlight")

        // starts out highlighted.
        // 5 seconds later, it fades to 20%.
        window.setTimeout(function () {
            scrollMsg.classList.remove("PFKBottomScrollMsgHighlight")
        },5000)

        // 60 seconds later it fades to 5%.
        window.setTimeout(function () {
            scrollMsg.classList.add("PFKBottomScrollMsgFaded")
        },65000)

        // 5 minutes later it is removed.
        window.setTimeout(function () {
            pu.removeChild(scrollMsg)
        },365000)

        pu.appendChild(scrollMsg)
    }

    var timeRegex = /(..:..:..).*/

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
//              console.info("PFK got userStates", ev)
                var us = ev.userStates
                findMinimizedConversations(us)
                for (var mukey of Object.keys(us))
                {
                    var mu = us[mukey]
                    if (mu.ischanged)
                    {
                        var d = new Date();
                        d.setTime(mu.timeStamp)
                        var r = timeRegex.exec(d.toTimeString())
                        if (r)
                        {
                            r = r[1]
                        }
                        else
                        {
                            r = "(unparsed)"
                        }
                        logString(r + " " + mu.name +
                                  " "+ mu.prevStatus +
                                  " " + mu.prevCustomStatus +
                                  " ⟹ " + mu.status +
                                  " " + mu.customStatus)
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


// Local Variables:
// mode: javascript
// indent-tabs-mode: nil
// tab-width: 8
// eval: (add-hook 'write-file-functions 'time-stamp)
// time-stamp-start: "@version      "
// time-stamp-format: "%Y.%02m%02d.%02H%02M"
// time-stamp-end: "$"
// End:
