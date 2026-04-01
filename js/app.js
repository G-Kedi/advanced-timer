"use strict";
const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resumeBtn = document.getElementById("resume-btn");
const resetBtn = document.getElementById("reset-btn");

const displayEl = document.getElementById("timer-display");
let displayIntervalId = null;

const timer = {
  duration: 0,
  startTime: null,
  remaining: 0,
  isRunning: false,
};

function parseDuration(hours, minutes, seconds) {
  const h = Number(hours) || 0;
  const m = Number(minutes) || 0;
  const s = Number(seconds) || 0;

  return (h * 3600 + m * 60 + s) * 1000;
}

function start(duration) {
  if (timer.isRunning) return;

  timer.duration = duration;
  timer.startTime = Date.now();
  timer.isRunning = true;
}

function getRemaining() {
  if (!timer.isRunning) return timer.remaining;

  const elapsed = Date.now() - timer.startTime;
  const remaining = timer.duration - elapsed;

  return Math.max(remaining, 0);
}

function pause() {
  if (!timer.isRunning) return;

  timer.remaining = getRemaining(); // figer le temps restant
  timer.isRunning = false;
}

function resume() {
  if (timer.isRunning || timer.remaining <= 0) return;

  timer.duration = timer.remaining;
  timer.startTime = Date.now();
  timer.isRunning = true;
}

function reset() {
  timer.duration = 0;
  timer.startTime = null;
  timer.remaining = 0;
  timer.isRunning = false;
}

function formatTime(ms) {
  const totalSeconds = Math.ceil(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

startBtn.addEventListener("click", () => {
  const duration = parseDuration(
    hoursInput.value,
    minutesInput.value,
    secondsInput.value,
  );

  if (duration <= 0) return;

  start(duration); // moteur JS
  runDisplayLoop(); // fonction qui met à jour l'affichage (on va la créer)
});

function runDisplayLoop() {
  if (displayIntervalId) return; // empêche double interval

  displayIntervalId = setInterval(() => {
    const remaining = getRemaining();
    displayEl.textContent = formatTime(remaining);

    if (remaining <= 0 && timer.isRunning) {
      reset();
      displayEl.textContent = "Timer terminé";
      clearInterval(displayIntervalId);
      displayIntervalId = null;
    }
  }, 200);
}

pauseBtn.addEventListener("click", () => {
  pause();
});

resumeBtn.addEventListener("click", () => {
  resume();
  runDisplayLoop();
});

resetBtn.addEventListener("click", () => {
  reset();
  displayEl.textContent = "00:00:00";
  if (displayIntervalId) {
    clearInterval(displayIntervalId);
    displayIntervalId = null;
  }
});
