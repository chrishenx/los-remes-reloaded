export type ClimbingGrade = {
  raw: string;
  number: number;
  letter: string;
};

export type LosRemesRoute = {
  id: string;
  name: string;
  grade: ClimbingGrade;
  numberOfQuickDraws: number;
  height: number;
  imageSrc?: string;
};

export type ClimbingGradeRange = {
  raw: string;
  min: ClimbingGrade;
  max: ClimbingGrade;
};

export type LosRemesSector = {
  id: string;
  name: string;
  gradeRange: ClimbingGradeRange,
  routes: LosRemesRoute[];
};