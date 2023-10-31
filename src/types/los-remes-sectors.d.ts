type ClimbingGrade = {
  raw: string;
  number: number;
  letter: string;
};

type LosRemesRoute = {
  id: string;
  name: string;
  grade: ClimbingGrade;
  numberOfQuickDraws: number;
  height: number;
  imageSrc?: string;
};

type LosRemesSector = {
  id: string;
  name: string;
  gradeRange: {
    raw: string;
    min: ClimbingGrade;
    max: ClimbingGrade;
  },
  routes: LosRemesRoute[];
};