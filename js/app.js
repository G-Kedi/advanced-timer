import { createTimer } from "./timer.js";

const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

// boutons principaux
const btnStartReset = document.getElementById("btn-start-reset");
const btnPauseResume = document.getElementById("btn-pause-resume");

// icônes dans les boutons
const iconStartReset = document.getElementById("icon-start-reset");
const iconPauseResume = document.getElementById("icon-pause-resume");

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

btnStartReset.addEventListener("click", () => {
  if (!timer.isRunning() && timer.getRemaining() === 0) {
    // Démarrage
    const duration = parseDuration(
      hoursInput.value,
      minutesInput.value,
      secondsInput.value,
    );
    if (duration <= 0) return;

    timer.start(duration);
    runDisplayLoop();

    iconStartReset.src = "assets/icons/reset.png";
    iconStartReset.alt = "Réinitialiser";
  } else {
    // Réinitialisation
    timer.reset();
    displayEl.textContent = "00:00:00";

    hoursInput.value = "";
    minutesInput.value = "";
    secondsInput.value = "";

    // Force bien le changement de l’icône
    iconStartReset.src = "assets/icons/play.png";
    iconStartReset.alt = "Démarrer";

    iconPauseResume.src = "assets/icons/pause.png";
    iconPauseResume.alt = "Pause";

    if (displayIntervalId) {
      clearInterval(displayIntervalId);
      displayIntervalId = null;
    }
  }
});

function runDisplayLoop() {
  if (displayIntervalId) return; // empêche double interval

  displayIntervalId = setInterval(() => {
    const remaining = timer.getRemaining();
    displayEl.textContent = formatTime(remaining);
    if (remaining <= 0 && timer.isRunning()) {
      timer.reset();
      displayEl.textContent = "Terminé";

      iconStartReset.src = "assets/icons/play.png";
      iconStartReset.alt = "Démarrer";

      iconPauseResume.src = "assets/icons/pause.png";
      iconPauseResume.alt = "Pause";

      clearInterval(displayIntervalId);
      displayIntervalId = null;
    }
  }, 200);
}

btnPauseResume.addEventListener("click", () => {
  if (timer.isRunning()) {
    timer.pause();
    iconPauseResume.src = "assets/icons/resume.png";
    iconPauseResume.alt = "Reprendre";
  } else if (timer.getRemaining() > 0) {
    timer.resume();
    iconPauseResume.src = "assets/icons/pause.png";
    iconPauseResume.alt = "Pause";
    runDisplayLoop();
  }
});
