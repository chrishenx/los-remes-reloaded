import { ClimbingGrade, ClimbingGradeRange, LosRemesRoute, LosRemesSector, RoutesSearchParams } from "@/types/los-remes-sectors";
import { ParsedUrlQuery } from "querystring";
import sectors from "./los-remes.json";

// TODO 3: Make this a class for the Grades and GradeRanges to be able to compare them

export const UNKNOWN_GRADE: ClimbingGrade = {
  raw: "5.??",
  number: 0,
  letter: "??",
};

const LETTER_TO_DECIMAL_MAP = new Map<string, number>([
  ["a", 0.2],
  ["b", 0.4],
  ["c", 0.6],
  ["d", 0.8],
]);

export function parseGrade(rawGrade: string): ClimbingGrade {
  // TODO Validate rawGrade, format should be something like "5.10a", "5.13d", "5.11-" or "5.12+"
  /* const validGradeRegex = /^5\.\d{1,2}([a-d-+]\/+)$/;
  if (!validGradeRegex.test(rawGrade)) {
    return UNKNOWN_GRADE;
  } */

  const withoutNoise = rawGrade.replace(/5\./g, "");
  const number = Number.parseInt(withoutNoise) ?? 0;
  const letter = withoutNoise.replace(/\d+/, "");

  return {
    raw: rawGrade,
    number: Number.isNaN(number) ? 0 : number,
    letter,
  };
}

export function parseGradeRange(rawGradeRange: string): ClimbingGradeRange {
  const [rawMin, rawMax] = rawGradeRange.split(" a ");
  const min = parseGrade(rawMin);
  const max = parseGrade(rawMax);
  return { min, max, raw: rawGradeRange };
}

/**
 * 
 * @param grade Possible formats "5.9", "5.10a", "5.13d", "5.11-", "5.12+", "5.10a/b".
 * @param gradeRange The bounds' grade letter is either in -/+ or a/b/c/d format.
 * @returns 
 */
export function isGradeWithinRange(grade: ClimbingGrade, gradeRange: ClimbingGradeRange): boolean {
  // If the grade is unknown, it's always within the range
  if (grade.number === UNKNOWN_GRADE.number) {
    return true;
  }

  const { min, max } = gradeRange;

  const isNumberWithinRange = grade.number >= min.number && grade.number <= max.number;

  // For grades like "5.10", the letter is empty, so only the number is checked
  if (isNumberWithinRange && grade.letter === "") {
    return true;
  }

  const normalizedMinGradeLetter = min.letter.replace("-", "a").replace("+", "c");
  const normalizedMaxGradeLetter = max.letter.replace("-", "b").replace("+", "d");

  const minNumericalValue = min.number + (LETTER_TO_DECIMAL_MAP.get(normalizedMinGradeLetter) ?? 0);
  const maxNumericalValue = max.number + (LETTER_TO_DECIMAL_MAP.get(normalizedMaxGradeLetter) ?? 0);

  const isLetterWithinRange = (letter: string) => {
    const decimalValue = LETTER_TO_DECIMAL_MAP.get(letter) ?? 0;
    const gradeNumericalValue = grade.number + decimalValue;
    return gradeNumericalValue >= minNumericalValue && gradeNumericalValue <= maxNumericalValue;
  };

  const normalizedGradeLetter = grade.letter
    .replace("-", "a/b")
    .replace("+", "c/d");
  const gradeLetters = normalizedGradeLetter.split("/");
  const areSomeGradeLettersWithinRange = gradeLetters.some(isLetterWithinRange);

  return isNumberWithinRange && areSomeGradeLettersWithinRange;
}

export const parseRoutesSearchParams = (searchParamsQuery: ParsedUrlQuery): RoutesSearchParams => {
  // TODO Validate types or query params
  const sectorIdsArray = typeof searchParamsQuery.sector_ids === "string" ? [searchParamsQuery.sector_ids] : searchParamsQuery.sector_ids as string[];
  const sectorIds = new Set(sectorIdsArray ?? []);
  const filteredSectors = sectorIds.size > 0 ? sectors
    .filter((sector) => sectorIds.has(sector.id)) : sectors; // If no sector_ids are provided, return all sectors

  const rawMinGrade = searchParamsQuery.min_grade;
  const rawMaxGrade = searchParamsQuery.max_grade;

  const minGrade = parseGrade(rawMinGrade as string ?? "");
  const maxGrade = parseGrade(rawMaxGrade as string ?? "");

  // TODO 1: Make sure minGrade is lower than maxGrade
  // TODO 2: Make sure minGrade and maxGrade are valid grades using [minGrade|maxGrade].number is not 0 (unknown grade)

  return {
    sectors: filteredSectors,
    gradeRange: rawMinGrade && rawMaxGrade ? {
      raw: `${rawMinGrade} a ${rawMaxGrade}`,
      min: minGrade,
      max: maxGrade
    } : undefined,
  };
};

export type FindSectorRoutesArg = {
  sector: LosRemesSector;
  gradeRange?: ClimbingGradeRange;
}

export function findSectorRoutes({ sector, gradeRange }: FindSectorRoutesArg): LosRemesRoute[] {
  const filteredRoutes = gradeRange ? sector.routes.filter(route => isGradeWithinRange(route.grade, gradeRange)) : sector.routes;
  return filteredRoutes;
}

export function getRandomArrayElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function getSectorImages() {
  const sectorImages = sectors.reduce((sectorIdToString, sector) => (
    {...sectorIdToString, [sector.id]: getRandomArrayElement(sector.routes).imageSrc  ?? ""}
  ), {} as Record<string, string>);

  return sectorImages;
}

export function getAllSectors() {
  return sectors;
}