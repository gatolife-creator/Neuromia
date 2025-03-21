"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { EditingFlashcardList } from "../../../components/editing-flashcard-list";
import { CardData, MaterialMetaData } from "@/lib/interfaces";
import { materialDB } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { EditingFlashcardForm } from "../../../components/editing-flashcard-form";

export default function CreateMaterialPage() {
  const [cards, setCards] = useState<CardData[]>([]);
  const cardCreationForm = useForm();

  const onCardCreationFormSubmit = () => {
    const { front, back } = cardCreationForm.getValues() as CardData;
    setCards([...cards, { front, back }]);
  };

  const onClickDelete = (index: number) => {
    setCards(cards.filter((_, i) => i !== index));
    console.log(cards);
  };

  const onMaterialCreationFormSubmit = async (values: MaterialMetaData) => {
    const { title, description } = values;
    const id = uuidv4();
    materialDB.materials.add({
      id,
      title,
      description,
      serializedCards: JSON.stringify(cards),
    });
    console.log(await materialDB.materials.get({ id }));
  };

  return (
    <div>
      <EditingFlashcardForm
        onMaterialCreationFormSubmit={(values) => {
          onMaterialCreationFormSubmit(values);
        }}
      />
      
      <div className="my-10 bg-slate-100 border border-black rounded-lg p-4">
        <Form {...cardCreationForm}>
          <form
            onSubmit={cardCreationForm.handleSubmit(onCardCreationFormSubmit)}
          >
            <FormLabel className="text-2xl font-bold">
              カードを作成する
            </FormLabel>
            <FormField
              control={cardCreationForm.control}
              name="front"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="問題文を入力してください"
                      className="bg-white"
                      {...field}
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={cardCreationForm.control}
              name="back"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="答えを入力してください"
                      className="bg-white"
                      {...field}
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <Button type="submit" className="cursor-pointer">
              追加
            </Button>
          </form>
        </Form>
      </div>
      <EditingFlashcardList cards={cards} onClickDelete={onClickDelete} />
    </div>
  );
}
