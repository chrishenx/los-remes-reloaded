import sectors from "@/lib/los-remes.json";

function getRandomArrayElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function getSectorImages() {
  const sectorImages = sectors.reduce((sectorIdToString, sector) => (
    {...sectorIdToString, [sector.id]: getRandomArrayElement(sector.routes).imageSrc  ?? ""}
  ), {} as Record<string, string>);

  return sectorImages;
}