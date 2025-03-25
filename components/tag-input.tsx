import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

interface TagInputProps {
  className?: string;
}

export function TagInput({ ...props }: TagInputProps) {
  const { className } = props;
  const [tags, setTags] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const form = useForm();

  const onSubmit = () => {
    const tag = (form.getValues("tag") as string).trim();
    if (!tag) {
      console.log("tag is empty");
      return;
    }
    setTags([...tags, tag]);
    form.setValue("tag", "");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && form.getValues("tag") === "") {
      setTags(tags.slice(0, tags.length - 1));
    }
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      className={`dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" ${
        className && className
      } ${isFocused && "border-ring ring-ring/50 ring-[3px]"}`}
    >
      <div className="flex items-center">
        {tags &&
          tags.map((tag) => (
            <div
              key={tag}
              className="inline-block bg-black text-white px-2 mx-1 rounded-full"
            >
              {tag}
            </div>
          ))}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="inline-block flex-grow-1 my-auto"
        >
          <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    placeholder="タグを入力してください"
                    {...field}
                    className="bg-white placeholder:text-muted-foreground focus:outline-0 md:text-sm"
                    onKeyDown={onKeyDown}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
