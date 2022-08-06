const video = document.querySelector('.video');
const playToggler = document.querySelector('.play-toggler');
const TogglerImg = document.querySelector('.play-toggler img');
const timersDisplay = document.querySelectorAll('.time-display');
const progress = document.querySelector('.progress');
const muteBtn = document.querySelector('.mute-btn');
const muteIcon = document.querySelector('.mute-btn img');
const volumeSlider = document.querySelector('.volume-slider');
const progressBar = document.querySelector('.progress-bar');
const fullScreenToggler = document.querySelector('.fullscreen-toggler');
const videoContainer = document.querySelector('.video-container');

let current;
let totalDuration;
let rect = progressBar.getBoundingClientRect();
let largeur = rect.width;

video.addEventListener('click', togglePlay);
playToggler.addEventListener('click', togglePlay);
video.addEventListener('loadeddata', fillDurationVariables);
window.addEventListener('load', fillDurationVariables);
video.addEventListener('timeupdate', handleTimeUpdate);
muteBtn.addEventListener('click', handleMute);
volumeSlider.addEventListener('change', handleVolumeModification);
window.addEventListener('resize', handleResize);
progressBar.addEventListener('click', handleProgressNavigation);
video.addEventListener('dblclick', toggleFullScreen);
fullScreenToggler.addEventListener('click', toggleFullScreen);

function togglePlay() {
  if (video.paused) {
    TogglerImg.src = 'ressources/pause.svg';
    video.play();
  } else {
    TogglerImg.src = 'ressources/play.svg';
    video.pause();
  }
}

function fillDurationVariables() {
  if (Number.isNaN(video.duration)) return;

  current = video.currentTime;
  totalDuration = video.duration;

  formatValue(current, timersDisplay[0]);
  formatValue(totalDuration, timersDisplay[1]);
  video.removeEventListener('loadeddata', fillDurationVariables);
  window.removeEventListener('load', fillDurationVariables);
}

function formatValue(val, el) {
  let currentMin = Math.trunc(val / 60);
  let currentSec = Math.trunc(val % 60);

  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }

  el.textContent = `${currentMin}:${currentSec}`;
}

function handleTimeUpdate() {
  current = video.currentTime;

  formatValue(current, timersDisplay[0]);

  const progressPosition = current / totalDuration;

  progress.style.transform = `scaleX(${progressPosition})`;

  if (video.ended) {
    TogglerImg.src = 'ressources/play.svg';
  }
}

function handleMute(e) {
  if (video.muted) {
    video.muted = false;
    muteIcon.src = 'ressources/unmute.svg';
  } else {
    video.muted = true;
    muteIcon.src = 'ressources/mute.svg';
  }
}

function handleVolumeModification() {
  video.volume = volumeSlider.value / 100;
  if (video.volume === 0) {
    muteIcon.src = 'ressources/mute.svg';
  } else muteIcon.src = 'ressources/unmute.svg';
}

function handleResize() {
  let rect = progressBar.getBoundingClientRect();
  let largeur = rect.width;
}

function handleProgressNavigation(e) {
  const x = e.clientX - rect.left;

  const widthPercent = x / largeur;

  video.currentTime = video.duration * widthPercent;
}

function toggleFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
}
