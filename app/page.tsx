"use client";

import Link from "next/link";
import { Book } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "../components/page-title";
import { useDatabase } from "@/hooks/use-database";
import { useEffect } from "react";

export default function Home() {
  const { getAllCards } = useDatabase();

  useEffect(() => {
    getAllCards((cards) => {
      const dueCards = cards.filter((card) => {
        return card.due <= new Date();
      });
      console.log(dueCards);
    });
  });

  return (
    <div>
      <PageTitle>ホーム</PageTitle>
      <div className="lg:grid grid-cols-3 p-4">
        <Link
          href="/materials"
          className="block w-full max-w-sm transition-transform"
        >
          <Card className="w-full overflow-hidden cursor-pointer pt-0">
            <div className="flex items-center justify-center w-full h-48 bg-muted">
              <Book className="w-16 h-16 text-muted-foreground" />
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
