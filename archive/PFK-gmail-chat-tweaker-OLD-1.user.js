// ==UserScript==
// @name         PFK gmail chat tweaker
// @namespace    http://tampermonkey.net/
// @version      2023.0216.1727
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
    GM_addStyle(".PFKBottomDivHide { display: none; }")

    GM_addStyle(".PFKBottomScrollMsg { display: block; width: 100%; opacity: 20%;}")
    GM_addStyle(".PFKBottomScrollMsgHighlight { opacity: 100%; background: #000; }")
    GM_addStyle(".PFKBottomScrollMsgFaded { opacity: 5%; }")

    GM_addStyle(".PFKBottomDiv:hover { background: #000; }")
    GM_addStyle(".PFKBottomDiv:hover .PFKBottomScrollMsg { opacity: 30%; }")
    GM_addStyle(".PFKBottomDiv:hover .PFKBottomScrollMsg:hover { opacity: 100%; }")

    GM_addStyle(".PFKXspan:hover { color: red; cursor: pointer; }")
    GM_addStyle(".PFKXAspan { opacity: 20%; }")
    GM_addStyle(".PFKXAspan:hover { opacity: 100%; color: red; cursor: pointer; }")

    // turn a number of seconds into HH:MM:SS format, but
    // with leading zeros stripped off.
    var timePattern = /.*(00:00(:..)|00:0(.:..)|00:(..:..)|0(.:..:..)|(..:..:..)).*/
    function formatSeconds(sec) {
        var d = new Date()
        d.setTime(sec * 1000)
        var hms = timePattern.exec(d.toISOString())
        if (hms) {
            if      (hms[2]) hms = hms[2]
            else if (hms[3]) hms = hms[3]
            else if (hms[4]) hms = hms[4]
            else if (hms[5]) hms = hms[5]
            else if (hms[6]) hms = hms[6]
            else             hms = null
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
    var uhpu = document.createElement("div")
    pu.classList.add("PFKBottomDiv")
    uhpu.classList.add("PFKBottomDiv")
    uhpu.classList.add("PFKBottomDivHide")
    pu.innerHTML = '<span>XA</span> <span>H</span>'
    uhpu.innerHTML = '<span>xa</span> <span>UH</span>'
    var xaSpan = pu.children[0]
    var hSpan = pu.children[1]
    var uhXaSpan = uhpu.children[0]
    var uhSpan = uhpu.children[1]
    xaSpan.classList.add("PFKXAspan")
    uhXaSpan.classList.add("PFKXAspan")
    hSpan.classList.add("PFKXAspan")
    uhSpan.classList.add("PFKXAspan")
    xaSpan.onclick = function() {
        var toCall = []
        var sms = pu.getElementsByClassName("PFKBottomScrollMsg");
        for (var ind = 0; ind < sms.length; ind++)
        {
            var sm = sms[ind]
            console.info('examining index', ind, ':', sm)
            if ('pfk' in sm && 'removeMe' in sm.pfk)
            {
                // can't call the func now, because it will modify the
                // list WHILE we're iterating over it.
                toCall.push(sm.pfk.removeMe)
            }
        }
        for (ind in toCall)
        {
            toCall[ind]()
        }
    }
    hSpan.onclick = function() {
        uhpu.classList.remove("PFKBottomDivHide")
        pu.classList.add("PFKBottomDivHide")
    }
    uhSpan.onclick = function() {
        pu.classList.remove("PFKBottomDivHide")
        uhpu.classList.add("PFKBottomDivHide")
    }

    // can't add it right away, needs to be at the end.
    window.setTimeout(function() {
        document.body.appendChild(pu)
        document.body.appendChild(uhpu)
    }, 10000)

    // a utility function for adding output to the log window.
    // removes a message after 60 seconds.
    var hiliteTime = 5000
    var fadeTime = 60000
    var removeTime = 300000
    if (0)
    {
        // for testing only : copypaste into Console
        hiliteTime = 5000
        fadeTime = 5000
        removeTime = 5000
        pu = document.getElementsByClassName("PFKBottomDiv")[0]
    }

    function logString(str) {
        var sm = document.createElement("div")
        sm.innerHTML = '<span></span> ' + str
        sm.classList.add("PFKBottomScrollMsg")
        sm.classList.add("PFKBottomScrollMsgHighlight")
        sm.pfk = {}
        sm.pfk.timerId = -1

        pu.appendChild(sm)

        // the scrollMsg only has one child, the <span>.
        sm.pfk.xSpan = sm.children[0]
        sm.pfk.removeMe = function() {
            if (sm.pfk.timerId != -1)
            {
                window.clearTimeout(sm.pfk.timerId)
                sm.pfk.timerId = -1
            }
            pu.removeChild(sm)
        }

        // starts out highlighted.
        // 5 seconds later, it fades to 20%.
        // and the "X" doesn't appear until then.
        sm.pfk.timerId = window.setTimeout(function () {
            sm.pfk.xSpan.classList.add("PFKXspan")
            sm.pfk.xSpan.innerHTML = "X"
            sm.pfk.xSpan.onclick = sm.pfk.removeMe
            sm.classList.remove("PFKBottomScrollMsgHighlight")
            // 60 seconds later it fades to 5%.
            sm.pfk.timerId = window.setTimeout(function() {
                sm.classList.add("PFKBottomScrollMsgFaded")
                // 5 minutes later it is removed.
                sm.pfk.timerId = window.setTimeout(function() {
                    sm.pfk.timerId = -1
                    sm.pfk.removeMe()
                }, removeTime)
            }, fadeTime)
        }, hiliteTime)
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
