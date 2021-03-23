chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    fetch('https://xai2dxv169.execute-api.us-east-1.amazonaws.com/dev/', {
        method: 'POST',
        headers: {
            //'X-API-KEY': 'Mp24c70TzT52W7165azJ17r9VX94PEozaePdFECN', //not used yet
            'Content-Type': 'text/html'
        },
        body: request
    })
    .then(response => response.json())
    .then((data) => {
        chrome.tts.speak(data.test);
    })
})
chrome.commands.onCommand.addListener((command) => {
    if (command === "keySpeakPage") {
        chrome.tabs.executeScript({
            file: 'contentScript.js'
        })
    }
})