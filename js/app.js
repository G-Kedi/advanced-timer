"use strict";

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