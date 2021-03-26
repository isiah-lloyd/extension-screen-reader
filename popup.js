let speakButton = document.querySelector('#speakButton')

speakButton.addEventListener('click', () => {
    chrome.tabs.executeScript({
        file: 'contentScript.js'
    })
})
let shortcutKey;
chrome.commands.getAll((commands) => {
    shortcutKey = commands.find(command => command.name  === 'keySpeakPage');
    speakButton.textContent = `Speak page (${shortcutKey.shortcut})`;
})
chrome.tts.isSpeaking((e) => {
    if(e) speakButton.textContent = `Stop Speaking (${shortcutKey.shortcut})`;
})
document.querySelector('#options').addEventListener('click', () => chrome.runtime.openOptionsPage());
