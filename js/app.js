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

console.log(parseDuration(1,1,1));
