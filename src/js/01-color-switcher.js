function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
}

let intervalId = null;

const startButton = document.getElementById("Start");
const stopButton = document.getElementById("Stop");
const body = document.body;

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  stopButton.disabled = false;

  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopButton.addEventListener("click", () => {
  startButton.disabled = false;
  stopButton.disabled = true;

  clearInterval(intervalId);
});
