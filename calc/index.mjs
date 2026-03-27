import process from "process";
import { add } from "./add.mjs";
import { divide } from "./divide.mjs";
import { multiply } from "./multiply.mjs";
import { subtract } from "./subtract.mjs";

let firstNumber = Number(process.argv[2]);
let secondNumber = Number(process.argv[3]);
let operation = process.argv[4];

switch (operation) {
  case "add":
    add(firstNumber, secondNumber);
    break;
  case "subtract":
    subtract(firstNumber, secondNumber);
    break;
  case "multiply":
    multiply(firstNumber, secondNumber);
    break;
  case "divide":
    divide(firstNumber, secondNumber);
    break;
  default:
    console.log("Input error");
}
