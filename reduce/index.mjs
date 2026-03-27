//TЗ Используя метод Reduce, инвертировать строку "node" в "adon". <- На платформе опечатка
import process from "process";

let value = process.argv[2];

console.log([...value].reduce((acc, item) => acc = item + acc))