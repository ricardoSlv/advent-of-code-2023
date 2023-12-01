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
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const lines = fs.readFileSync("./day_1/input.txt", { encoding: "utf8" }).split("\n");

const sum = lines.reduce((prevValue, currLine) => {
  const digits = [...currLine.matchAll(/\d/g)];
  digits.push(...currLine.matchAll(/one/g));
  digits.push(...currLine.matchAll(/two/g));
  digits.push(...currLine.matchAll(/three/g));
  digits.push(...currLine.matchAll(/four/g));
  digits.push(...currLine.matchAll(/five/g));
  digits.push(...currLine.matchAll(/six/g));
  digits.push(...currLine.matchAll(/seven/g));
  digits.push(...currLine.matchAll(/eight/g));
  digits.push(...currLine.matchAll(/nine/g));

  digits.sort((d1, d2) => (d1.index as number) - (d2.index as number));

  const tensString = digits?.at(0)?.[0] || "0";
  const onesString = digits?.at(-1)?.[0] || "0";
  const currValue = numberStringDigitValues[tensString] * 10 + numberStringDigitValues[onesString];

  return prevValue + currValue;
}, 0);

console.log(sum);
