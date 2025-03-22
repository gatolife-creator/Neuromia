"use client";

import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import {
  FormLabel,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { CardData, MaterialData } from "@/lib/interfaces";
import { useEffect } from "react";

interface EditingFlashcardFormProps {
  type: "create" | "edit";
  title?: string;
  description?: string;
  onCardCreationFormSubmit: (values: CardData) => void;
  onMaterialCreationFormSubmit: (values: MaterialData) => void;
}

export function EditingFlashcardForm({ ...props }: EditingFlashcardFormProps) {
  const { onCardCreationFormSubmit, onMaterialCreationFormSubmit } = props;
  const materialCreationForm = useForm({
    defaultValues: { title: props.title, description: props.description },
  });
  const cardCreationForm = useForm({ defaultValues: { front: "", back: "" } });

  useEffect(() => {
    materialCreationForm.setValue("title", props.title);
    materialCreationForm.setValue("description", props.description);
  }, [props.title, props.description]);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    materialCreationForm.setValue("title", title);
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value;
    materialCreationForm.setValue("description", description);
  };

  return (
    <>
      <div className="bg-[#FAFAFA] p-4">
        <Form {...materialCreationForm}>
          <form
            onSubmit={materialCreationForm.handleSubmit(() => {
              if (onMaterialCreationFormSubmit) {
                onMaterialCreationFormSubmit(
                  materialCreationForm.getValues() as MaterialData
                );
              }
            })}
            className="space-y-4 mx-auto"
          >
            <div className="flex justify-between items-center p-4">
              <div className="text-2xl font-bold">
                {props.type === "create" ? "新規作成" : "編集"}
              </div>
              <Button type="submit" className="cursor-pointer">
                {props.type === "create" ? "作成" : "更新"}
              </Button>
            </div>
            <FormField
              control={materialCreationForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="タイトルを入力してください"
                      {...field}
                      className="bg-white"
                      onChange={onChangeTitle}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={materialCreationForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="説明文を入力してください"
                      {...field}
                      className="bg-white"
                      onChange={onChangeDescription}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </form>
        </Form>
      </div>
      <div className="my-10 bg-slate-100 border border-black rounded-lg p-4">
        <Form {...cardCreationForm}>
          <form
            onSubmit={cardCreationForm.handleSubmit(() => {
              if (onCardCreationFormSubmit) {
                onCardCreationFormSubmit(
                  cardCreationForm.getValues() as CardData
                );
              }
            })}
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
                    />
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
                    />
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
    </>
  );
}
