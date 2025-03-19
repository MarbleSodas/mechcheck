"use client"
import { QuizQuestion } from '@/types';
import React, { useState } from 'react';
import { cn } from '@/lib/utils'; // Assuming you have a lib/utils.ts file with a cn function
import Image from 'next/image';

const Quiz = ({ questions }: { questions: QuizQuestion[] }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);


  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelection = (answerIndex: number) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(updatedAnswers);

    if (answerIndex === currentQuestion.correctAnswerIndex) {
      setFeedback("Correct!");
    } else {
      setFeedback("Incorrect.");
    }
  };

  const goToNextQuestion = () => {
    if (userAnswers[currentQuestionIndex] === null) {
      return; // Prevent moving to the next question without answering
    }


    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setFeedback(null); // Reset feedback for the next question
    } else {
      setQuizCompleted(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].correctAnswerIndex) {
        score++;
      }
    }
    return score;
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(questions.length).fill(null));
    setQuizCompleted(false);
    setFeedback(null);
  };

  if (quizCompleted) {
    const score = calculateScore();
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">Quiz Completed!</h2>
        <p className="text-lg text-gray-200 mb-4">Your score: {score} / {questions.length}</p>
        <button onClick={resetQuiz} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Reset Quiz</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center sm:p-8">
      <h2 className="text-2xl font-semibold text-gray-100 mb-4">Question {currentQuestionIndex + 1}</h2>
      <h2 className="text-2xl font-semibold text-gray-100 mb-4">{currentQuestion.question}</h2>
      <div className='relative w-full max-w-[900px] aspect-[3/2] mb-4'>
        <Image
          src={currentQuestion.image}
          alt={currentQuestion.question}
          className="rounded-lg shadow-md"
          fill
          style={{
            zIndex: 0,
          }}
        />
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelection(index)}
            disabled={userAnswers[currentQuestionIndex] !== null}
            className={cn(
              "relative bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
              userAnswers[currentQuestionIndex] === index && "opacity-50 cursor-not-allowed"
            )}
            style={{
              left: currentQuestion.answerButtonPositions[index].x,
              top: currentQuestion.answerButtonPositions[index].y,
              position: 'absolute',
              zIndex: 1,
            }}
          >
            {option}
          </button>
        ))}
      </div>

      {feedback && (
          <p className={`text-lg ${feedback === "Correct!" ? "text-green-500" : "text-red-500"} mb-4`}>
            {feedback}
          </p>
        )}
      <button
        onClick={goToNextQuestion}
        disabled={userAnswers[currentQuestionIndex] === null}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next Question
      </button>
    </div>
  );
};

export default Quiz;