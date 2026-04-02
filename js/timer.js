"use strict";

export function createTimer() {
  let duration = 0;
  let startTime = null;
  let remaining = 0;
  let isRunning = false;

  function start(d) {
    if (isRunning) return;
    duration = d;
    startTime = Date.now();
    isRunning = true;
  }

  function getRemaining() {
    if (!isRunning) return remaining;
    const elapsed = Date.now() - startTime;
    return Math.max(duration - elapsed, 0);
  }

  function pause() {
    if (!isRunning) return;
    remaining = getRemaining();
    isRunning = false;
  }

  function resume() {
    if (isRunning || remaining <= 0) return;
    duration = remaining;
    startTime = Date.now();
    isRunning = true;
  }

  function reset() {
    duration = 0;
    startTime = null;
    remaining = 0;
    isRunning = false;
  }

  function isRunningState() {
    return isRunning;
  }

  return {
    start,
    getRemaining,
    pause,
    resume,
    reset,
    isRunning: isRunningState,
  };
}
