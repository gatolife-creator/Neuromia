"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlashcardProps {
  front: string;
  back: string;
  isStudying?: boolean;
  onFlip?: (isFlipped: boolean) => void;
  className?: string;
}

export function Flashcard({
  front,
  back,
  onFlip,
  isStudying,
  className,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    if (onFlip) {
      onFlip(!isFlipped);
    }
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
        `relative h-64 w-full select-none perspective-distant lg:h-96 ${
          isStudying ? "cursor-pointer" : ""
        }`,
        className
      )}
      onClick={isStudying ? handleFlip : () => {}}
    >
      <motion.div
        className="preserve-3d relative h-full w-full transition-all duration-500 transform-3d"
        initial={{ opacity: 0 }}
        animate={{ rotateX: isFlipped ? 180 : 0, opacity: 1 }}
        transition={{ duration: 0.01 }}
      >
        {/* Front of card */}
        <div className="bg-card absolute flex h-full w-full items-center justify-center rounded-xl border p-6 shadow-md backface-hidden">
          <div className="text-center">
            <p className="text-2xl font-medium">{front}</p>
          </div>
        </div>

        {/* Back of card */}
        <div className="bg-card absolute flex h-full w-full [transform:rotateX(180deg)] items-center justify-center rounded-xl border p-6 shadow-md backface-hidden">
          <div className="text-center">
            <p className="text-2xl font-medium">{back}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
