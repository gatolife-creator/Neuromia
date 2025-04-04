"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Edit } from "lucide-react";
import { Button } from "./ui/button";

interface FlashcardsThumbnailProps {
  id: string;
  title: string;
  tags: string[];
  className?: string;
}

export function FlashcardsThumbnail({ ...props }: FlashcardsThumbnailProps) {
  const router = useRouter();
  const { id, title, tags, className } = props;

  const handleClickForLearning = () => {
    router.push(`/material/${id}`);
  };

  const handleClickForEditing = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/material/edit/${id}`);
  };

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      whileTap={{ scale: 0.995 }}
    >
      <Card className="w-full" onClick={handleClickForLearning}>
        <CardContent className="flex items-center justify-between">
          <div className="inline-block font-bold">
            {title}
            {tags.map((tag, index) => {
              return (
                <span
                  key={index}
                  className="ml-1 rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-400"
                >
                  #{tag}
                </span>
              );
            })}
          </div>
          <Button className="cursor-pointer" onClick={handleClickForEditing}>
            編集する
            <Edit />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
