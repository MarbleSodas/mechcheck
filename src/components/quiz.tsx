"use client"
import { QuizQuestion } from '@/types';
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useResponsivePositioning } from '@/hooks/useResponsivePositioning';

const Quiz = ({ questions }: { questions: QuizQuestion[] }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const currentQuestion = questions[currentQuestionIndex];

  // Get responsive button positions based on container size
  const responsivePositions = useResponsivePositioning(
    imageContainerRef,
    currentQuestion.answerButtonPositions
  );

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
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center p-2 sm:p-4 max-w-md mx-auto h-[100vh] overflow-hidden"
      >
        <Card className={cn(
          "w-full bg-white/5 backdrop-blur-lg",
          "border border-white/10",
          "shadow-lg",
          "p-3 sm:p-6 rounded-xl"
        )}>
          <CardContent className="flex flex-col items-center space-y-3 sm:space-y-4 pt-2 sm:pt-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Quiz Completed!</h2>
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-white/10 flex items-center justify-center border-4 border-primary">
              <span className="text-xl sm:text-2xl font-bold text-white">{percentage}%</span>
            </div>
            <p className="text-base sm:text-lg text-gray-200">
              Your score: <span className="font-bold">{score} / {questions.length}</span>
            </p>
            <Button
              onClick={resetQuiz}
              className={cn(
                "w-full bg-primary hover:bg-primary/80",
                "text-white font-medium",
                "shadow-md hover:shadow-lg",
                "transition-all duration-300",
                "py-1.5 sm:py-2 text-xs sm:text-sm"
              )}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto p-1 sm:p-2 flex flex-col items-center justify-center h-[100vh] overflow-hidden">
      {/* Progress bar */}
      <div className="w-full max-w-[900px] mb-1 sm:mb-2">
        <div className="w-full h-1 sm:h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 rounded-full"
            style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-0.5 sm:mt-1 text-xs text-gray-400">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestionIndex) / questions.length) * 100)}% complete</span>
        </div>
      </div>

      {/* Question */}
      <motion.h2
        key={`question-${currentQuestionIndex}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-sm sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 text-center px-2 line-clamp-2"
      >
        {currentQuestion.question}
      </motion.h2>

      {/* Image and answer buttons */}
      <motion.div
        key={`image-${currentQuestionIndex}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='relative w-full max-w-[900px] h-[50vh] sm:h-[60vh] mb-2 rounded-xl overflow-hidden shadow-lg border border-white/10 bg-black/20'
        ref={imageContainerRef}
      >
        <Image
          loading='eager'
          decoding='sync'
          src={currentQuestion.image}
          alt={currentQuestion.question}
          className="object-contain"
          fill
          style={{
            zIndex: 0,
            padding: '8px',
          }}
        />
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelection(index)}
            disabled={userAnswers[currentQuestionIndex] !== null}
            className={cn(
              "absolute z-10 px-4 py-2 rounded-lg font-medium transition-colors duration-200",
              "border-2 shadow-md min-w-[50px] min-h-[50px] text-lg",
              userAnswers[currentQuestionIndex] === null
                ? "bg-primary/80 backdrop-blur-sm hover:bg-primary hover:border-white hover:shadow-lg hover:shadow-primary/30 text-white border-primary/50"
                : userAnswers[currentQuestionIndex] === index
                  ? index === currentQuestion.correctAnswerIndex
                    ? "bg-green-500/80 text-white border-green-400"
                    : "bg-red-500/80 text-white border-red-400"
                  : index === currentQuestion.correctAnswerIndex && userAnswers[currentQuestionIndex] !== null
                    ? "bg-green-500/80 text-white border-green-400"
                    : "bg-white/10 text-white/50 border-white/10"
            )}
            style={{
              left: `calc(${responsivePositions[index]?.x || currentQuestion.answerButtonPositions[index].x})`,
              top: `calc(${responsivePositions[index]?.y || currentQuestion.answerButtonPositions[index].y})`,
              transform: 'translate(-50%, -50%)', // Center the button at the position
              fontSize: `${Math.max(0.75, responsivePositions[index]?.scale || 1)}rem`
            }}
          >
            {option}
          </button>
        ))}
      </motion.div>

      {/* Feedback */}
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "mb-1 sm:mb-2 px-3 sm:px-4 py-1 sm:py-2 rounded-lg font-medium text-center text-xs sm:text-sm",
            feedback === "Correct!"
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-red-500/20 text-red-400 border border-red-500/30"
          )}
        >
          {feedback}
        </motion.div>
      )}

      {/* Next button */}
      <Button
        onClick={goToNextQuestion}
        disabled={userAnswers[currentQuestionIndex] === null}
        className={cn(
          "mt-1 sm:mt-2 px-4 sm:px-6 py-1.5 sm:py-2 h-auto text-xs sm:text-sm font-medium",
          "bg-primary hover:bg-primary/80 text-white",
          "shadow-md hover:shadow-lg transition-all duration-300",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
      </Button>
    </div>
  );
};

export default Quiz;