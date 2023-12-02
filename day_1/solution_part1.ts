import fs from "node:fs";

const lines = fs.readFileSync("./day_1/input.txt", { encoding: "utf8" }).split("\n");

const sum = lines.reduce((prevValue, currLine) => {
  const digits = currLine.match(/\d/g);

  //@ts-ignore
  const currValue = parseInt(digits?.at(0) + digits?.at(-1));

  return prevValue + currValue;
}, 0);

console.log(sum);
