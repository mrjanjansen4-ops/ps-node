import process from "process";
import EventEmitter from "events";

let firstNumber = Number(process.argv[2]);
let secondNumber = Number(process.argv[3]);
let operation = process.argv[4];

const myEmitter = new EventEmitter();

myEmitter.on(operation, (firstNumber, secondNumber) => {
  switch (operation) {
  case "add":
    myEmitter.emit('result', firstNumber + secondNumber)
    break;
  case "subtract":
    myEmitter.emit('result', firstNumber - secondNumber)
    break;
  case "multiply":
    myEmitter.emit('result', firstNumber * secondNumber)
    break;
  case "divide":
    myEmitter.emit('result', firstNumber / secondNumber)
    break;
  default:
    myEmitter.emit('error', 'Input Error')
}
});

myEmitter.on("result", (result) => console.log(result));
myEmitter.on("error", (err) => console.log(err));

myEmitter.emit(operation, firstNumber, secondNumber);
