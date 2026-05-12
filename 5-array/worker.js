const { parentPort, workerData } = require("worker_threads");

let count = 0;

const chunk = workerData

for (let i = 0; i < chunk?.length; i++) {
  if (chunk[i] % 3 === 0) {
    count = count + 1;
  }
}
parentPort.postMessage(count);
