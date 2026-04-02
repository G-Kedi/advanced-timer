import { createTimer } from "./timer.js";

const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resumeBtn = document.getElementById("resume-btn");
const resetBtn = document.getElementById("reset-btn");

const displayEl = document.getElementById("timer-display");
let displayIntervalId = null;

const timer = createTimer();

function formatTime(ms) {
  const totalSeconds = Math.ceil(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function parseDuration(hours, minutes, seconds) {
  const h = Number(hours) || 0;
  const m = Number(minutes) || 0;
  const s = Number(seconds) || 0;

  return (h * 3600 + m * 60 + s) * 1000;
}

startBtn.addEventListener("click", () => {
  const duration = parseDuration(
    hoursInput.value,
    minutesInput.value,
    secondsInput.value,
  );

  if (duration <= 0) return;

  timer.start(duration); // moteur JS
  runDisplayLoop(); // fonction qui met à jour l'affichage (on va la créer)
});

function runDisplayLoop() {
  if (displayIntervalId) return; // empêche double interval

  displayIntervalId = setInterval(() => {
    const remaining = timer.getRemaining();
    displayEl.textContent = formatTime(remaining);

    if (remaining <= 0 && timer.isRunning()) {
      timer.reset();
      displayEl.textContent = "Timer terminé";
      clearInterval(displayIntervalId);
      displayIntervalId = null;
    }
  }, 200);
}

pauseBtn.addEventListener("click", () => {
  timer.pause();
});

resumeBtn.addEventListener("click", () => {
  timer.resume();
  runDisplayLoop();
});

resetBtn.addEventListener("click", () => {
  timer.reset();
  displayEl.textContent = "00:00:00";
  if (displayIntervalId) {
    clearInterval(displayIntervalId);
    displayIntervalId = null;
  }
});
