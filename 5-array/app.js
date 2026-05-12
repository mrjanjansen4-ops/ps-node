// Задание:
// Создайте массив от 1 до 300 000.
// Определите количество чисел, делящихся на 3 без остатка в этом массиве.
// Шаги выполнения:
// Линейный подход:
// Используйте цикл для прохода по массиву.
// Подсчитайте и выведите количество подходящих чисел.
// Многопоточный подход:
// Разбиение массива: Разделите исходный массив на N частей, соответствующих количеству ядер вашего процессора.
// Параллельный расчет: Осуществите подсчет в каждом подмассиве в отдельном потоке.
// Сбор результатов: Объедините результаты всех потоков и выведите итоговое количество.
// Измерение времени: Замерьте и сравните временные затраты между линейным и многопоточным подходами.

const { performance } = require("node:perf_hooks");
const { Worker } = require("worker_threads");
const os = require("node:os");
const { error } = require("node:console");

const cpusCount = os.cpus().length;
const data = Array.from({ length: 30000000 }, (_, i) => i + 1);

const splitArray = (data, cpusCount) => {
  const allChunks = [...data];
  const chunks = [];
  let chunkLength = 0;

  chunkLength = Math.ceil(allChunks.length / cpusCount);

  while (allChunks.length > 0) {
    chunks.push(allChunks.splice(0, chunkLength));
  }

  return chunks;
};

const main = (data) => {
  performance.mark("start");
  let result = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] % 3 === 0) {
      result = result + 1;
    }
  }
  performance.mark("end");
  performance.measure("main", "start", "end");
  console.log(
    "Main flow performance",
    performance.getEntriesByName("main").pop().duration,
  );
  console.log(result);
  return result;
};

const runWorker = (chunk) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", {
      workerData: chunk,
    });

    worker.on("message", (result) => {
      resolve(result);
    });

    worker.on("error", (error) => {
      reject(error);
    });

    worker.on("exit", (status) => {
      if (status !== 0) {
        reject();
      }
    });
  });
};

const getResult = async () => {
  const promises = splitArray(data, cpusCount).map((chunk) => runWorker(chunk));

  performance.mark("worker-start");
  const results = await Promise.all(promises);
  performance.mark("worker-end");
  performance.measure("main", "worker-start", "worker-end");
  console.log(
    "Worker performance",
    performance.getEntriesByName("main").pop().duration,
  );

  const result = results.reduce((acc, curr) => acc + curr, 0);
  console.log(result);
  return result;
};

const start = async () => {
  main(data);
  await getResult();
};

start();
