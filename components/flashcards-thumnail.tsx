"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface FlashcardsThumbnailProps {
  id: string;
  title: string;
}

export function FlashcardsThumbnail({ ...props }: FlashcardsThumbnailProps) {
  const router = useRouter();
  const { id, title } = props;

  const handleClick = () => {
    router.push(`/material/${id}`); // Replace with the actual route
  };

  return (
    <motion.div
      className="relative w-80 h-64 cursor-pointer"
      onClick={handleClick}
      whileTap={{ scale: 0.98 }}
    >
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-full h-full bg-slate-200 rounded-xl shadow-[0px_-2px_7px_-3px_rgba(0,_0,_0,_0.1)] border-black flex items-center justify-center text-2xl p-4"
          style={{ top: -index * 15, zIndex: 3 - index, scale: 0.95 ** index }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {index === 0 && `${title}`}
        </motion.div>
      ))}
    </motion.div>
  );
}
