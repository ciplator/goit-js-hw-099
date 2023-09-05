
 function getRandomHexColor() {
      return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    }

    let intervalId = null;

    const startButton = document.getElementById('Start');
    const stopButton = document.getElementById('Stop');
    const body = document.body;

    startButton.addEventListener('click', () => {
      // Деактивуємо кнопку "Start" та активуємо кнопку "Stop"
      startButton.disabled = true;
      stopButton.disabled = false;

      // Починаємо зміну кольору фону
      intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
      }, 1000);
    });

    stopButton.addEventListener('click', () => {
      // Активуємо кнопку "Start" та деактивуємо кнопку "Stop"
      startButton.disabled = false;
      stopButton.disabled = true;

      // Зупиняємо зміну кольору фону
      clearInterval(intervalId);
    });