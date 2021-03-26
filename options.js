let voiceSelect = document.querySelector('#voice');

let pitchSlider = document.querySelector('#pitch');
let pitchOutput = document.querySelector('#pitchOutput');

let rateSlider = document.querySelector('#rate');
let rateOutput = document.querySelector('#rateOutput');

let volumeSlider = document.querySelector('#volume');
let volumeOutput = document.querySelector('#volumeOutput');

let form = document.querySelector('#settingsForm');

chrome.tts.getVoices((voices) => {
    voices.forEach((voice) => {
        let el = document.createElement("option");
        el.textContent = voice.voiceName;
        el.value = voice.voiceName;
        voiceSelect.appendChild(el);
    })
})

function save_options() {
    chrome.storage.sync.set({
        voice: voiceSelect.value,
        pitch: pitchSlider.value,
        rate: rateSlider.value,
        volume: volumeSlider.value
    }, () => {
        let saveAlert = document.createElement('h2');
        saveAlert.setAttribute('role', 'alert');
        saveAlert.textContent = "Settings have been saved!"
        document.body.appendChild(saveAlert);
        setTimeout(() =>  saveAlert.remove(), 5000);
    })
}
function get_options() {
    chrome.storage.sync.get(['voice', 'pitch', 'rate', 'volume'], (items) => {
        if (items.voice !== undefined) {
            voiceSelect.value = items.voice;
        }
        if (items.pitch !== undefined) {
            pitchSlider.value = items.pitch;
            pitchOutput.textContent = pitchSlider.value;
        }
        if (items.rate !== undefined) {
            rateSlider.value = items.rate;
            rateOutput.textContent = rateSlider.value;
        }
        if (items.volume !== undefined) {
            volumeSlider.value = items.volume;
            volumeOutput.textContent = volumeSlider.value;
        }
    })
}

get_options();

pitchSlider.addEventListener('input', () => pitchOutput.textContent = pitchSlider.value);
rateSlider.addEventListener('input', () => rateOutput.textContent = rateSlider.value);
volumeSlider.addEventListener('input', () => volumeOutput.textContent = volumeSlider.value);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    save_options();
})

form.addEventListener('reset', (e) => {
    e.preventDefault();
    chrome.storage.sync.clear();
    voiceSelect.selectedIndex = 0
    pitchSlider.value = 1;
    rateSlider.value = 1;
    volumeSlider.value = 1;
    pitchOutput.textContent = pitchSlider.value;
    rateOutput.textContent = rateSlider.value;
    volumeOutput.textContent = volumeSlider.value;
   // save_options();
})

document.querySelector('#shortcutLink').addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({url: 'chrome://extensions/shortcuts'})
})