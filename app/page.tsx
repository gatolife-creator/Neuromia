"use client";

import Link from "next/link";
import { Book } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "../components/page-title";
import { useDatabase } from "@/hooks/use-database";
import { useEffect, useState } from "react";
import { CardDataWithMaterialId } from "@/lib/interfaces";

export default function Home() {
  const { getAllCards } = useDatabase();
  const [dueCards, setDueCards] = useState<CardDataWithMaterialId[]>([]);

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
          <Link
            href="/special-material"
            className="block w-full max-w-sm transition-transform"
          >
            <Card className="w-full cursor-pointer overflow-hidden pt-0">
              <div className="bg-muted flex h-48 w-full items-center justify-center">
                <Book className="text-muted-foreground h-16 w-16" />
              </div>
              <CardHeader>
                <CardTitle>忘却曲線に基づいた教材</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        )}
        <Link
          href="/materials"
          className="block w-full max-w-sm transition-transform"
        >
          <Card className="w-full cursor-pointer overflow-hidden pt-0">
            <div className="bg-muted flex h-48 w-full items-center justify-center">
              <Book className="text-muted-foreground h-16 w-16" />
            </div>
            <CardHeader>
              <CardTitle>教材一覧</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
