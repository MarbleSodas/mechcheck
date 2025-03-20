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
    answerButtonPositions: [{ x: "40%", y: "10%" }, { x: "85%", y: "45%" }, { x: "40%", y: "90%" }, { x: "0%", y: "45%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/3.png", "/images/self-direction/up.png"],
    image: "/images/self-direction/up_position.png",
    direction: "/images/self-direction/right_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 1,
    answerButtonPositions: [{ x: "40%", y: "10%" }, { x: "85%", y: "45%" }, { x: "40%", y: "90%" }, { x: "0%", y: "45%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/5.png", "/images/self-direction/up.png"],
    image: "/images/self-direction/up_position.png",
    direction: "/images/self-direction/left_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 1,
    answerButtonPositions: [{ x: "40%", y: "10%" }, { x: "85%", y: "45%" }, { x: "40%", y: "90%" }, { x: "0%", y: "45%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/5.png", "/images/self-direction/up.png"],
    image: "/images/self-direction/up_position.png",
    direction: "/images/self-direction/right_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 3,
    answerButtonPositions: [{ x: "40%", y: "10%" }, { x: "85%", y: "45%" }, { x: "40%", y: "90%" }, { x: "0%", y: "45%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/3.png", "/images/self-direction/left.png"],
    image: "/images/self-direction/left_position.png",
    direction: "/images/self-direction/left_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 0,
    answerButtonPositions: [{ x: "40%", y: "10%" }, { x: "85%", y: "45%" }, { x: "40%", y: "90%" }, { x: "0%", y: "45%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/3.png", "/images/self-direction/left.png"],
    image: "/images/self-direction/left_position.png",
    direction: "/images/self-direction/right_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 2,
    answerButtonPositions: [{ x: "40%", y: "10%" }, { x: "85%", y: "45%" }, { x: "40%", y: "90%" }, { x: "0%", y: "45%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/5.png", "/images/self-direction/left.png"],
    image: "/images/self-direction/left_position.png",
    direction: "/images/self-direction/left_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 2,
    answerButtonPositions: [{ x: "40%", y: "10%" }, { x: "85%", y: "45%" }, { x: "40%", y: "90%" }, { x: "0%", y: "45%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/5.png", "/images/self-direction/left.png"],
    image: "/images/self-direction/left_position.png",
    direction: "/images/self-direction/right_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 0,
    answerButtonPositions: [{ x: "40%", y: "10%" }, { x: "85%", y: "45%" }, { x: "40%", y: "90%" }, { x: "0%", y: "45%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/3.png", "/images/self-direction/right.png"],
    image: "/images/self-direction/right_position.png",
    direction: "/images/self-direction/left_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 2,
    answerButtonPositions: [{ x: "40%", y: "10%" }, { x: "85%", y: "45%" }, { x: "40%", y: "90%" }, { x: "0%", y: "45%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/3.png", "/images/self-direction/right.png"],
    image: "/images/self-direction/right_position.png",
    direction: "/images/self-direction/right_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 0,
    answerButtonPositions: [{ x: "40%", y: "10%" }, { x: "85%", y: "45%" }, { x: "40%", y: "90%" }, { x: "0%", y: "45%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/5.png", "/images/self-direction/right.png"],
    image: "/images/self-direction/right_position.png",
    direction: "/images/self-direction/left_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 0,
    answerButtonPositions: [{ x: "40%", y: "10%" }, { x: "85%", y: "45%" }, { x: "40%", y: "90%" }, { x: "0%", y: "45%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/5.png", "/images/self-direction/right.png"],
    image: "/images/self-direction/right_position.png",
    direction: "/images/self-direction/right_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 2,
    answerButtonPositions: [{ x: "40%", y: "10%" }, { x: "85%", y: "45%" }, { x: "40%", y: "90%" }, { x: "0%", y: "45%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/3.png", "/images/self-direction/down.png"],
    image: "/images/self-direction/down_position.png",
    direction: "/images/self-direction/left_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 1,
    answerButtonPositions: [{ x: "40%", y: "10%" }, { x: "85%", y: "45%" }, { x: "40%", y: "90%" }, { x: "0%", y: "45%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/3.png", "/images/self-direction/down.png"],
    image: "/images/self-direction/down_position.png",
    direction: "/images/self-direction/right_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 3,
    answerButtonPositions: [{ x: "40%", y: "10%" }, { x: "85%", y: "45%" }, { x: "40%", y: "90%" }, { x: "0%", y: "45%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/5.png", "/images/self-direction/down.png"],
    image: "/images/self-direction/down_position.png",
    direction: "/images/self-direction/left_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 3,
    answerButtonPositions: [{ x: "40%", y: "10%" }, { x: "85%", y: "45%" }, { x: "40%", y: "90%" }, { x: "0%", y: "45%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/5.png", "/images/self-direction/down.png"],
    image: "/images/self-direction/down_position.png",
    direction: "/images/self-direction/right_arrow.png",
    options: ["Front", "Right", "Back", "Left"],
    correctAnswerIndex: 1,
    answerButtonPositions: [{ x: "40%", y: "10%" }, { x: "85%", y: "45%" }, { x: "40%", y: "90%" }, { x: "0%", y: "45%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/3.png", "/images/self-direction/forward_march.png"],
    image: "/images/self-direction/role_melee.png",
    direction: "/images/self-direction/left_arrow.png",
    options: ["Right", "Left"],
    correctAnswerIndex: 1,
    answerButtonPositions: [{ x: "85%", y: "45%" }, { x: "0%", y: "45%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/5.png", "/images/self-direction/forward_march.png"],
    image: "/images/self-direction/role_melee.png",
    direction: "/images/self-direction/left_arrow.png",
    options: ["Right", "Left"],
    correctAnswerIndex: 0,
    answerButtonPositions: [{ x: "85%", y: "45%" }, { x: "0%", y: "45%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/3.png", "/images/self-direction/forward_march.png"],
    image: "/images/self-direction/role_melee.png",
    direction: "/images/self-direction/right_arrow.png",
    options: ["Right", "Left"],
    correctAnswerIndex: 0,
    answerButtonPositions: [{ x: "85%", y: "45%" }, { x: "0%", y: "45%" }]
  },
  {
    question: "Which way should you face?",
    status: ["/images/self-direction/5.png", "/images/self-direction/forward_march.png"],
    image: "/images/self-direction/role_melee.png",
    direction: "/images/self-direction/right_arrow.png",
    options: ["Right", "Left"],
    correctAnswerIndex: 1,
    answerButtonPositions: [{ x: "85%", y: "45%" }, { x: "0%", y: "45%" }]
  },
] as DirectionalQuizQuestion[];

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray.slice(0, 5);
}

export default function SelfDirectionQuiz() {
  const shuffledQuizData = shuffleArray(quizData);
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 sm:p-8">
      <DirectionQuiz questions={shuffledQuizData} />
    </div>
  );
}
