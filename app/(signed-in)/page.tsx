"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PageTitle } from "@/components/page-title";
import { useDatabase } from "@/hooks/use-database";
import { useEffect, useState } from "react";
import { CardDataWithMaterialId } from "@/lib/interfaces";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const { getAllCards } = useDatabase();
  const [dueCards, setDueCards] = useState<CardDataWithMaterialId[]>([]);
  const router = useRouter();

  useEffect(() => {
    getAllCards((cards) => {
      const dueCards = cards.filter((card) => {
        return card.due <= new Date();
      });
      setDueCards(dueCards);
    });
  });

  return (
    <div>
      <PageTitle>ホーム</PageTitle>
      <div className="grid-cols-3 gap-2 space-y-2 p-4 lg:grid">
        {dueCards.length > 0 && (
          <motion.div
            className={`relative cursor-pointer`}
            whileTap={{ scale: 0.995 }}
          >
            <Card
              className="w-full"
              onClick={() => router.push("/special-material")}
            >
              <CardContent className="flex items-center justify-between">
                <div className="inline-block font-bold">
                  忘却曲線に基づいた教材
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        <motion.div
          className={`relative cursor-pointer`}
          whileTap={{ scale: 0.995 }}
        >
          <Card className="w-full" onClick={() => router.push("/materials")}>
            <CardContent className="flex items-center justify-between">
              <div className="inline-block font-bold">教材一覧</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
