import fetch from 'node-fetch';
import fs from 'fs';
import * as tg from 'generic-type-guard';

const SECTORS_FILE_PATH = './src/lib/los-remes.json';

type RawRoute = {
  id: string;
  name: string;
  grade: string;
  numberOfDraws: number;
  height: number;
};

type RawSector = {
  id: string;
  name: string;
  gradeRange: string;
  routes: RawRoute[];
};

const isRawSector: tg.TypeGuard<RawSector> = (obj: unknown): obj is RawSector => {
  return tg.isObject(obj) && 
    tg.hasProperty('id', tg.isString)(obj) && 
    tg.hasProperty('name', tg.isString)(obj) && 
    tg.hasProperty('gradeRange', tg.isString)(obj) && 
    tg.hasProperty('routes', tg.isArray(tg.isAny))(obj);
};

const isRawRoute: tg.TypeGuard<RawRoute> = (obj: unknown): obj is RawRoute => {
  return tg.isObject(obj) && 
    tg.hasProperty('id', tg.isString)(obj) && 
    tg.hasProperty('name', tg.isString)(obj) && 
    tg.hasProperty('grade', tg.isString)(obj) && 
    tg.hasProperty('numberOfDraws', tg.isNumber)(obj) && 
    tg.hasProperty('height', tg.isNumber)(obj);
};

function parseGrade(rawGrade: string): ClimbingGrade {
  const withoutNoise = rawGrade.replace(/5\./g, '');
  const number = Number.parseInt(withoutNoise) ?? 0;
  const letter = withoutNoise.replace(/\d+/, '');

  return {
    raw: rawGrade,
    number: Number.isNaN(number) ? 0 : number,
    letter,
  };
}

function parseGrandeRange(rawGradeRange: string): LosRemesSector['gradeRange'] {
  const [rawMin, rawMax] = rawGradeRange.split(' a ');
  const min = parseGrade(rawMin);
  const max = parseGrade(rawMax);
  return { min, max, raw: rawGradeRange };
}

function findImageSrcInRawSectors(rawSectors: string, routeId: string): string | undefined {
  const imageSrcRegex = new RegExp(`img\\/${routeId}\\..{8}\\.jpg`, 'g');
  const imageSrcRegexExec = imageSrcRegex.exec(rawSectors);
  const imageSrcMatch = imageSrcRegexExec?.[0];
  return imageSrcMatch;
}

async function parseLosRemesSectors(rawSectors: string): Promise<LosRemesSector[]> {
  const sectorsRegex = /JSON\.parse\('(.+)'\)/g;
  const sectorsRegexExec = sectorsRegex.exec(rawSectors);
  const sectorsMatch = sectorsRegexExec?.[1] ?? '[]';

  const rawSectorsCleared = sectorsMatch.replace(/\\'/g, "'");
  const sectors = JSON.parse(rawSectorsCleared ?? '[]');

  const losRemesSectors = sectors.map((sector: unknown): LosRemesSector => {
    if (!isRawSector(sector)) {
      throw new Error(`Invalid sector: ${sector}`);
    }
    return {
      id: sector.id,
      name: sector.name,
      gradeRange: parseGrandeRange(sector.gradeRange),
      routes: sector.routes.map((route: unknown): LosRemesRoute => {
        if (!isRawRoute(route)) {
          throw new Error(`Invalid route: ${route}`);
        }
        return {
          id: route.id,
          name: route.name,
          grade: parseGrade(route.grade),
          numberOfQuickDraws: route.numberOfDraws,
          height: route.height,
          imageSrc: findImageSrcInRawSectors(rawSectors, route.id),
        };
      }),
    };
  });

  return losRemesSectors;
}

async function fetchLosRemesSectors(): Promise<string> {
  const response = await fetch('https://www.losremes.com/js/app.ecaf6955.js');
  const responseText = await response.text();
  return responseText;  
}

async function scrapeLosRemes() {
  try {

    console.log("Fetchig los remes sectors...");
    const rawSectors = await fetchLosRemesSectors();
    const sectors = await parseLosRemesSectors(rawSectors);
    const sectorsJson = JSON.stringify({ sectors }, null, 2);
    console.log("Writing los remes sectors to file...");
    await fs.promises.writeFile(SECTORS_FILE_PATH, sectorsJson, 'utf8');
    console.log("Done!");
  } catch (error) {
    console.error(error);
  }
}

scrapeLosRemes();
