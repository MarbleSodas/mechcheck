import Quiz from "@/components/quiz";
import { QuizQuestion } from "@/types";

// src/app/quizzes/aloalo-math/page.tsx
const quizData = [
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-1.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 0,
    answerButtonPositions: [{ x: "39%", y: "32%" }, { x: "42%", y: "53%" }, { x: "42%", y: "61%" }, { x: "72%", y: "76%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-2.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 0,
    answerButtonPositions: [{ x: "39%", y: "32%" }, { x: "42%", y: "53%" }, { x: "42%", y: "61%" }, { x: "72%", y: "76%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-3.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 1,
    answerButtonPositions: [{ x: "39%", y: "32%" }, { x: "42%", y: "53%" }, { x: "42%", y: "61%" }, { x: "72%", y: "76%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-4.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 0,
    answerButtonPositions: [{ x: "39%", y: "32%" }, { x: "42%", y: "53%" }, { x: "42%", y: "61%" }, { x: "72%", y: "76%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-5.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 0,
    answerButtonPositions: [{ x: "39%", y: "32%" }, { x: "42%", y: "53%" }, { x: "42%", y: "61%" }, { x: "72%", y: "76%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-6.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 1,
    answerButtonPositions: [{ x: "39%", y: "32%" }, { x: "42%", y: "53%" }, { x: "42%", y: "61%" }, { x: "72%", y: "76%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-7.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 2,
    answerButtonPositions: [{ x: "39%", y: "32%" }, { x: "42%", y: "53%" }, { x: "42%", y: "61%" }, { x: "72%", y: "76%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-8.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 2,
    answerButtonPositions: [{ x: "39%", y: "32%" }, { x: "42%", y: "53%" }, { x: "42%", y: "61%" }, { x: "72%", y: "76%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-9.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 2,
    answerButtonPositions: [{ x: "39%", y: "32%" }, { x: "42%", y: "53%" }, { x: "42%", y: "61%" }, { x: "72%", y: "76%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-10.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 2,
    answerButtonPositions: [{ x: "39%", y: "32%" }, { x: "42%", y: "53%" }, { x: "42%", y: "61%" }, { x: "72%", y: "76%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-11.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 2,
    answerButtonPositions: [{ x: "39%", y: "32%" }, { x: "42%", y: "53%" }, { x: "42%", y: "61%" }, { x: "72%", y: "76%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-12.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 3,
    answerButtonPositions: [{ x: "39%", y: "32%" }, { x: "42%", y: "53%" }, { x: "42%", y: "61%" }, { x: "72%", y: "76%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-13.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 3,
    answerButtonPositions: [{ x: "39%", y: "32%" }, { x: "42%", y: "53%" }, { x: "42%", y: "61%" }, { x: "72%", y: "76%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-14.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 3,
    answerButtonPositions: [{ x: "39%", y: "32%" }, { x: "42%", y: "53%" }, { x: "42%", y: "61%" }, { x: "72%", y: "76%" }]
  }
] as QuizQuestion[];

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function AloaloMathQuiz() {
  const shuffledQuizData = shuffleArray(quizData);
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 sm:p-8">
      <Quiz questions={shuffledQuizData} />
    </div>
  );
}
