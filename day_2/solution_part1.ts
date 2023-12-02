import fs from "node:fs";

const colorsAvailable = {
  red: 12,
  green: 13,
  blue: 14,
};

type Subset = {
  red: number;
  green: number;
  blue: number;
};

type Game = {
  id: number;
  subsSets: Subset[];
};

const lines = fs.readFileSync("./day_2/input.txt", { encoding: "utf8" }).split("\n");

const games: Game[] = lines.map((line) => {
  const [gameX, subsSetsString] = line.split(": ");
  const gameId = parseInt(gameX.split(" ")[1]);
  const subsSets = subsSetsString.split("; ").map((subsSetString) => {
    const subSet: Subset = { blue: 0, red: 0, green: 0 };
    const colorStrings = subsSetString.split(", ");
    colorStrings.map((colorString) => {
      const [quantity, color] = colorString.split(" ");
      //@ts-ignore
      subSet[color] = parseInt(quantity);
    });

    return subSet;
  });

  return { id: gameId, subsSets };
});

const validGameIdsSumm = games.reduce((previousValue, currentGame) => {
  const gameIsValid = currentGame.subsSets.every(
    (subset) =>
      subset.red <= colorsAvailable.red && subset.green <= colorsAvailable.green && subset.blue <= colorsAvailable.blue
  );
  return previousValue + (gameIsValid ? currentGame.id : 0);
}, 0);

// console.log(JSON.stringify(games, null, 2));

console.log(validGameIdsSumm);
