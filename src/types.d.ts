export interface QuizQuestion {
    question: string;
    image: string;
    options: string[];
    correctAnswerIndex: number;
    answerButtonPositions: { x: string; y: string }[];
  }