const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdown-form");
const dateEl = document.getElementById("date-picker");

const countdownTitleEl = document.getElementById("countdown-title");
const countdownEl = document.getElementById("countdown");
const countdownBtn = document.getElementById("countdown-button");
const timeEls = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeInfoEl = document.getElementById("complete-info");
const completeBtnEl = document.getElementById("complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = new Date();
let intervalCountdown;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const minInputDate = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", minInputDate);

const updateTimeValues = () => {
    intervalCountdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;

        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        inputContainer.hidden = true;

        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(intervalCountdown);
            completeInfoEl.textContent = `${countdownTitle} finished on ${countdownDate}!`
            completeEl.hidden = false;
        } else {
            countdownTitleEl.textContent = `${countdownTitle}`;
            timeEls[0].textContent = days < 10 ? `${days}` : days;
            timeEls[1].textContent = hours < 10 ? `0${hours}` : hours;
            timeEls[2].textContent = minutes < 10 ? `0${minutes}` : minutes;
            timeEls[3].textContent = seconds < 10 ? `0${seconds}` : seconds;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
    }, second);
};

const updateCountdown = event => {
    event.preventDefault();
    countdownTitle = event.srcElement[0].value;
    countdownDate = event.srcElement[1].value;

    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    };

    localStorage.setItem("countdown", JSON.stringify(savedCountdown));

    if (countdownDate === "") {
        alert("Please enter a date!");
    } else {
        countdownValue = new Date(countdownDate).getTime();
        updateTimeValues();
    }
};

const resetCountdown = () => {
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;

    clearInterval(intervalCountdown);

    countdownTitle = "";
    countdownDate = "";
    localStorage.removeItem("countdown");
};

const restorePreviousCountdown = () => {
    if (localStorage.getItem("countdown")) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem("countdown"));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateTimeValues();
    }
};

countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", resetCountdown);
completeBtnEl.addEventListener("click", resetCountdown);

// On Load
restorePreviousCountdown();