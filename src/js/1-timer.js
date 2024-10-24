import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null;
let timerInterval = null;

const startButton = document.querySelector('button[data-start]');
const dataPicker = document.querySelector('#datetime-picker');
const daysSpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      if (selectedDate <= new Date()) {
          iziToast.error({
              title: 'Error',
              message: 'Please choose a date in the future',
          });
          startButton.disabled = true;
      } else {
          userSelectedDate = selectedDate;
          startButton.disabled = false;
      }
  },
};


flatpickr(dataPicker, options);

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function updateTimerDisplay({ days, hours, minutes, seconds }) {
    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);
}


function startTimer() {
    startButton.disabled = true;
    dataPicker.disabled = true;

    timerInterval = setInterval(() => {
        const currentTime = new Date();
        const timeDifference = userSelectedDate - currentTime;

        if (timeDifference <= 0) {
            clearInterval(timerInterval);
            updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            dataPicker.disabled = false;
            return;
        }

        const timeComponents = convertMs(timeDifference);
        updateTimerDisplay(timeComponents);
    }, 1000);
}


startButton.addEventListener('click', startTimer);