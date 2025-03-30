"use client";

import { EditingFlashcardList } from "@/components/editing-flashcard-list";
import { MaterialData } from "@/lib/interfaces";
import React, { useEffect, useRef, useState } from "react";
import { EditingFlashcardForm } from "@/components/editing-flashcard-form";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDatabaseByMaterialId } from "@/hooks/use-database-by-material-id";

export default function EditMaterialPage({
  params,
}: {
  params: Promise<{ materialId: string }>;
}) {
  const [materialId, setMaterialId] = useState("");
  const {
    tags,
    cards,
    material,
    addTag,
    removeTag,
    setCards,
    editFrontSideOfCard,
    editBackSideOfCard,
    addCard,
    updateMaterial,
    deleteMaterial,
    getAllData,
  } = useDatabaseByMaterialId(materialId);

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

  const exportCardData = () => {
    getAllData((material: MaterialData) => {
      const blob = new Blob([JSON.stringify(material)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${material.title}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
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
        title={material?.title}
        description={material?.description}
        tags={tags}
        onMaterialCreationFormSubmit={onMaterialCreationFormSubmit}
        onClickMaterialDelete={onClickMaterialDelete}
        onSubmitTag={addTag}
        onRemoveTagByIndex={(index: number) => removeTag(index)}
        exportCardData={exportCardData}
      />
      <EditingFlashcardList
        cards={cards}
        onClickDelete={onClickDelete}
        onChangeFrontInput={editFrontSideOfCard}
        onChangeBackInput={editBackSideOfCard}
        onClickCardAddition={addCard}
      />
    </>
  );
}
