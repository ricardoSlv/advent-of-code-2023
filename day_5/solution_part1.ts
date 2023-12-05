import fs from "node:fs";

type mapperLine = {
  destinationStart: number;
  sourceStart: number;
  rangeLength: number;
};

const [
  seedstextBlock,
  seedTosoilTextBlock,
  soilTofertilizerTextBlock,
  fertilizerTowaterTextBlock,
  waterTolightTextBlock,
  lightTotemperatureTextBlock,
  temperatureTohumidityTextBlock,
  humidityTolocationTextBlock,
] = fs.readFileSync("./day_5/input.txt", { encoding: "utf8" }).split("\n\n");

const seeds = seedstextBlock
  .split("seeds: ")[1]
  .split(" ")
  .map((x) => parseInt(x));

const almanacGuides: Record<string, mapperLine[]> = {
  seedTosoil: getMapperFromTextBlock("seed-to-soil", seedTosoilTextBlock),
  soilTofertilizer: getMapperFromTextBlock("soil-to-fertilizer", soilTofertilizerTextBlock),
  fertilizerTowater: getMapperFromTextBlock("fertilizer-to-water", fertilizerTowaterTextBlock),
  waterTolight: getMapperFromTextBlock("water-to-light", waterTolightTextBlock),
  lightTotemperature: getMapperFromTextBlock("light-to-temperature", lightTotemperatureTextBlock),
  temperatureTohumidity: getMapperFromTextBlock("temperature-to-humidity", temperatureTohumidityTextBlock),
  humidityTolocation: getMapperFromTextBlock("humidity-to-location", humidityTolocationTextBlock),
};

function getMapperFromTextBlock(mapperTextName: string, textBlock: string) {
  return textBlock
    .split(`${mapperTextName} map:\n`)[1]
    .split("\n")
    .map((line: string) => {
      const [destinationStart, sourceStart, rangeLength] = line.split(" ").map((x) => parseInt(x));
      return {
        destinationStart,
        sourceStart,
        rangeLength,
      };
    });
}

function getValueFromGuide(sourceNumber: number, mapperLines: mapperLine[]) {
  for (let { destinationStart, sourceStart, rangeLength } of mapperLines) {
    if (sourceStart < sourceNumber && sourceStart + rangeLength >= sourceNumber) {
      return destinationStart + (sourceNumber - sourceStart);
    }
  }

  return sourceNumber;
}

function getSeedLocation(seedNumber: number) {
  const soil = getValueFromGuide(seedNumber, almanacGuides.seedTosoil);
  const fertilizer = getValueFromGuide(soil, almanacGuides.soilTofertilizer);
  const water = getValueFromGuide(fertilizer, almanacGuides.fertilizerTowater);
  const light = getValueFromGuide(water, almanacGuides.waterTolight);
  const temperature = getValueFromGuide(light, almanacGuides.lightTotemperature);
  const humidity = getValueFromGuide(temperature, almanacGuides.temperatureTohumidity);
  const location = getValueFromGuide(humidity, almanacGuides.humidityTolocation);

  return location;
}

console.log(Math.min(...seeds.map((seed) => getSeedLocation(seed))));
