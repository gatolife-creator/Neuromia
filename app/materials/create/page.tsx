"use client";

import React, { useEffect, useRef, useState } from "react";
import { EditingFlashcardList } from "../../../components/editing-flashcard-list";
import { CardData, MaterialMetaData } from "@/lib/interfaces";
import { materialDB } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { EditingFlashcardForm } from "../../../components/editing-flashcard-form";
import { toast } from "sonner";
import { CheckCircle, XOctagon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateMaterialPage() {
  const [cards, setCards] = useState<CardData[]>([]);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const prevCardsLength = useRef(cards.length);

  const onClickDelete = (index: number) => {
    setCards((prevCards) => prevCards.filter((_, i) => i !== index));
    console.log(cards);
  };

  const onMaterialCreationFormSubmit = async (values: MaterialMetaData) => {
    const { title, description } = values;
    const id = uuidv4();

    if (!title) {
      toast(
        <div className="flex items-center">
          <XOctagon color="red" className="mr-2" />
          <div>タイトルを入力してください</div>
        </div>
      );
      return;
    }

    const formattedCards = cards
      .map((card) => ({
        front: card.front.trimEnd(),
        back: card.back.trimEnd(),
      }))
      .filter((card) => card.front && card.back);

    if (!formattedCards.length) {
      toast(
        <div className="flex items-center">
          <XOctagon color="red" className="mr-2" />
          <div>少なくとも1つのカードを作成してください</div>
        </div>
      );
      return;
    }

    materialDB.materials.add({
      id,
      title,
      description,
      serializedCards: JSON.stringify(formattedCards),
    });

    toast(
      <div className="flex items-center">
        <CheckCircle color="green" className="mr-2" />
        <div>教材が作成されました</div>
      </div>,
      {
        action: {
          label: "取り消す",
          onClick: () => console.log("取り消す"),
        },
      }
    );

    router.push("/materials");
  };

  const onClickMaterialDelete = () => {
    router.push("/materials");
  };

  const onChangeFrontInput = (index: number, front: string) => {
    setCards((prevCards) =>
      prevCards.map((card, i) => (i === index ? { ...card, front } : card))
    );
  };

  const onChangeBackInput = (index: number, back: string) => {
    setCards((prevCards) =>
      prevCards.map((card, i) => (i === index ? { ...card, back } : card))
    );
  };

  const onClickCardAddition = () => {
    setCards([...cards, { id: uuidv4(), front: "", back: "" }]);
  };

  useEffect(() => {
    if (ref.current && cards.length > prevCardsLength.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
    prevCardsLength.current = cards.length;
  }, [cards]);

  return (
    <div>
      <EditingFlashcardForm
        type="create"
        onMaterialCreationFormSubmit={onMaterialCreationFormSubmit}
        onClickMaterialDelete={onClickMaterialDelete}
      />

      <EditingFlashcardList
        cards={cards}
        onClickDelete={onClickDelete}
        onChangeFrontInput={onChangeFrontInput}
        onChangeBackInput={onChangeBackInput}
        onClickCardAddition={onClickCardAddition}
      />
      <div ref={ref}></div>
    </div>
  );
}
