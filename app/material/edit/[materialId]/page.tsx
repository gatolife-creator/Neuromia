"use client";

import { EditingFlashcardList } from "@/components/editing-flashcard-list";
import { MaterialData } from "@/lib/interfaces";
import React, { useEffect, useRef, useState } from "react";
import { EditingFlashcardForm } from "../../../../components/editing-flashcard-form";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useMaterial } from "@/hooks/use-material";
import { useTags } from "@/hooks/use-tags";
import { useCards } from "@/hooks/use-cards";
import { useDatabase } from "@/hooks/use-database";

export default function EditMaterialPage({
  params,
}: {
  params: Promise<{ materialId: string }>;
}) {
  const [materialId, setMaterialId] = useState("");
  const { material } = useMaterial(materialId);
  const { tags, setTags } = useTags(materialId);
  const { cards, setCards } = useCards(materialId);
  const { updateMaterial, deleteMaterial } = useDatabase(materialId);

  const router = useRouter();
  const prevCardsLength = useRef(cards.length);

  const onClickDelete = (index: number) => {
    setCards((prevCards) => prevCards.filter((_, i) => i !== index));
  };

  const onMaterialCreationFormSubmit = async (values: MaterialData) => {
    const { title, description } = values;
    if (!title) {
      toast(
        <div className="flex items-center">
          <CheckCircle color="red" className="mr-2" />
          <div>タイトルを入力してください</div>
        </div>
      );
    }

    updateMaterial(title, description, tags, cards, () => {
      toast(
        <div className="flex items-center">
          <CheckCircle color="green" className="mr-2" />
          <div>教材が更新されました</div>
        </div>,
        {
          action: {
            label: "取り消す",
            onClick: () => console.log("取り消す"),
          },
        }
      );
      router.push("/materials");
    });
  };

  const onClickMaterialDelete = async () => {
    deleteMaterial(() => {
      toast(
        <div className="flex items-center">
          <CheckCircle color="green" className="mr-2" />
          <div>教材が削除されました</div>
        </div>
      );
      router.push("/materials");
    });
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

  const onSubmitTag = (tag: string) => {
    setTags([...(tags || []), tag]);
  };

  const onRemoveTag = () => {
    setTags((prevTags) => prevTags.slice(0, -1));
  };

  useEffect(() => {
    (async () => {
      const { materialId } = await params;
      setMaterialId(materialId);
    })();
  }, [params]);

  useEffect(() => {
    if (cards.length > prevCardsLength.current) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
    prevCardsLength.current = cards.length;
  }, [cards]);

  return (
    <>
      <EditingFlashcardForm
        type="edit"
        title={material.title}
        description={material.description}
        tags={tags}
        onMaterialCreationFormSubmit={onMaterialCreationFormSubmit}
        onClickMaterialDelete={onClickMaterialDelete}
        onSubmitTag={onSubmitTag}
        onRemoveTag={onRemoveTag}
      />
      <EditingFlashcardList
        cards={cards}
        onClickDelete={onClickDelete}
        onChangeFrontInput={onChangeFrontInput}
        onChangeBackInput={onChangeBackInput}
        onClickCardAddition={onClickCardAddition}
      />
    </>
  );
}
