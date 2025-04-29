import Quiz from "@/components/quiz";
import { QuizQuestion } from "@/types";
import { shuffleArray } from "@/lib/utils";

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

// Using the shuffleArray function from utils.ts

export default function AloaloMathQuiz() {
  const shuffledQuizData = shuffleArray(quizData);
  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-0 overflow-hidden">
      <div className="w-full h-full">
        <Quiz questions={shuffledQuizData} />
      </div>
    </div>
  );
}
