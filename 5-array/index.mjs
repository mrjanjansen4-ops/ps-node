import os from 'node:os'

const cpusCount = os.cpus().length
console.log(cpusCount)

for (let i; i < 5000; i++) {
  console.log(i);
}
