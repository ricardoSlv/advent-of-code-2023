import fs from "node:fs";

const lines = fs.readFileSync("./day_4/input.txt", { encoding: "utf8" }).split("\n");

const gamesByLine = lines.map((l) =>
  l
    .split(/: +/)[1]
    .split(/ +\| +/)
    .map((gameString) =>
      gameString
        .split(/ +/)
        .reduce(
          (previousValue, currentNumberString) => [...previousValue, parseInt(currentNumberString)],
          [] as number[]
        )
    )
);

const totalPoints = gamesByLine
  .map(([game1Nums, game2Nums]) => game1Nums.filter((num) => game2Nums.includes(num)))
  .reduce(
    (previousValue, matchedGameNums) =>
      previousValue + (matchedGameNums.length - 1 >= 0 ? Math.pow(2, matchedGameNums.length - 1) : 0),
    0
  );

console.log(totalPoints);
