// glitch-title.js

const messages = [
  "PROJECT:800a",
  "Multidimensional Node",
  "Observation: ACTIVE"
];

const glitchChars = "!@#$%^&*()_+{}|:<>?-=[];',./~";

function glitchText(text, iterations = 10, delay = 100) {
  let iteration = 0;
  const originalText = text;
  const interval = setInterval(() => {
    let glitched = '';
    for (let i = 0; i < originalText.length; i++) {
      if (Math.random() < 0.5) {
        glitched += glitchChars.charAt(Math.floor(Math.random() * glitchChars.length));
      } else {
        glitched += originalText.charAt(i);
      }
    }
    document.title = glitched;
    iteration++;
    if (iteration >= iterations) {
      clearInterval(interval);
      document.title = originalText;
    }
  }, delay);
}

let currentMessage = 0;
setInterval(() => {
  glitchText(messages[currentMessage]);
  currentMessage = (currentMessage + 1) % messages.length;
}, 3000);
