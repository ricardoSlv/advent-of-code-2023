import fs from "node:fs";

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
      subSet[color] = parseInt(quantity);
    });

    return subSet;
  });

  return { id: gameId, subsSets };
});

const minimumBallsPerGame = games.map((currentGame) => {
  const ballsNeededThisGame = currentGame.subsSets.reduce(
    (currentBallsNeeded, currentSubset) => {
      return {
        red: currentBallsNeeded.red > currentSubset.red ? currentBallsNeeded.red : currentSubset.red,
        green: currentBallsNeeded.green > currentSubset.green ? currentBallsNeeded.green : currentSubset.green,
        blue: currentBallsNeeded.blue > currentSubset.blue ? currentBallsNeeded.blue : currentSubset.blue,
      };
    },
    {
      red: 0,
      green: 0,
      blue: 0,
    }
  );
  return ballsNeededThisGame;
});

const gamesPowerSumm = minimumBallsPerGame.reduce((previousValue, currentBallsNeeded) => {
  return previousValue + currentBallsNeeded.red * currentBallsNeeded.green * currentBallsNeeded.blue;
}, 0);

console.log(gamesPowerSumm);
