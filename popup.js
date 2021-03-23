document.querySelector('#speakButton').addEventListener('click', (e) => {
    chrome.tabs.executeScript({
        file: 'contentScript.js'
    })
})