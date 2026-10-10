
const audioTab = document.getElementById('audioTab');
const transcriptTab = document.getElementById('transcriptTab');

const audioSection = document.getElementById('audioSection');
const transcriptSection = document.getElementById('transcriptSection');

const audioFile = document.getElementById('audioFile');
const fileName = document.getElementById('fileName');
const transcript = document.getElementById('transcript');

const processBtn = document.getElementById('processBtn');
const message = document.getElementById('message');

let selectedMethod = 'audio';

audioTab.addEventListener('click', function () {
    selectedMethod = 'audio';

    audioSection.hidden = false;
    transcriptSection.hidden = true;

    audioTab.classList.add('active-tab');
    transcriptTab.classList.remove('active-tab');

    message.textContent = '';
});

transcriptTab.addEventListener('click', function () {
    selectedMethod = 'transcript';

    audioSection.hidden = true;
    transcriptSection.hidden = false;

    transcriptTab.classList.add('active-tab');
    audioTab.classList.remove('active-tab');

    message.textContent = '';
});

audioFile.addEventListener('change', function () {
    if (audioFile.files.length > 0) {
        fileName.textContent = 'Selected: ' + audioFile.files[0].name;
    } else {
        fileName.textContent = 'No file selected';
    }
});

processBtn.addEventListener('click', function () {
    if (selectedMethod === 'audio') {
        if (audioFile.files.length === 0) {
            message.textContent = 'Please select an audio file first.';
            return;
        }

        message.textContent =
            'Audio selected! AI processing will be connected with the backend later.';
    } else {
        if (transcript.value.trim() === '') {
            message.textContent = 'Please paste your meeting transcript first.';
            return;
        }

       message.textContent =
    'Transcript received! Opening the demo tasks page...';

setTimeout(function () {
    window.location.href = 'tasks.html';
}, 1000);
    }
});
