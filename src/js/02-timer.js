import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Функція для форматування числа з переднім нулем, якщо число менше 10
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

// Функція для відображення часу на інтерфейсі
function updateTimerDisplay(days, hours, minutes, seconds) {
  const daysElement = document.querySelector('[data-days]');
  const hoursElement = document.querySelector('[data-hours]');
  const minutesElement = document.querySelector('[data-minutes]');
  const secondsElement = document.querySelector('[data-seconds]');

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

// Функція для обчислення різниці між поточною датою і обраною датою
function calculateTimeDifference(selectedDate) {
  const currentDate = new Date();
  const timeDifference = selectedDate - currentDate;

  if (timeDifference < 0) {
    // Вибрана дата в минулому, відобразити повідомлення і заблокувати кнопку "Start"
    alert("Please choose a date in the future");
    return null;
  }

  return timeDifference;
}

// Функція для початку відліку
function startCountdown(selectedDate) {
  const timerInterval = setInterval(() => {
    const timeDifference = calculateTimeDifference(selectedDate);

    if (timeDifference === null || timeDifference <= 0) {
      clearInterval(timerInterval);
      document.querySelector('[data-start]').disabled = true;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000);
}

// Опції для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate) {
      const timeDifference = calculateTimeDifference(selectedDate);

      if (timeDifference !== null && timeDifference > 0) {
        document.querySelector('[data-start]').disabled = false;
        startCountdown(selectedDate);
      }
    }
  },
};

// Ініціалізація flatpickr
flatpickr('#datetime-picker', options);

// Функція для конвертації мілісекунд у дні, години, хвилини і секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}