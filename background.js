chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let isSpeaking;
    chrome.tts.isSpeaking((e) => isSpeaking = e);
    if(!isSpeaking) {
        fetch('https://xai2dxv169.execute-api.us-east-1.amazonaws.com/dev/', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/html'
            },
            body: request
        })
        .then(response => response.json())
        .then((data) => {
            chrome.storage.sync.get({
                voice: null,
                pitch: 1,
                rate: 1,
                volume: 1
            }, (items) => {
                let settings = items;
                chrome.browserAction.setBadgeText({text: '🔊'});

                chrome.tts.speak(data.test, 
                    {
                        voiceName: settings.voice,
                        pitch: parseFloat(settings.pitch),
                        rate: parseFloat(settings.rate),
                        volume: parseFloat(settings.volume),
                        onEvent: (event) => {
                            if(event.type == 'end' || event.type == 'interrupted' 
                            || event.type == 'cancelled' || event.type == 'error') {
                                chrome.browserAction.setBadgeText({text: ''});
                            }
                        }
                    });
            })
        })
    }
    else {
        chrome.tts.stop();
    }
})
chrome.commands.onCommand.addListener((command) => {
    if (command === "keySpeakPage") {
        chrome.tabs.executeScript({
            file: 'contentScript.js'
        })
    }
})

chrome.runtime.onInstalled.addListener((e) => {
    if (e.reason === "update" || e.reason === "install") {
        chrome.tabs.create({url: 'welcome.html'})
    }
})