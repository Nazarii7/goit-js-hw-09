import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startB = document.querySelector('[data-start]');
const stopB = document.querySelector('[data-stop]');
const clockFace = document.querySelector('timer');
const dayV = document.querySelector('[data-days]');
const hoursV = document.querySelector('[data-hours]');
const minutesV = document.querySelector('[data-minutes]');
const secondsV = document.querySelector('[data-seconds]');

startB.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const finDate = new Date(selectedDates[0]);
    timerOn(finDate);
  },
};

flatpickr('#datetime-picker', options);

function timerOn(finDate) {
  const utcFinDate = finDate.getTime();
  const currentT = Date.now();
  const pastT = utcFinDate < currentT;
  const futureT = utcFinDate > currentT;

  if (futureT) {
    startB.removeAttribute('disabled', 'disabled');
  }
  if (pastT) {
    Notify.failure('Please choose a date in the future');
  }
  startB.addEventListener('click', () => {
    timer.start(utcFinDate, currentT);
  });

  stopB.addEventListener('click', () => {
    timer.stop();
  });
}

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
    this.i();
  }
  i() {
    const time = this.convertMs(0);
    this.onTick(time);
  }

  start(finTime, currentT) {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentT = Date.now();
      const deltaT = finTime - currentT;
      const time = this.convertMs(deltaT);

      this.onTick(time);
      this.timeS(deltaT);
    }, 1000);
  }
  timeS(deltaT) {
    if (deltaT < 1000) {
      timer.stop();
      Notify.failure('NOT GOOD!');
    }
  }
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    const time = this.convertMs(0);
    this.onTick(time);
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
}
function pad(value) {
  return String(value).padStart(2, '0');
}

const timer = new Timer({ onTick: updateTimerFace });

function updateTimerFace({ days, hours, minutes, seconds }) {
  dayV.textContent = `${days}`;
  hoursV.textContent = `${hours}`;
  minutesV.textContent = `${minutes}`;
  secondsV.textContent = `${seconds}`;
}
