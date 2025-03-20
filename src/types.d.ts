export interface QuizQuestion {
    question: string;
    image: string;
    options: string[];
    correctAnswerIndex: number;
    answerButtonPositions: { x: string; y: string }[];
  }

  export interface DirectionalQuizQuestion {
    question: string;
    status: string[];
    image: string;
    options: string[];
    direction: string;
    correctAnswerIndex: number;
    answerButtonPositions: { x: string; y: string }[];
  }