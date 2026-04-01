//Сделайте приложение таймер, куда передаётся время звонка и после окончания таймера отображается сообщение.
//Чтение аргументов можно сделать разбором строки: 1h 5m 10s (1 час, 5 минут, 10 секунд).

import process from "process";

const str = process.argv.slice(2);

const delay = str.reduce((prev, curr) => {
  if (curr?.match(/^(\d+)([hms])$/)) {
    if (curr.match(/h/)) {
      return (prev = prev + Number(curr.match(/\d+/)[0]) * 60 * 60 * 1000);
    }
    if (curr.match(/m/)) {
      return (prev = prev + Number(curr.match(/\d+/)[0]) * 60 * 1000);
    }
    if (curr.match(/s/)) {
      return (prev = prev + Number(curr.match(/\d+/)[0]) * 1000);
    }
  } else {
    console.log(`Ошибка ввода: ${curr}`);
    return prev;
  }
}, 0);

const timer = (delay, message) => {
  console.log("Таймер запущен...");
  setTimeout(() => console.log(message), delay);
};

if (delay > 0) {
  timer(delay, "Таймер прозвонил");
}
