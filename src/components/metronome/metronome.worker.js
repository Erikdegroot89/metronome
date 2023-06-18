/* eslint-disable no-restricted-globals */
let intervalId = null;

self.onmessage = (e) => {
  const { bpm, measure } = e.data;
  let beat = 0;
  
  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    
    self.postMessage({ beat: beat });
    const nextBeat = (beat + 1) % measure;
    beat = nextBeat;
  }, (60 / bpm) * 1000);
};
