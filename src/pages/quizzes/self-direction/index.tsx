import DirectionQuiz from "@/components/directional-quiz";
import { DirectionalQuizQuestion } from "@/types";

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

  // Return a fixed number of items
  return newArray.slice(0, 5);
}

export default function SelfDirectionQuiz() {
  const shuffledQuizData = shuffleArray(quizData);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <DirectionQuiz questions={shuffledQuizData} />
      </div>
    </div>
  );
}
