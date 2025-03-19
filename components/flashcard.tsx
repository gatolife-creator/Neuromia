"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlashcardProps {
  front: string;
  back: string;
  className?: string;
}

export function Flashcard({ front, back, className }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={cn(
        "relative w-full h-64 cursor-pointer perspective-1000",
        className
      )}
      onClick={handleFlip}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden bg-card border rounded-xl shadow-md p-6 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl font-medium">{front}</p>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden bg-card border rounded-xl shadow-md p-6 flex items-center justify-center [transform:rotateY(180deg)]">
          <div className="text-center">
            <p className="text-xl font-medium">{back}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
