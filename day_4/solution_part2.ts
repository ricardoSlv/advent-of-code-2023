import fs from "node:fs";

const lines = fs.readFileSync("./day_4/input.txt", { encoding: "utf8" }).split("\n");

function getRange(length: number) {
  return Array.from({ length: length }, (_value, index) => index + 1);
}

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

const gamesMatches = gamesByLine.map(
  ([game1Nums, game2Nums]) => game1Nums.filter((num) => game2Nums.includes(num)).length
);

const gameData = gamesMatches.map((gameMatches, index) => ({ id: index, quantity: 1, matches: gameMatches }));

gameData.forEach(({ quantity, matches }, index) => {
  getRange(matches).forEach((rIndx) => (gameData[index + rIndx].quantity += quantity));
});

const totalCards = gameData.reduce((p, c) => p + c.quantity, 0);

console.log(totalCards);
