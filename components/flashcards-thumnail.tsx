"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function FlashcardsThumbnail() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/flashcard/1"); // Replace with the actual route
  };

  return (
    <motion.div
      className="relative w-80 h-64 cursor-pointer"
      onClick={handleClick}
      // whileHover={{ scale: 1.02 }}
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
          {index === 0 &&
            "その科学者は、最初の実験結果を再現することができなかった"}
        </motion.div>
      ))}
    </motion.div>
  );
}
