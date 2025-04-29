import DirectionQuiz from "@/components/directional-quiz";
import { DirectionalQuizQuestion } from "@/types";
import { shuffleArray } from "@/lib/utils";

// src/app/quizzes/aloalo-math/page.tsx
const quizData = [
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/3.png", "/images/self-direction/up.png"],
    image: "/images/self-direction/up_position.png",
    direction: "/images/self-direction/left_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 3,
    answerButtonPositions: [{ x: "50%", y: "5%" }, { x: "95%", y: "50%" }, { x: "50%", y: "95%" }, { x: "5%", y: "50%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/3.png", "/images/self-direction/up.png"],
    image: "/images/self-direction/up_position.png",
    direction: "/images/self-direction/right_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 1,
    answerButtonPositions: [{ x: "50%", y: "5%" }, { x: "95%", y: "50%" }, { x: "50%", y: "95%" }, { x: "5%", y: "50%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/5.png", "/images/self-direction/up.png"],
    image: "/images/self-direction/up_position.png",
    direction: "/images/self-direction/left_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 1,
    answerButtonPositions: [{ x: "50%", y: "5%" }, { x: "95%", y: "50%" }, { x: "50%", y: "95%" }, { x: "5%", y: "50%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/5.png", "/images/self-direction/up.png"],
    image: "/images/self-direction/up_position.png",
    direction: "/images/self-direction/right_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 3,
    answerButtonPositions: [{ x: "50%", y: "5%" }, { x: "95%", y: "50%" }, { x: "50%", y: "95%" }, { x: "5%", y: "50%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/3.png", "/images/self-direction/left.png"],
    image: "/images/self-direction/left_position.png",
    direction: "/images/self-direction/left_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 0,
    answerButtonPositions: [{ x: "50%", y: "5%" }, { x: "95%", y: "50%" }, { x: "50%", y: "95%" }, { x: "5%", y: "50%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/3.png", "/images/self-direction/left.png"],
    image: "/images/self-direction/left_position.png",
    direction: "/images/self-direction/right_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 2,
    answerButtonPositions: [{ x: "50%", y: "5%" }, { x: "95%", y: "50%" }, { x: "50%", y: "95%" }, { x: "5%", y: "50%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/5.png", "/images/self-direction/left.png"],
    image: "/images/self-direction/left_position.png",
    direction: "/images/self-direction/left_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 2,
    answerButtonPositions: [{ x: "50%", y: "5%" }, { x: "95%", y: "50%" }, { x: "50%", y: "95%" }, { x: "5%", y: "50%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/5.png", "/images/self-direction/left.png"],
    image: "/images/self-direction/left_position.png",
    direction: "/images/self-direction/right_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 0,
    answerButtonPositions: [{ x: "50%", y: "5%" }, { x: "95%", y: "50%" }, { x: "50%", y: "95%" }, { x: "5%", y: "50%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/3.png", "/images/self-direction/right.png"],
    image: "/images/self-direction/right_position.png",
    direction: "/images/self-direction/left_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 2,
    answerButtonPositions: [{ x: "50%", y: "5%" }, { x: "95%", y: "50%" }, { x: "50%", y: "95%" }, { x: "5%", y: "50%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/3.png", "/images/self-direction/right.png"],
    image: "/images/self-direction/right_position.png",
    direction: "/images/self-direction/right_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 0,
    answerButtonPositions: [{ x: "50%", y: "5%" }, { x: "95%", y: "50%" }, { x: "50%", y: "95%" }, { x: "5%", y: "50%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/5.png", "/images/self-direction/right.png"],
    image: "/images/self-direction/right_position.png",
    direction: "/images/self-direction/left_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 0,
    answerButtonPositions: [{ x: "50%", y: "5%" }, { x: "95%", y: "50%" }, { x: "50%", y: "95%" }, { x: "5%", y: "50%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/5.png", "/images/self-direction/right.png"],
    image: "/images/self-direction/right_position.png",
    direction: "/images/self-direction/right_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 2,
    answerButtonPositions: [{ x: "50%", y: "5%" }, { x: "95%", y: "50%" }, { x: "50%", y: "95%" }, { x: "5%", y: "50%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/3.png", "/images/self-direction/down.png"],
    image: "/images/self-direction/down_position.png",
    direction: "/images/self-direction/left_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 1,
    answerButtonPositions: [{ x: "50%", y: "5%" }, { x: "95%", y: "50%" }, { x: "50%", y: "95%" }, { x: "5%", y: "50%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/3.png", "/images/self-direction/down.png"],
    image: "/images/self-direction/down_position.png",
    direction: "/images/self-direction/right_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 3,
    answerButtonPositions: [{ x: "50%", y: "5%" }, { x: "95%", y: "50%" }, { x: "50%", y: "95%" }, { x: "5%", y: "50%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/5.png", "/images/self-direction/down.png"],
    image: "/images/self-direction/down_position.png",
    direction: "/images/self-direction/left_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 3,
    answerButtonPositions: [{ x: "50%", y: "5%" }, { x: "95%", y: "50%" }, { x: "50%", y: "95%" }, { x: "5%", y: "50%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/5.png", "/images/self-direction/down.png"],
    image: "/images/self-direction/down_position.png",
    direction: "/images/self-direction/right_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 1,
    answerButtonPositions: [{ x: "50%", y: "5%" }, { x: "95%", y: "50%" }, { x: "50%", y: "95%" }, { x: "5%", y: "50%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/3.png", "/images/self-direction/forward_march.png"],
    image: "/images/self-direction/role_melee.png",
    direction: "/images/self-direction/left_arrow.png",
    options: ["Right", "Left"],
    correctAnswerIndex: 1,
    answerButtonPositions: [{ x: "95%", y: "50%" }, { x: "5%", y: "50%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/5.png", "/images/self-direction/forward_march.png"],
    image: "/images/self-direction/role_melee.png",
    direction: "/images/self-direction/left_arrow.png",
    options: ["Right", "Left"],
    correctAnswerIndex: 0,
    answerButtonPositions: [{ x: "95%", y: "50%" }, { x: "5%", y: "50%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/3.png", "/images/self-direction/forward_march.png"],
    image: "/images/self-direction/role_melee.png",
    direction: "/images/self-direction/right_arrow.png",
    options: ["Right", "Left"],
    correctAnswerIndex: 0,
    answerButtonPositions: [{ x: "95%", y: "50%" }, { x: "5%", y: "50%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/5.png", "/images/self-direction/forward_march.png"],
    image: "/images/self-direction/role_melee.png",
    direction: "/images/self-direction/right_arrow.png",
    options: ["Right", "Left"],
    correctAnswerIndex: 1,
    answerButtonPositions: [{ x: "95%", y: "50%" }, { x: "5%", y: "50%" }]
  },
] as DirectionalQuizQuestion[];

// Using the shuffleArray function from utils.ts
// We'll still limit to 5 questions for this quiz

export default function SelfDirectionQuiz() {
  // Shuffle the quiz data and limit to 5 questions
  const shuffledQuizData = shuffleArray(quizData).slice(0, 5);

  // Debug log to see which questions were selected
  console.log('Selected Quiz Questions:', shuffledQuizData.map((q, index) => ({
    questionNumber: index + 1,
    status: q.status,
    image: q.image,
    direction: q.direction,
    options: q.options,
    correctAnswerIndex: q.correctAnswerIndex,
    correctAnswer: q.options[q.correctAnswerIndex]
  })));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center px-2 py-1">
      <div className="w-full max-w-7xl mx-auto">
        <DirectionQuiz questions={shuffledQuizData} />
      </div>
    </div>
  );
}
