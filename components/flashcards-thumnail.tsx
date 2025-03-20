"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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
      className="relative cursor-pointer"
      onClick={handleClick}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="w-full">
        <CardContent className="font-bold">{title}</CardContent>
      </Card>
    </motion.div>
  );
}
