const videoEl = document.querySelector(".video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const speedSelectorEl = document.querySelector(".player-speed");
const timeElapsedEl = document.querySelector(".time-elapsed");
const timeDurationEl = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");
const player = document.querySelector(".player");

let lastVolume = 1;
let fullscreen = false;

const openFullscreen = (element) => {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullscreen) {
        element.mozRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }

    videoEl.classList.add("video-fullscreen");
};

const closeFullscreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullscreen) {
        document.mozCancelFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    videoEl.classList.remove("video-fullscreen");
};


const toggleFullscreen = () => {
    if (!fullscreen) {
        openFullscreen(player);
    } else {
        closeFullscreen();
    }

    !fullscreen ? openFullscreen(player) : closeFullscreen();

    fullscreen = !fullscreen;
};

const setSpeed = () => {
    videoEl.playbackRate = speedSelectorEl.value;
};

const toggleMute = () => {
    volumeIcon.className = "";
    if (videoEl.volume) {
        lastVolume = videoEl.volume;
        videoEl.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add("fa-solid", "fa-volume-xmark");
        volumeIcon.setAttribute("title", "Unmute");
    } else {
        videoEl.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        volumeIcon.classList.add("fa-solid", "fa-volume-high");
        volumeIcon.setAttribute("title", "Mute");
    }
};

const setVolume = (event) => {
    const volume = event.offsetX / volumeRange.offsetWidth;
    const roundedVolume = Math.round(volume * 100);

    volumeBar.style.width = `${roundedVolume}%`;
    videoEl.volume = volume;

    volumeIcon.className = "";

    if (roundedVolume >= 50) {
        volumeIcon.classList.add("fa-solid", "fa-volume-high");
    } else if (roundedVolume < 50 && roundedVolume >= 3) {
        volumeIcon.classList.add("fa-solid", "fa-volume-low");
    } else if (roundedVolume < 3) {
        volumeIcon.classList.add("fa-solid", "fa-volume-xmark");
    }

    lastVolume = volume;
};

const setProgress = (event) => {
    const newTime = event.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    videoEl.currentTime = newTime * videoEl.duration;
};

const displayTime = (time) => {
    let mins = Math.floor(time / 60);
    mins = mins < 10 ? `0${mins}` : mins;
    let secs = Math.floor(time % 60);
    secs = secs < 10 ? `0${secs}` : secs;

    return `${mins}:${secs}`;
};

const updateProgressBar = () => {
    progressBar.style.width = `${(videoEl.currentTime / videoEl.duration) * 100}%`;
    timeElapsedEl.textContent = `${displayTime(videoEl.currentTime)} /`;
    timeDurationEl.textContent = `${displayTime(videoEl.duration)}`;
};

const showPlayIcon = () => {
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
};

const toggleVidePlay = () => {
    if (videoEl.paused) {
        videoEl.play();
        playBtn.classList.replace("fa-play", "fa-pause");
        playBtn.setAttribute("title", "Pause");
    } else {
        videoEl.pause();
        showPlayIcon();
    }
};

playBtn.addEventListener("click", toggleVidePlay);
videoEl.addEventListener("click", toggleVidePlay);
videoEl.addEventListener("ended", showPlayIcon);
videoEl.addEventListener("timeupdate", updateProgressBar);
videoEl.addEventListener("canplay", updateProgressBar);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", setVolume);
volumeIcon.addEventListener("click", toggleMute);
speedSelectorEl.addEventListener("change", setSpeed);
fullscreenBtn.addEventListener("click", toggleFullscreen);