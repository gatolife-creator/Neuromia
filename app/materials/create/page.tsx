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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { EditingFlashcardList } from "../../../components/editing-flashcard-list";
import { CardData } from "@/lib/interfaces";

export default function CreateMaterialPage() {
  const [cards, setCards] = useState<Array<CardData>>([]);
  const form = useForm();

  const onSubmit = () => {
    const { front, back } = form.getValues() as CardData;
    setCards([...cards, { front, back }]);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">新しい教材を作成する</h1>
      <Input placeholder="タイトルを入力してください"></Input>
      <Input placeholder="説明文を入力してください"></Input>
      <div className="my-10 bg-slate-100 border border-black rounded-lg p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormLabel className="text-2xl font-bold">
              カードを作成する
            </FormLabel>
            <FormField
              control={form.control}
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
              control={form.control}
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
      <EditingFlashcardList cards={cards} />
    </div>
  );
}
