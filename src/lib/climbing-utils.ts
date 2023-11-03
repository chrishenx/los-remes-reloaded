import { ClimbingGrade, ClimbingGradeRange } from "@/types/los-remes-sectors";

export const UNKNOWN_GRADE: ClimbingGrade = {
  raw: '5.??',
  number: 0,
  letter: '??',
};

// TODO Add unit tests, it's not working properly
export function parseGrade(rawGrade: string): ClimbingGrade {
  // TODO Validate rawGrade, format should be something like "5.10a", "5.13d", "5.11-" or "5.12+"
  /* const validGradeRegex = /^5\.\d{1,2}([a-d-+]\/+)$/;
  if (!validGradeRegex.test(rawGrade)) {
    return UNKNOWN_GRADE;
  } */

  const withoutNoise = rawGrade.replace(/5\./g, '');
  const number = Number.parseInt(withoutNoise) ?? 0;
  const letter = withoutNoise.replace(/\d+/, '');

  return {
    raw: rawGrade,
    number: Number.isNaN(number) ? 0 : number,
    letter,
  };
}

export function parseGrandeRange(rawGradeRange: string): ClimbingGradeRange {
  const [rawMin, rawMax] = rawGradeRange.split(' a ');
  const min = parseGrade(rawMin);
  const max = parseGrade(rawMax);
  return { min, max, raw: rawGradeRange };
}

export function normalizeGradeLetter(gradeLetter: string): string {
  switch (gradeLetter) {
  case "-":
    return "a";
  case "+":
    return "d";
  default:
    return gradeLetter;
  }
}

export function isGradeWithinRange(grade: ClimbingGrade, gradeRange: ClimbingGradeRange): boolean {
  // If the grade is unknown, it's always within the range
  if (grade.number === UNKNOWN_GRADE.number) {
    return true;
  }

  const { min, max } = gradeRange;
  const normalizedMinLetter = normalizeGradeLetter(min.letter);
  const normalizedMaxLetter = normalizeGradeLetter(max.letter);

  // letter should be "+", "-", "a", "b", "c", "d" or empty string
  const isLetterWithinRange = (letter: string): boolean => {
    // If the letter is empty, it's always within the range
    if (letter === "") {
      return true;
    }
    const normalizedLetter = normalizeGradeLetter(letter);
    return normalizedLetter >= normalizedMinLetter && normalizedLetter <= normalizedMaxLetter;
  };


  const isNumberWithinRange = grade.number >= min.number && grade.number <= max.number;

  const gradeLetters = grade.letter.split("/");
  const areSomeGradeLettersWithinRange = gradeLetters.some(isLetterWithinRange);

  return isNumberWithinRange && areSomeGradeLettersWithinRange;
}