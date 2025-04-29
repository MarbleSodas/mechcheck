import Quiz from "@/components/quiz";
import { QuizQuestion } from "@/types";

// src/app/quizzes/aloalo-math/page.tsx
const quizData = [
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-1.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 0,
    answerButtonPositions: [{ x: "41%", y: "35%" }, { x: "44%", y: "55%" }, { x: "44%", y: "64%" }, { x: "74%", y: "81%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-2.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 0,
    answerButtonPositions: [{ x: "41%", y: "35%" }, { x: "44%", y: "55%" }, { x: "44%", y: "64%" }, { x: "74%", y: "81%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-3.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 1,
    answerButtonPositions: [{ x: "41%", y: "35%" }, { x: "44%", y: "55%" }, { x: "44%", y: "64%" }, { x: "74%", y: "81%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-4.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 0,
    answerButtonPositions: [{ x: "41%", y: "35%" }, { x: "44%", y: "55%" }, { x: "44%", y: "64%" }, { x: "74%", y: "81%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-5.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 0,
    answerButtonPositions: [{ x: "41%", y: "35%" }, { x: "44%", y: "55%" }, { x: "44%", y: "64%" }, { x: "74%", y: "81%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-6.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 1,
    answerButtonPositions: [{ x: "41%", y: "35%" }, { x: "44%", y: "55%" }, { x: "44%", y: "64%" }, { x: "74%", y: "81%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-7.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 2,
    answerButtonPositions: [{ x: "41%", y: "35%" }, { x: "44%", y: "55%" }, { x: "44%", y: "64%" }, { x: "74%", y: "81%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-8.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 2,
    answerButtonPositions: [{ x: "41%", y: "35%" }, { x: "44%", y: "55%" }, { x: "44%", y: "64%" }, { x: "74%", y: "81%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-9.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 2,
    answerButtonPositions: [{ x: "41%", y: "35%" }, { x: "44%", y: "55%" }, { x: "44%", y: "64%" }, { x: "74%", y: "81%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-10.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 2,
    answerButtonPositions: [{ x: "41%", y: "35%" }, { x: "44%", y: "55%" }, { x: "44%", y: "64%" }, { x: "74%", y: "81%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-11.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 2,
    answerButtonPositions: [{ x: "41%", y: "35%" }, { x: "44%", y: "55%" }, { x: "44%", y: "64%" }, { x: "74%", y: "81%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-12.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 3,
    answerButtonPositions: [{ x: "41%", y: "35%" }, { x: "44%", y: "55%" }, { x: "44%", y: "64%" }, { x: "74%", y: "81%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-13.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 3,
    answerButtonPositions: [{ x: "41%", y: "35%" }, { x: "44%", y: "55%" }, { x: "44%", y: "64%" }, { x: "74%", y: "81%" }]
  },
  {
    question: "You are the Dark Knight where should you go? (if multiple answers, pick top one)",
    image: "/images/lala-positioning/grid-14.png",
    options: ["?", "?", "?", "?"],
    correctAnswerIndex: 3,
    answerButtonPositions: [{ x: "41%", y: "35%" }, { x: "44%", y: "55%" }, { x: "44%", y: "64%" }, { x: "74%", y: "81%" }]
  }
] as QuizQuestion[];

// Use a seeded random function to avoid hydration errors
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function shuffleArray<T>(array: T[]): T[] {
  // Use a fixed seed for server and client consistency
  const seed = 42;
  const newArray = [...array];

  // Fisher-Yates shuffle with seeded random
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

export default function AloaloMathQuiz() {
  const shuffledQuizData = shuffleArray(quizData);
  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full h-full">
        <Quiz questions={shuffledQuizData} />
      </div>
    </div>
  );
}
