const musicImage = document.querySelector("img");
const musicTitle = document.getElementById("title");
const musicArtist = document.getElementById("artist");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const audioEl = document.querySelector("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const songs = [
    {
        musicName: "music1",
        imageName: "cover1",
        displayName: "The Nights",
        artist: "Avicci"
    },
    {
        musicName: "music2",
        imageName: "cover2",
        displayName: "Whatever It Takes",
        artist: "Imagine Dragons"
    },
    {
        musicName: "music3",
        imageName: "cover3",
        displayName: "Blank Space",
        artist: "Taylor Swift"
    },
    {
        musicName: "music4",
        imageName: "cover4",
        displayName: "All Too Well",
        artist: "Taylor Swift"
    }
];

let isPlaying = false;
let songIdx = 0;

const playMusic = () => {
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    audioEl.play();
};

const pauseMusic = () => {
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    audioEl.pause();
};

playBtn.addEventListener("click", () => isPlaying ? pauseMusic() : playMusic());

const loadSong = (song) => {
    musicTitle.textContent = song.displayName;
    musicArtist.textContent = song.artist;
    audioEl.src = `./assets/music/${song.musicName}.mp3`;
    musicImage.src = `./assets/images/${song.imageName}.png`;
};

const previousSong = () => {
    songIdx--;
    if (songIdx < 0) {
        songIdx = songs.length - 1;
    }

    loadSong(songs[songIdx]);
    playMusic();
};

const nextSong = () => {
    songIdx++;
    if (songIdx > songs.length - 1) {
        songIdx = 0;
    }

    loadSong(songs[songIdx]);
    playMusic();
};

const updateProgressBar = (event) => {
    if (isPlaying) {
        const { duration, currentTime } = event.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Duration
        const durationMins = Math.floor(duration / 60);
        let durationSecs = Math.floor(duration % 60);

        if (durationSecs < 10) {
            durationSecs = `0${durationSecs}`;
        }

        if (durationSecs) {
            durationEl.textContent = `${durationMins}:${durationSecs}`;
        }

        // Current Time
        const currentMins = Math.floor(currentTime / 60);
        let currentSecs = Math.floor(currentTime % 60);

        if (currentSecs < 10) {
            currentSecs = `0${currentSecs}`;
        }

        currentTimeEl.textContent = `${currentMins}: ${currentSecs}`;
    }
};

function setProgressBar(event) {
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const { duration } = audioEl;
    audioEl.currentTime = clickX / width * duration;
};

loadSong(songs[songIdx]);

prevBtn.addEventListener("click", previousSong);
nextBtn.addEventListener("click", nextSong);
audioEl.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
audioEl.addEventListener("ended", nextSong);