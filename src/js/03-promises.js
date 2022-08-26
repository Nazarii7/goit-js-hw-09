import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  let curDelay = Number(delay.value);
  const curStep = Number(step.value);
  const curAmount = Number(amount.value);

  for (let i = 1; i <= curAmount; i += 1) {
    createPromise(i, curDelay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay} ms`);
      });
    curDelay += curStep;
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}
