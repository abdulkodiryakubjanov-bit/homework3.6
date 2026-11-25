
function pad(n) {
  return String(n).padStart(2, "0");
}

const greeting = document.querySelector("#greeting");
const hour = new Date().getHours();
let hello;

if (hour < 6) {
  hello = "Доброй ночи";
} else if (hour < 12) {
  hello = "Доброе утро";
} else if (hour < 18) {
  hello = "Добрый день";
} else {
  hello = "Добрый вечер";
}
greeting.textContent = `${hello}! Сегодня отличный день для кода.`;


const clock = document.querySelector("#clock");
const dateEl = document.querySelector("#date");
const newYearEl = document.querySelector("#newYear");

const days = [
  "воскресенье", "понедельник", "вторник",
  "среда", "четверг", "пятница", "суббота"
];
const months = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря"
];

let alarmTime = null;
let alarmTriggered = false;

function updateNewYear(now) {
  const nextYear = now.getFullYear() + 1;
  const newYearDate = new Date(nextYear, 0, 1);
  const diffMs = newYearDate - now;

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);
  newYearEl.textContent = `🎄 До Нового года: ${days} дн. ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function updateClock() {
  const now = new Date();
  const hh = pad(now.getHours());
  const mm = pad(now.getMinutes());
  const ss = pad(now.getSeconds());

  clock.textContent = `${hh}:${mm}:${ss}`;
  dateEl.textContent = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

  updateNewYear(now);

  const currentHM = `${hh}:${mm}`;
  if (alarmTime && currentHM === alarmTime && !alarmTriggered) {
    alarmTriggered = true;
    document.querySelector("#alarmMsg").textContent = "⏰ Пора!";
    document.querySelector("#alarmStatus").textContent = "Будильник сработал";
  }
}

updateClock();
setInterval(updateClock, 1000);


const stopwatch = document.querySelector("#stopwatch");
const swStart = document.querySelector("#swStart");
const swStop = document.querySelector("#swStop");
const swLap = document.querySelector("#swLap");
const swReset = document.querySelector("#swReset");
const lapsList = document.querySelector("#lapsList");

let swTime = 0;
let swId = null;
let lapCount = 0;

function formatStopwatch(time) {
  const minutes = Math.floor(time / 600);
  const seconds = Math.floor((time % 600) / 10);
  const tenth = time % 10;
  return `${pad(minutes)}:${pad(seconds)}.${tenth}`;
}

function showStopwatch() {
  stopwatch.textContent = formatStopwatch(swTime);
}

swStart.addEventListener("click", () => {
  if (swId !== null) return;
  swId = setInterval(() => {
    swTime++;
    showStopwatch();
  }, 100);
});

swStop.addEventListener("click", () => {
  clearInterval(swId);
  swId = null;
});

swLap.addEventListener("click", () => {
  if (swTime === 0) return;
  lapCount++;
  const li = document.createElement("li");
  li.textContent = `Круг ${lapCount}: ${formatStopwatch(swTime)}`;
  lapsList.append(li);
});

swReset.addEventListener("click", () => {
  clearInterval(swId);
  swId = null;
  swTime = 0;
  lapCount = 0;
  lapsList.innerHTML = "";
  showStopwatch();
});


const timerInput = document.querySelector("#timerInput");
const timerStart = document.querySelector("#timerStart");
const timerStop = document.querySelector("#timerStop");
const timerContinue = document.querySelector("#timercontinue");
const timerReset = document.querySelector("#timerReset");
const timerView = document.querySelector("#timerView");
const timerMsg = document.querySelector("#timerMsg");

let timerLeft = Number(timerInput.value) || 10;
let timerId = null;

function showTimer() {
  const minutes = Math.floor(timerLeft / 60);
  const seconds = timerLeft % 60;
  timerView.textContent = `${pad(minutes)}:${pad(seconds)}`;
}

function runTimerInterval() {
  if (timerId !== null || timerLeft <= 0) return;

  timerId = setInterval(() => {
    timerLeft--;
    showTimer();

    if (timerLeft <= 0) {
      clearInterval(timerId);
      timerId = null;
      timerMsg.textContent = "Время вышло!";

      setTimeout(() => {
        timerMsg.textContent = "";
      }, 3000);
    }
  }, 1000);
}

timerStart.addEventListener("click", () => {
  clearInterval(timerId);
  timerId = null;

  const val = Number(timerInput.value);
  if (isNaN(val) || val <= 0) {
    timerMsg.textContent = "Введи число больше нуля";
    return;
  }

  timerLeft = val;
  timerMsg.textContent = "";
  showTimer();
  runTimerInterval();
});

timerStop.addEventListener("click", () => {
  clearInterval(timerId);
  timerId = null;
});

timerContinue.addEventListener("click", () => {
  runTimerInterval();
});

timerReset.addEventListener("click", () => {
  clearInterval(timerId);
  timerId = null;
  const val = Number(timerInput.value);
  timerLeft = val > 0 ? val : 0;
  timerMsg.textContent = "";
  showTimer();
});


const alarmInput = document.querySelector("#alarmInput");
const alarmSet = document.querySelector("#alarmSet");
const alarmClear = document.querySelector("#alarmClear");
const alarmStatus = document.querySelector("#alarmStatus");
const alarmMsg = document.querySelector("#alarmMsg");

alarmSet.addEventListener("click", () => {
  if (!alarmInput.value) {
    alarmMsg.textContent = "Выберите время!";
    return;
  }
  alarmTime = alarmInput.value;
  alarmTriggered = false;
  alarmMsg.textContent = "";
  alarmStatus.textContent = `Будильник установлен на ${alarmTime}`;
});

alarmClear.addEventListener("click", () => {
  alarmTime = null;
  alarmTriggered = false;
  alarmInput.value = "";
  alarmMsg.textContent = "";
  alarmStatus.textContent = "Будильник не установлен";
});
