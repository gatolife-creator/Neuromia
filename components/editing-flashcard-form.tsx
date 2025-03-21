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
import { MaterialData } from "@/lib/interfaces";

interface EditingFlashcardFormProps {
  onMaterialCreationFormSubmit: (values: MaterialData) => void;
}

export function EditingFlashcardForm({ ...props }: EditingFlashcardFormProps) {
  const { onMaterialCreationFormSubmit } = props;
  const materialCreationForm = useForm();

  return (
    <Form {...materialCreationForm}>
      <form
        onSubmit={materialCreationForm.handleSubmit(() => {
          onMaterialCreationFormSubmit(
            materialCreationForm.getValues() as MaterialData
          );
        })}
      >
        <FormLabel className="text-2xl font-bold">
          新しい教材を作成する
        </FormLabel>
        <FormField
          control={materialCreationForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="タイトルを入力してください"
                  {...field}
                ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={materialCreationForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="説明文を入力してください"
                  {...field}
                ></Textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <Button type="submit" className="cursor-pointer">
          作成
        </Button>
      </form>
    </Form>
  );
}
