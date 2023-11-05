import { isGradeWithinRange, parseGrade, parseGradeRange } from "./climbing-utils";

describe("isGradeWithinRange", () => {
  it("returns true if grade is unknown", () => {
    const grade = parseGrade("5.0");
    const gradeRange = parseGradeRange("5.9+ a 5.14a");
    expect(isGradeWithinRange(grade, gradeRange)).toBe(true);
  });

  it("returns true if grade number is within range", () => {
    const grade = parseGrade("5.11c");
    const gradeRange = parseGradeRange("5.10a a 5.11c");
    expect(isGradeWithinRange(grade, gradeRange)).toBe(true);
  });

  it("returns false if grade is outside range", () => {
    const grade = parseGrade("5.12a");
    const gradeRange = parseGradeRange("5.10- a 5.11c");
    expect(isGradeWithinRange(grade, gradeRange)).toBe(false);
  });

  it("returns true if grade letter is within range", () => {
    const grade = parseGrade("5.10d");
    const gradeRange = parseGradeRange("5.10a a 5.11c");
    expect(isGradeWithinRange(grade, gradeRange)).toBe(true);
  });

  it("returns false if grade letter is outside range", () => {
    const grade = parseGrade("5.11d");
    const gradeRange = parseGradeRange("5.10d a 5.11c");
    expect(isGradeWithinRange(grade, gradeRange)).toBe(false);
  });

  it("returns true if grade number is within range using -/+ letters", () => {
    const grade = parseGrade("5.10+");
    const gradeRange = parseGradeRange("5.10+ a 5.12-");
    expect(isGradeWithinRange(grade, gradeRange)).toBe(true);
  });

  it("returns false if grade number is outside range using -/+ letters", () => {
    const grade = parseGrade("5.13a");
    const gradeRange = parseGradeRange("5.10+ a 5.12-");
    expect(isGradeWithinRange(grade, gradeRange)).toBe(false);
  });
});