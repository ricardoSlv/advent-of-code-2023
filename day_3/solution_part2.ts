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

function findGearPeers(line: number, column: number, grid: string[][]) {
  return peers.reduce((previousValue, [peerline, peercolumn]) => {
    const peerValue = grid[line + peerline]?.[column + peercolumn];
    if (peerValue !== undefined && peerValue === "*") {
      return [...previousValue, `${line + peerline},${column + peercolumn}`];
    } else {
      return previousValue;
    }
  }, [] as string[]);
}

const lines = fs.readFileSync("./day_3/input.txt", { encoding: "utf8" }).split("\n");

const grid = lines.map((l) => l.split(""));

const numberMatches = [...lines.map((l) => [...l.matchAll(/\d+/g)])];

const numbersWithPeers = numberMatches
  .map((lineMatches, index) => {
    return lineMatches.map((matchArray) => {
      const valueMatched = matchArray?.at(0);
      const indexMatched = matchArray?.index || 0;

      const gearPeers = valueMatched
        ?.split("")
        .map((_, indexInMatch) => findGearPeers(index, indexMatched + indexInMatch, grid));

      return { num: parseInt(valueMatched || ""), gearPeers };
    });
  })
  .flat();

const numberPeersPerGear = new Map();

numbersWithPeers.forEach(({ num, gearPeers }) => {
  gearPeers?.forEach(([gearCode]) => {
    if (gearCode === undefined) {
      return;
    }
    const gearCodePeers = numberPeersPerGear.get(gearCode);
    if (gearCodePeers) {
      gearCodePeers.add(num);
    } else {
      numberPeersPerGear.set(gearCode, new Set([num]));
    }
  });
});

const gearRatio = [...numberPeersPerGear.entries()].reduce((previousValue, [_, peers]) => {
  if (peers.size == 2) {
    const [peer1, peer2] = peers.values();
    return previousValue + peer1 * peer2;
  }
  return previousValue;
}, 0);

console.log(gearRatio);
