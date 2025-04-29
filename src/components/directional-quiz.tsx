"use client"
import { DirectionalQuizQuestion } from '@/types';
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useResponsivePositioning } from '@/hooks/useResponsivePositioning';
import { ArrowLeft, ArrowRight, Home } from '@/components/icons';
import Link from 'next/link';

const DirectionQuiz = ({ questions }: { questions: DirectionalQuizQuestion[] }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [shouldRotate, setShouldRotate] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  // New state variables for drag rotation
  const [isDragging, setIsDragging] = useState(false);
  const [dragRotation, setDragRotation] = useState(0);
  const [selectedDirection, setSelectedDirection] = useState<number | null>(null);
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Track the center point of the image for angle calculations
  const [centerPoint, setCenterPoint] = useState({ x: 0, y: 0 });

  const currentQuestion = questions[currentQuestionIndex];

  // Get responsive button positions based on container size
  const responsivePositions = useResponsivePositioning(
    imageContainerRef,
    currentQuestion.answerButtonPositions
  );

  // Calculate the center point of the image when the component mounts or the window resizes
  useEffect(() => {
    const updateCenterPoint = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        setCenterPoint({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
        console.log("Center point updated:", rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    };

    // Initial update with multiple attempts to ensure it works
    const timeoutId1 = setTimeout(updateCenterPoint, 100);
    const timeoutId2 = setTimeout(updateCenterPoint, 500);
    const timeoutId3 = setTimeout(updateCenterPoint, 1000);

    // Add resize listener
    window.addEventListener('resize', updateCenterPoint);

    // Add visibility change listener to update when tab becomes visible
    document.addEventListener('visibilitychange', updateCenterPoint);

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
      window.removeEventListener('resize', updateCenterPoint);
      document.removeEventListener('visibilitychange', updateCenterPoint);
    };
  }, [currentQuestionIndex]);

  // Reset drag state when question changes
  useEffect(() => {
    setDragRotation(0);
    setSelectedDirection(null);
    setShowSubmitButton(false);
  }, [currentQuestionIndex]);

  // Map direction names to angles (used in getCorrectRotationAngle and angleToDirectionIndex)
  const DIRECTION_ANGLES = {
    "front": 0,
    "right": 90,
    "back": 180,
    "left": 270
  };

  // Map angles to direction indices
  const angleToDirectionIndex = (customAngle?: number) => {
    // Get the normalized angle between 0 and 360
    const normalizedAngle = ((customAngle !== undefined ? customAngle : dragRotation) % 360 + 360) % 360;

    // Define the angle ranges for each direction
    const ranges = [
      { min: 315, max: 360, direction: "front" },
      { min: 0, max: 45, direction: "front" },
      { min: 45, max: 135, direction: "right" },
      { min: 135, max: 225, direction: "back" },
      { min: 225, max: 315, direction: "left" }
    ];

    // Find the matching direction
    const matchedRange = ranges.find(range =>
      normalizedAngle >= range.min && normalizedAngle < range.max
    );

    if (matchedRange) {
      // Find the index of this direction in the options array
      const directionIndex = currentQuestion.options.findIndex(
        option => option.toLowerCase() === matchedRange.direction
      );

      if (customAngle === undefined) {
        console.log(`Dragged to angle: ${normalizedAngle}°, Snapped to: ${matchedRange.direction} (${directionIndex})`);
      }

      return directionIndex;
    }

    return null;
  };

  // Calculate angle between two points
  const calculateAngle = (x: number, y: number) => {
    const deltaX = x - centerPoint.x;
    const deltaY = y - centerPoint.y;

    // Calculate angle in radians and convert to degrees
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    // Adjust angle to start from the top (0 degrees) and go clockwise
    angle = 90 - angle;
    if (angle < 0) angle += 360;

    return angle;
  };

  // Helper function to get the absolute rotation angle for the correct answer
  const getCorrectRotationAngle = (correctIndex: number) => {
    // Get the option name for the correct answer
    const correctOption = currentQuestion.options[correctIndex].toLowerCase();

    // Get the angle for the correct direction
    const correctAngle = DIRECTION_ANGLES[correctOption as keyof typeof DIRECTION_ANGLES] || 0;

    console.log(`Correct: ${correctOption}, Rotation to: ${correctAngle}°`);

    return correctAngle;
  };

  // Handle mouse/touch events for drag rotation
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (userAnswers[currentQuestionIndex] !== null) return; // Prevent dragging if already answered

    console.log("Drag start event:", e.type);

    // Update center point on drag start to ensure it's accurate
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      setCenterPoint({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
      console.log("Center point on drag start:", rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

    setIsDragging(true);
    setShowSubmitButton(false);
    setSelectedDirection(null);

    // Prevent default behavior to avoid text selection during drag
    e.preventDefault();
    e.stopPropagation();

    // Add event listeners for move and end events
    if ('touches' in e) {
      document.addEventListener('touchmove', handleDragMove, { passive: false });
      document.addEventListener('touchend', handleDragEnd);
      document.addEventListener('touchcancel', handleDragEnd);
    } else {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('mouseleave', handleDragEnd);
    }

    // Initial drag move to set the rotation based on the starting position
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const initialAngle = calculateAngle(clientX, clientY);
    setDragRotation(initialAngle);
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    // Prevent default to stop scrolling on touch devices
    e.preventDefault();

    // Get the current pointer position
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    // Calculate the angle between the center and the current pointer position
    const angle = calculateAngle(clientX, clientY);

    // Update the rotation angle immediately for smooth following
    setDragRotation(angle);

    // Find the closest direction based on the current angle
    const directionIndex = angleToDirectionIndex(angle);

    // Update the selected direction during drag for visual feedback
    if (directionIndex !== null && directionIndex !== selectedDirection) {
      setSelectedDirection(directionIndex);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    console.log("Drag end event");

    setIsDragging(false);

    // Remove all event listeners
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('mouseleave', handleDragEnd);
    document.removeEventListener('touchmove', handleDragMove);
    document.removeEventListener('touchend', handleDragEnd);
    document.removeEventListener('touchcancel', handleDragEnd);

    // Find the closest direction based on the current angle
    const directionIndex = angleToDirectionIndex();
    console.log("Direction index on drag end:", directionIndex);

    if (directionIndex !== null) {
      // Set the selected direction
      setSelectedDirection(directionIndex);

      // Get the angle for the selected direction for snapping
      const directionName = currentQuestion.options[directionIndex].toLowerCase();
      const snapAngle = DIRECTION_ANGLES[directionName as keyof typeof DIRECTION_ANGLES] || 0;

      // Snap to the direction angle
      setDragRotation(snapAngle);

      // Show the submit button
      setShowSubmitButton(true);
    }
  };

  // Handle submit button click
  const handleSubmit = () => {
    if (selectedDirection === null) return;

    // Use the selected direction as the answer
    handleAnswerSelection(selectedDirection);
  };

  const handleAnswerSelection = (answerIndex: number) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(updatedAnswers);

    const correctIndex = currentQuestion.correctAnswerIndex;

    if (answerIndex === correctIndex) {
      setFeedback("Correct!");
      // No need to rotate if already correct
      setShouldRotate(false);
      setRotationAngle(0);
    } else {
      setFeedback("Incorrect.");

      // Get the absolute rotation angle for the correct direction
      const angle = getCorrectRotationAngle(correctIndex);

      // Set the rotation angle and trigger the rotation
      setRotationAngle(angle);
      setShouldRotate(true);
    }

    // Hide the submit button after answering
    setShowSubmitButton(false);
  };

  const goToNextQuestion = () => {
    if (userAnswers[currentQuestionIndex] === null) {
      return; // Prevent moving to the next question without answering
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setFeedback(null); // Reset feedback for the next question
      setShouldRotate(false); // Reset rotation state
      setRotationAngle(0); // Reset rotation angle
      setDragRotation(0); // Reset drag rotation
      setSelectedDirection(null); // Reset selected direction
      setShowSubmitButton(false); // Hide submit button
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
    setShouldRotate(false);
    setRotationAngle(0);
    setDragRotation(0);
    setSelectedDirection(null);
    setShowSubmitButton(false);
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
        className="relative w-full max-w-[500px] h-[48vh] my-4"
        ref={imageContainerRef}
      >
        <div
          className="relative w-full h-full rounded-xl overflow-hidden shadow-lg border border-white/10 bg-black/20"
          style={{ touchAction: 'none' }} // Prevent browser touch actions
        >
          {/* Transparent overlay for drag interaction */}
          {userAnswers[currentQuestionIndex] === null && (
            <div
              className="absolute inset-0 z-30 cursor-grab"
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
              style={{ touchAction: 'none' }}
            />
          )}

          <motion.div
            ref={imageRef}
            initial={{ rotate: 0 }}
            animate={{
              rotate: shouldRotate ? rotationAngle : dragRotation
            }}
            transition={{
              type: shouldRotate ? "spring" : "tween",
              stiffness: 50,
              damping: 10,
              duration: shouldRotate ? 1 : 0.05, // Faster updates for smoother cursor following
              delay: shouldRotate ? 0.3 : 0 // Add a small delay to let the user see the feedback first
            }}
            style={{
              transformOrigin: 'center center', // Ensure rotation happens from the center
              zIndex: 20, // Increase z-index to ensure it's above other elements
              touchAction: 'none' // Prevent browser touch actions
            }}
            className="w-full h-full relative"
            drag={false} // Disable framer-motion's built-in drag
          >
            <Image
              loading='eager'
              decoding='sync'
              src={currentQuestion.image}
              alt={currentQuestion.question}
              className="object-contain"
              fill
              sizes="(max-width: 768px) 100vw, 500px" // Add sizes to prevent warning
              style={{
                zIndex: 0,
                padding: '8px',
                pointerEvents: 'none', // Prevent image from capturing pointer events
                touchAction: 'none' // Prevent browser touch actions
              }}
              draggable={false} // Prevent default drag behavior
            />
          </motion.div>

          {/* Drag instructions - shown when not answered and not dragging */}
          {userAnswers[currentQuestionIndex] === null && !isDragging && !showSubmitButton && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm font-medium">
                Click and drag to rotate
              </div>
            </div>
          )}

          {/* Direction indicator overlay - shows during drag */}
          {isDragging && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                <motion.div
                  animate={{ rotate: dragRotation }}
                  className="w-10 h-10 flex items-center justify-center"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L12 20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 4L7 9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 4L17 9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </motion.div>
              </div>
            </div>
          )}
        </div>

        {/* Visual indicator for selected direction */}
        {selectedDirection !== null && userAnswers[currentQuestionIndex] === null && !isDragging && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-2 left-0 right-0 flex justify-center"
          >
            <div className="bg-primary/80 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
              Selected: {currentQuestion.options[selectedDirection]}
            </div>
          </motion.div>
        )}

        {/* Submit button */}
        {showSubmitButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-0 right-0 flex justify-center"
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

        {/* Answer buttons - positioned around the image */}
        <div className="absolute top-0 left-0 w-full h-full">
          {currentQuestion.options.map((option, index) => {
            // Use responsive positions with fallback to original positions
            const position = responsivePositions[index] ? {
              x: responsivePositions[index].x,
              y: responsivePositions[index].y,
              scale: responsivePositions[index].scale
            } : {
              x: currentQuestion.answerButtonPositions[index].x,
              y: currentQuestion.answerButtonPositions[index].y,
              scale: 1
            };

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelection(index)}
                disabled={userAnswers[currentQuestionIndex] !== null}
                className={cn(
                  "absolute z-10 px-4 py-2 rounded-lg font-medium transition-colors duration-200",
                  "border-2 shadow-md min-w-[70px] min-h-[50px] text-lg",
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
                  left: `calc(${position.x})`,
                  top: `calc(${position.y})`,
                  transform: 'translate(-50%, -50%)', // Center the button at the position
                  fontSize: `${Math.max(0.75, position.scale)}rem`
                }}
              >
                {option}
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
            "mb-1.5 px-4 py-1.5 rounded-lg font-medium text-center text-xs sm:text-sm",
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