function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let colorId = null;

const bodY = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

stopBtn.dispatchEvent = true;
startBtn.addEventListener('click', () => {
  startBtn.dispatchEvent = true;
  stopBtn.dispatchEvent = false;
  colorId = setInterval(() => {
    const color = getRandomHexColor();
    bodY.style.backgroundColor = `${color}`;
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  console.log('stop');
  startBtn.dispatchEvent = false;
  clearInterval(colorId);
  stopBtn.dispatchEvent = true;
});
