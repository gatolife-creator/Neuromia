"use client";

import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { FormField, FormItem, FormControl, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { MaterialData } from "@/lib/interfaces";
import { useEffect } from "react";
import { TagInput } from "./tag-input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface EditingFlashcardFormProps {
  type: "create" | "edit";
  title?: string;
  description?: string;
  tags: string[];
  onMaterialCreationFormSubmit: (values: MaterialData) => void;
  onClickMaterialDelete: () => void;
  onSubmitTag: (tag: string) => void;
  onRemoveTagByIndex: (index: number) => void;
}

export function EditingFlashcardForm({ ...props }: EditingFlashcardFormProps) {
  const {
    onMaterialCreationFormSubmit,
    onClickMaterialDelete,
    onSubmitTag,
    onRemoveTagByIndex,
    tags,
  } = props;
  const materialCreationForm = useForm({
    defaultValues: {
      title: props.title,
      description: props.description,
      tags: props || ([] as string[]),
    },
  });

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
                  materialCreationForm.getValues() as unknown as MaterialData
                );
              }
            })}
            className="space-y-1 mx-auto"
          >
            <div className="flex justify-between items-center p-4">
              <div className="text-2xl font-bold">
                {props.type === "create" ? "新規作成" : "編集"}
              </div>
              <div>
                <Button type="submit" className="cursor-pointer mx-1">
                  {props.type === "create" ? "作成" : "更新"}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="cursor-pointer mx-1"
                    >
                      {props.type === "create" ? "取り消す" : "削除"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        本当に{props.type === "create" ? "取り消し" : "削除"}
                        しますか？
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        この操作は取り消すことができません。
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="cursor-pointer">
                        キャンセル
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="cursor-pointer bg-destructive hover:bg-destructive hover:opacity-80"
                        onClick={onClickMaterialDelete}
                      >
                        {props.type === "create" ? "取り消す" : "削除"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
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
                      className="bg-white resize-none"
                      onChange={onChangeDescription}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <TagInput
          className="mt-1 bg-white"
          tags={tags}
          onSubmitTag={onSubmitTag}
          onRemoveTagByIndex={onRemoveTagByIndex}
        />
      </div>
    </>
  );
}
