const video = document.querySelector('.video');
const playToggler = document.querySelector('.play-toggler');
const TogglerImg = document.querySelector('.play-toggler img');
const timersDisplay = document.querySelectorAll('.time-display');
let current;
let totalDuration;

video.addEventListener('click', togglePlay);
playToggler.addEventListener('click', togglePlay);
video.addEventListener('loadeddata', fillDurationVariables);
window.addEventListener('load', fillDurationVariables);

function togglePlay() {
  if (video.paused) {
    TogglerImg.src = 'ressources/pause.svg';
    video.play();
  } else {
    TogglerImg.src = 'ressources/play.svg';
    video.pause();
  }
}

function fillDurationVariables(e) {
  if (Number.isNan(video.duration)) return;

  current = video.currentTime;
  totalDuration = video.duration;

  formatValue(current, timersDisplay[0]);
  formatValue(totalDuration, timersDisplay[1]);
}

function formatValue(val, el) {
  let currentMin = Math.trunc(val / 60);
  let currentSec = Math.trunc(val % 60);

  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }

  el.textContent = `${currentMin}:${currentSec}`;
}
