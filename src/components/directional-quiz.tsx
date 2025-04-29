"use client"
import { DirectionalQuizQuestion } from '@/types';
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Home } from '@/components/icons';
import Link from 'next/link';

const DirectionQuiz = ({ questions }: { questions: DirectionalQuizQuestion[] }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [shouldRotate, setShouldRotate] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  // State variables for direction selection and rotation
  const [selectedDirection, setSelectedDirection] = useState<number | null>(null);
  const [currentRotation, setCurrentRotation] = useState(0);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const currentQuestion = questions[currentQuestionIndex];

  // Debug log for current question
  useEffect(() => {
    console.log('Current Question Data:', {
      index: currentQuestionIndex,
      question: currentQuestion.question,
      options: currentQuestion.options,
      correctAnswerIndex: currentQuestion.correctAnswerIndex,
      correctAnswer: currentQuestion.options[currentQuestion.correctAnswerIndex],
      image: currentQuestion.image,
      direction: currentQuestion.direction
    });
  }, [currentQuestionIndex, currentQuestion]);

  // Reset state when question changes
  useEffect(() => {
    setCurrentRotation(0);
    setSelectedDirection(null);
  }, [currentQuestionIndex]);

  // Map direction names to angles (used in getCorrectRotationAngle and angleToDirectionIndex)
  const DIRECTION_ANGLES = {
    "front": 0,
    "right": 90,
    "back": 180,
    "left": 270
  };

  // Helper function to calculate the shortest rotation path
  const calculateShortestRotation = (currentAngle: number, targetAngle: number): number => {
    // Get the base angles (0-360)
    const current = ((currentAngle % 360) + 360) % 360;
    const target = ((targetAngle % 360) + 360) % 360;

    // Calculate both possible directions
    const clockwise = target >= current ? target - current : target + 360 - current;
    const counterclockwise = current >= target ? current - target : current + 360 - target;

    // Debug log for rotation calculation
    console.log('Rotation Calculation:', {
      currentAngle,
      targetAngle,
      normalizedCurrent: current,
      normalizedTarget: target,
      clockwiseDistance: clockwise,
      counterclockwiseDistance: counterclockwise,
      chosenPath: clockwise <= counterclockwise ? 'clockwise' : 'counterclockwise',
      resultAngle: clockwise <= counterclockwise ? currentAngle + clockwise : currentAngle - counterclockwise
    });

    // Choose the shortest path
    if (clockwise <= counterclockwise) {
      // Clockwise is shorter or equal
      return currentAngle + clockwise;
    } else {
      // Counterclockwise is shorter
      return currentAngle - counterclockwise;
    }
  };


  // Helper function to get the absolute rotation angle for the correct answer
  const getCorrectRotationAngle = (correctIndex: number) => {
    // Get the option name for the correct answer
    const correctOption = currentQuestion.options[correctIndex].toLowerCase();

    // Get the angle for the correct direction
    const correctAngle = DIRECTION_ANGLES[correctOption as keyof typeof DIRECTION_ANGLES] || 0;

    // Debug log for correct rotation angle
    console.log('Correct Rotation Angle:', {
      correctIndex,
      correctOption,
      mappedAngle: correctAngle,
      directionAnglesMap: DIRECTION_ANGLES
    });

    return correctAngle;
  };

  // Handle submit button click
  const handleSubmit = () => {
    if (selectedDirection === null) return;

    console.log('Submit Button Clicked:', {
      selectedDirection,
      selectedOption: currentQuestion.options[selectedDirection],
      correctAnswerIndex: currentQuestion.correctAnswerIndex,
      correctOption: currentQuestion.options[currentQuestion.correctAnswerIndex]
    });

    // Use the selected direction as the answer
    handleAnswerSelection(selectedDirection);
  };

  const handleAnswerSelection = (answerIndex: number) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(updatedAnswers);

    const correctIndex = currentQuestion.correctAnswerIndex;

    console.log('Answer Selection:', {
      questionIndex: currentQuestionIndex,
      userSelectedIndex: answerIndex,
      userSelectedOption: currentQuestion.options[answerIndex],
      correctIndex: correctIndex,
      correctOption: currentQuestion.options[correctIndex],
      isCorrect: answerIndex === correctIndex,
      currentRotation
    });

    if (answerIndex === correctIndex) {
      setFeedback("Correct!");
      // No need to rotate if already correct
      setShouldRotate(false);
      setRotationAngle(0);
      console.log('Correct answer selected, no rotation needed');
    } else {
      setFeedback("Incorrect.");

      // Get the absolute rotation angle for the correct direction
      const correctAngle = getCorrectRotationAngle(correctIndex);

      // Calculate the shortest rotation path from current rotation to correct angle
      const shortestRotation = calculateShortestRotation(currentRotation, correctAngle);

      console.log('Incorrect answer, rotating to show correct answer:', {
        correctAngle,
        shortestRotation,
        fromCurrentRotation: currentRotation
      });

      // Set the rotation angle and trigger the rotation
      setRotationAngle(shortestRotation);
      setShouldRotate(true);
    }
  };

  const goToNextQuestion = () => {
    if (userAnswers[currentQuestionIndex] === null) {
      console.log('Cannot proceed: No answer selected for current question');
      return; // Prevent moving to the next question without answering
    }

    console.log('Moving to next question:', {
      currentIndex: currentQuestionIndex,
      totalQuestions: questions.length,
      userAnswers,
      isLastQuestion: currentQuestionIndex === questions.length - 1
    });

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setFeedback(null); // Reset feedback for the next question
      setShouldRotate(false); // Reset rotation state
      setRotationAngle(0); // Reset rotation angle
      setCurrentRotation(0); // Reset rotation
      setSelectedDirection(null); // Reset selected direction
      console.log('State reset for next question');
    } else {
      setQuizCompleted(true);
      console.log('Quiz completed, calculating final score');
    }
  };

  const calculateScore = () => {
    let score = 0;
    const scoreDetails = [];

    for (let i = 0; i < questions.length; i++) {
      const isCorrect = userAnswers[i] === questions[i].correctAnswerIndex;
      if (isCorrect) {
        score++;
      }

      scoreDetails.push({
        questionIndex: i,
        userAnswer: userAnswers[i],
        userAnswerText: questions[i].options[userAnswers[i]],
        correctAnswerIndex: questions[i].correctAnswerIndex,
        correctAnswerText: questions[i].options[questions[i].correctAnswerIndex],
        isCorrect
      });
    }

    console.log('Quiz Score Calculation:', {
      totalQuestions: questions.length,
      correctAnswers: score,
      percentage: Math.round((score / questions.length) * 100),
      scoreDetails
    });

    return score;
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(questions.length).fill(null));
    setQuizCompleted(false);
    setFeedback(null);
    setShouldRotate(false);
    setRotationAngle(0);
    setCurrentRotation(0);
    setSelectedDirection(null);
  };

  if (quizCompleted) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center px-4 py-2 max-w-md mx-auto h-[100vh] overflow-hidden"
      >
        {/* Back button - positioned at the top left */}
        <div className="absolute top-4 left-4 z-10">
          <Link href="/">
            <Button
              variant="ghost"
              className="bg-black/30 hover:bg-black/50 rounded-full p-2 w-10 h-10 flex items-center justify-center"
              aria-label="Back to Home"
            >
              <Home width={24} height={24} color="#FFFFFF" />
            </Button>
          </Link>
        </div>

        <Card className={cn(
          "w-full bg-white/5 backdrop-blur-lg",
          "border border-white/10",
          "shadow-lg",
          "p-4 rounded-xl"
        )}>
          <CardContent className="flex flex-col items-center space-y-3 pt-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Quiz Completed!</h2>
            <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border-4 border-primary">
              <span className="text-xl sm:text-2xl font-bold text-white">{percentage}%</span>
            </div>
            <p className="text-base sm:text-lg text-gray-200">
              Your score: <span className="font-bold">{score} / {questions.length}</span>
            </p>
            <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-3">
              <Button
                onClick={resetQuiz}
                className={cn(
                  "flex-1 bg-primary hover:bg-primary/80",
                  "text-white font-medium",
                  "shadow-md hover:shadow-lg",
                  "transition-all duration-300",
                  "py-1.5 sm:py-2 text-xs sm:text-sm"
                )}
              >
                Try Again
              </Button>
              <Link href="/" className="flex-1">
                <Button
                  className={cn(
                    "w-full bg-white/10 hover:bg-white/20",
                    "text-white font-medium",
                    "shadow-md hover:shadow-lg",
                    "transition-all duration-300",
                    "py-1.5 sm:py-2 text-xs sm:text-sm"
                  )}
                >
                  Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto px-2 py-1 flex flex-col items-center justify-center h-[100vh] overflow-hidden">
      {/* Back button - positioned at the top left */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/">
          <Button
            variant="ghost"
            className="bg-black/30 hover:bg-black/50 rounded-full p-2 w-10 h-10 flex items-center justify-center"
            aria-label="Back to Home"
          >
            <Home width={24} height={24} color="#FFFFFF" />
          </Button>
        </Link>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-[600px] mb-1.5">
        <div className="w-full h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 rounded-full"
            style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-0.5 text-xs text-gray-400">
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
        className="text-sm sm:text-xl md:text-2xl font-bold text-white mb-1.5 text-center px-2 line-clamp-1"
      >
        {currentQuestion.question}
      </motion.h2>

      {/* Status icons */}
      <motion.div
        key={`status-${currentQuestionIndex}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex justify-center items-center mb-1.5 space-x-1.5 sm:space-x-2"
      >
        {currentQuestion.status.map((item, index) => (
          <div
            key={index}
            className="bg-white/5 p-1 rounded-lg border border-white/10 shadow-md"
          >
            <div className="flex items-center justify-center w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]">
              <Image
                src={item}
                alt={`Status ${index + 1}`}
                width={25}
                height={25}
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Direction arrow - positioned above the image */}
      <div className="w-full flex justify-center mb-2">
        {currentQuestion.direction.includes('left_arrow') ? (
          <ArrowLeft
            width={70}
            height={70}
            color="#FFFFFF"
            className="drop-shadow-[0_0_8px_rgba(0,0,0,0.5)] bg-black/30 p-2 rounded-full"
          />
        ) : (
          <ArrowRight
            width={70}
            height={70}
            color="#FFFFFF"
            className="drop-shadow-[0_0_8px_rgba(0,0,0,0.5)] bg-black/30 p-2 rounded-full"
          />
        )}
      </div>

      {/* Image container */}
      <motion.div
        key={`image-${currentQuestionIndex}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-[500px] h-[48vh] my-2 mb-14"
        ref={imageContainerRef}
      >
        <div
          className="relative w-full h-full rounded-xl overflow-hidden shadow-lg border border-white/10 bg-black/20"
          style={{ touchAction: 'none' }} // Prevent browser touch actions
        >
          <motion.div
            ref={imageRef}
            initial={{ rotate: 0 }}
            animate={{
              rotate: shouldRotate ? rotationAngle : currentRotation
            }}
            transition={{
              type: shouldRotate ? "spring" : "tween",
              stiffness: 50,
              damping: 10,
              duration: shouldRotate ? 1 : 0.3,
              delay: shouldRotate ? 0.3 : 0
            }}
            style={{
              transformOrigin: 'center center', // Ensure rotation happens from the center
              zIndex: 10,
              touchAction: 'none'
            }}
            className="w-full h-full relative"
          >
            <div className="absolute inset-[70px]">
              <Image
                loading='eager'
                decoding='sync'
                src={currentQuestion.image}
                alt={currentQuestion.question}
                className="object-contain"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                style={{
                  zIndex: 0,
                  pointerEvents: 'none',
                  touchAction: 'none'
                }}
                draggable={false}
              />
            </div>


          </motion.div>
        </div>

        {/* Submit button - shown when a direction is selected */}
        {selectedDirection !== null && userAnswers[currentQuestionIndex] === null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-12 left-0 right-0 flex justify-center"
          >
            <Button
              onClick={handleSubmit}
              className={cn(
                "px-6 py-2 h-auto text-sm font-medium",
                "bg-primary hover:bg-primary/80 text-white",
                "shadow-md hover:shadow-lg transition-all duration-300"
              )}
            >
              Submit Answer
            </Button>
          </motion.div>
        )}

        {/* Direction buttons - positioned at the edges of the image container */}
        <div className="absolute top-0 left-0 w-full h-full">
          {currentQuestion.options.map((option, index) => {
            const directionName = option.toLowerCase();

            // Define button position and caret based on direction
            let buttonPosition = "";
            let caretSvg = null;

            if (directionName === "front") {
              buttonPosition = "top-0 left-[60px] right-[60px] h-[50px] rounded-t-xl";
              caretSvg = (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              );
            } else if (directionName === "right") {
              buttonPosition = "top-[60px] bottom-[60px] right-0 w-[50px] rounded-r-xl";
              caretSvg = (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              );
            } else if (directionName === "back") {
              buttonPosition = "bottom-0 left-[60px] right-[60px] h-[50px] rounded-b-xl";
              caretSvg = (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              );
            } else if (directionName === "left") {
              buttonPosition = "top-[60px] bottom-[60px] left-0 w-[50px] rounded-l-xl";
              caretSvg = (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <polyline points="15 6 9 12 15 18"></polyline>
                </svg>
              );
            }

            return (
              <button
                key={index}
                onClick={() => {
                  // Get the angle for this direction
                  const directionAngle = DIRECTION_ANGLES[directionName as keyof typeof DIRECTION_ANGLES] || 0;

                  console.log('Direction Button Clicked:', {
                    buttonIndex: index,
                    directionName,
                    directionAngle,
                    currentRotation
                  });

                  // Calculate the shortest rotation path
                  const shortestRotation = calculateShortestRotation(currentRotation, directionAngle);

                  // Set the rotation angle
                  setCurrentRotation(shortestRotation);

                  // Set the selected direction
                  setSelectedDirection(index);

                  console.log('Direction selected:', {
                    selectedIndex: index,
                    selectedDirection: directionName,
                    newRotation: shortestRotation
                  });
                }}
                disabled={userAnswers[currentQuestionIndex] !== null}
                className={cn(
                  "absolute z-10 flex items-center justify-center transition-all duration-200",
                  "border-2 shadow-md",
                  buttonPosition,
                  userAnswers[currentQuestionIndex] === null
                    ? selectedDirection === index
                      ? "bg-primary text-white border-white shadow-lg shadow-primary/30 scale-[1.02]"
                      : "bg-primary/70 backdrop-blur-sm hover:bg-primary/90 hover:border-white/80 hover:shadow-lg hover:scale-[1.02] text-white border-primary/30"
                    : userAnswers[currentQuestionIndex] === index
                      ? index === currentQuestion.correctAnswerIndex
                        ? "bg-green-500/80 text-white border-green-400"
                        : "bg-red-500/80 text-white border-red-400"
                      : index === currentQuestion.correctAnswerIndex && userAnswers[currentQuestionIndex] !== null
                        ? "bg-green-500/80 text-white border-green-400"
                        : "bg-white/10 text-white/50 border-white/10"
                )}
              >
                <div className="flex flex-col items-center justify-center">
                  {caretSvg}
                  <span className="text-sm font-medium mt-1">{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Feedback */}
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "fixed bottom-20 px-4 py-1.5 rounded-lg font-medium text-center text-xs sm:text-sm",
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
          "mt-1 px-5 py-1.5 h-auto text-xs sm:text-sm font-medium",
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

export default DirectionQuiz;