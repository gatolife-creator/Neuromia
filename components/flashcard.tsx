"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlashcardProps {
  front: string;
  back: string;
  isStudying?: boolean;
  className?: string;
}

export function Flashcard({
  front,
  back,
  isStudying,
  className,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    if (!isStudying) {
      setIsFlipped(false);
    }
  }, [front, back, isStudying]);

  return (
    <div
      className={cn(
        `relative w-full lg:h-96 h-64 perspective-distant ${
          isStudying ? "cursor-pointer" : ""
        }`,
        className
      )}
      onClick={isStudying ? handleFlip : () => {}}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-500 transform-3d"
        initial={{ opacity: 0 }}
        animate={{ rotateX: isFlipped ? 180 : 0, opacity: 1 }}
        transition={{ duration: 0.01 }}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden bg-card border rounded-xl shadow-md p-6 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl font-medium">{front}</p>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden bg-card border rounded-xl shadow-md p-6 flex items-center justify-center [transform:rotateX(180deg)]">
          <div className="text-center">
            <p className="text-xl font-medium">{back}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
