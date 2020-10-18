const mineTemplate = document.getElementById("bubble-template-mine");
const mineTextOfTemplate = mineTemplate.content.querySelector(".bubble-text");
const mineTimeOfTemplate = mineTemplate.content.querySelector(".bubble-time");
const yourTemplate = document.getElementById("bubble-template-yours");
const yourTextOfTemplate = yourTemplate.content.querySelector(".bubble-text");
const yourTimeOfTemplate = yourTemplate.content.querySelector(".bubble-time");
const lastSeen = document.querySelector(".last-seen");
const answers = [
    "ясно",
    "понятно",
    "ок",
    ")",
    "(",
    "бывает"
];


const fillMineBubble = (myText, myTime) => {
    mineTextOfTemplate.textContent = myText;
    mineTimeOfTemplate.textContent = myTime;
    const clone = document.importNode(mineTemplate.content, true);
    document.getElementById("main").appendChild(clone);
};


function sendMessage() {
    const input = document.getElementById('input-text');
    const textInput = input.value;
    if (textInput.length === 0) return;
    const today = new Date();
    const currentTime = (`0${today.getHours()}`).slice(-2) + ':' + (`0${today.getMinutes()}`).slice(-2);
    input.value = null;

    const allMsg = new Array(...document.querySelectorAll('.bubble'));
    const lastMsgInChat = allMsg.pop();

    if (lastMsgInChat.classList.contains('mine') === true) {
        lastMsgInChat.classList.remove('last');
    }

    fillMineBubble(textInput, currentTime);
}

document.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') {
        sendMessage();
        setTimeout(getAnswer, 5000);
    }
    return false;
});

//--------------------------------------------------------------------

function getRandomNumber(max) {
    return Math.floor(Math.random() * (max + 1));
}

function getRandomElementFromAnswers() {
    const randomNumber = getRandomNumber(5);
    return answers[randomNumber];
}

const fillYourBubble = (text, time) => {
    yourTextOfTemplate.textContent = text;
    yourTimeOfTemplate.textContent = time;
    const clone = document.importNode(yourTemplate.content, true);
    document.getElementById("main").appendChild(clone);
};

function getAnswer() {
    const today = new Date();
    const text = getRandomElementFromAnswers();
    const currentTime = (`0${today.getHours()}`).slice(-2) + ':' + (`0${today.getMinutes()}`).slice(-2);
    const audio = document.querySelector(`audio`);
    //audio.currentTime = 0;
    //audio.play();
    const currentLastTime = `last seen today at ${currentTime}`;
    lastSeen.textContent = currentLastTime;

    const allMsg = new Array(...document.querySelectorAll('.bubble'));
    const lastMsgInChat = allMsg.pop();
    if (lastMsgInChat.classList.contains('yours') === true) {
        lastMsgInChat.classList.remove('last');
    }

    fillYourBubble(text, currentTime);
}

//-----------------------------------------------------------------------------------
const modalWrap = document.querySelector(".modal-wrap");
const modalContainer = document.querySelector(".modal-container");
const attachButton = document.querySelector(".attachment-container");
const cancelButton = document.querySelector(".cancel");
const inputFile = document.getElementById("input-file");
let fileName;
let fileSize;

attachButton.onclick = function () {
    modalWrap.classList.toggle('hidden');
    modalContainer.style.bottom = "10px";
};

modalWrap.onclick = function (event) {
    let target = event.target;
    if (target.className !== 'modal-wrap') return;
    modalContainer.style.bottom = "-336px";
    const hiddenModalWrap = () => modalWrap.classList.toggle('hidden');
    setTimeout(hiddenModalWrap, 250);
}

cancelButton.onclick = function (event) {
    modalContainer.style.bottom = "-336px";
    const hiddenModalWrap = () => modalWrap.classList.toggle('hidden');
    setTimeout(hiddenModalWrap, 250);
}


inputFile.onchange = function () {
    //let fileSize =  inputFile.size;
    let value = inputFile.value.split('\\');
    fileName = value[value.length - 1];
    const size = inputFile.files.item(0).size;
    if (size < 1000) {
        fileSize = Math.round((size / 1000));
    } else {
        fileSize = Math.round(fileSize);
    }



    console.log(fileSize);
};

const Filevalidation = () => {
    const fi = document.getElementById('file');
    // Check if any file is selected.
    if (fi.files.length > 0) {
        for (const i = 0; i <= fi.files.length - 1; i++) {

            const fsize = fi.files.item(i).size;
            const file = Math.round((fsize / 1024));
            // The size of the file.
            if (file >= 4096) {
                alert(
                    "File too Big, please select a file less than 4mb");
            } else if (file < 2048) {
                alert(
                    "File too small, please select a file greater than 2mb");
            } else {
                document.getElementById('size').innerHTML = '<b>'
                    + file + '</b> KB';
            }
        }
    }
}


