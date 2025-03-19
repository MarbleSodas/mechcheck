import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import Link from 'next/link';

interface Quiz {
  title: string;
  description: string;
  href: string;
}

const quizzes: Quiz[] = [
  {
    title: 'Math Boss Quiz',
    description: 'Test the positions for grid mech',
    href: '/quizzes/aloalo-math',
  },
];

const Dashboard = () => {
  return (
    <div
      className={cn(
        "min-h-screen bg-gray-900", // Changed to a solid dark gray
        "flex flex-col items-center justify-center p-4 sm:p-8"
      )}
    >
      <div
        className={cn(
          "w-full max-w-4xl space-y-6",
          "text-center"
        )}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={cn(
            "text-4xl sm:text-5xl md:text-6xl font-bold",
            "text-white", // Changed to solid white
            "mb-4 sm:mb-6"
          )}
        >
          MechCheck
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
          className={cn(
            "text-gray-400 text-lg sm:text-xl", //Kept gray
            "max-w-2xl mx-auto"
          )}
        >
          Welcome to the Quiz Dashboard! Choose a quiz below to test your knowledge.
        </motion.p>

        <div
          className={cn(
            "grid",
            quizzes.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2",
            "gap-6"
          )}
        >
          {quizzes.map((quiz, index) => (
            <motion.div
              key={quiz.title}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
                delay: 0.3 + index * 0.1, // Staggered delay
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={cn(
                  "bg-white/5 backdrop-blur-lg",
                  "border border-white/10",
                  "shadow-lg hover:shadow-xl",
                  "transition-all duration-300",
                  "hover:border-gray-300/20", // Changed hover border
                  "hover:scale-[1.02]",
                  "hover:bg-white/5" // subtle hover background
                )}
              >
                <CardHeader>
                  <CardTitle
                    className={cn(
                      "text-white text-lg sm:text-xl font-semibold",
                      "truncate"
                    )}
                  >
                    {quiz.title}
                  </CardTitle>
                  <CardDescription
                    className={cn(
                      "text-gray-300 text-sm sm:text-base",
                      "line-clamp-2"
                    )}
                  >
                    {quiz.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={quiz.href}>
                    <Button
                      className={cn(
                        "w-full bg-white/10", // Changed button background
                        "text-white hover:bg-white/20", // Changed hover
                        "border border-white/10",
                        "shadow-md hover:shadow-lg",
                        "transition-all duration-300",
                        "py-3 sm:py-4",
                        "font-medium text-sm sm:text-base",
                      )}
                    >
                      Take Quiz
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
