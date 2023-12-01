import fs from "node:fs";

const numberStringDigitValues: Record<string, number> = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  on: 1,
  tw: 2,
  thre: 3,
  fou: 4,
  fiv: 5,
  si: 6,
  seve: 7,
  eigh: 8,
  nin: 9,
};

const lines = fs.readFileSync("./day_1/input.txt", { encoding: "utf8" }).split("\n");

const sum = lines.reduce((prevValue, currLine) => {
  const digits = [
    ...currLine.matchAll(
      /\d|(on(?=e))|(tw(?=o))|(thre(?=e))|(fou(?=r))|(fiv(?=e))|(si(?=x))|(seve(?=n))|(eigh(?=t))|(nin(?=e))/g
    ),
  ];

  const tensString = digits?.at(0)?.[0] || "0";
  const onesString = digits?.at(-1)?.[0] || "0";
  const currValue = numberStringDigitValues[tensString] * 10 + numberStringDigitValues[onesString];

  return prevValue + currValue;
}, 0);

console.log(sum);
