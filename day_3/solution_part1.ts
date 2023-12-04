import fs from "node:fs";

const peers = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [1, -1],
  [-1, -1],
  [1, 1],
];

function hasSymbolInPeers(line: number, column: number, grid: string[][]) {
  return peers.some(([peerline, peercolumn]) => {
    const peerValue = grid[line + peerline]?.[column + peercolumn];
    return peerValue !== undefined && !peerValue.match(/(\d)|(\.)/);
  });
}

const lines = fs.readFileSync("./day_3/input.txt", { encoding: "utf8" }).split("\n");

const grid = lines.map((l) => l.split(""));

const numberMatches = [...lines.map((l) => [...l.matchAll(/\d+/g)])];

const validNumbers = numberMatches
  .map((lineMatches, index) => {
    return lineMatches.filter((matchArray) => {
      const valueMatched = matchArray?.at(0);
      const indexMatched = matchArray?.index || 0;

      return valueMatched
        ?.split("")
        .some((_, indexInMatch) => hasSymbolInPeers(index, indexMatched + indexInMatch, grid));
    });
  })
  .flat();

const numbersSum = validNumbers.reduce(
  (previousValue, currentmatchArray) => previousValue + parseInt(currentmatchArray?.at(0) || "0"),
  0
);

console.log(numbersSum);
