import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";

interface TagInputProps {
  tags: string[];
  onSubmitTag: (tag: string) => void;
  onRemoveTagByIndex: (index: number) => void;
  className?: string;
}

export function TagInput({ ...props }: TagInputProps) {
  const { className, onSubmitTag, onRemoveTagByIndex, tags } = props;
  const [isFocused, setIsFocused] = useState(false);
  const form = useForm();

  const handleSubmit = () => {
    console.log("submit tag");
    const tag = (form.getValues("tag") as string).trim();
    if (!tag) {
      console.log("tag is empty");
      return;
    }
    form.setValue("tag", "");
    onSubmitTag(tag);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !form.getValues("tag")) {
      console.log("tag is deleted");
      onRemoveTagByIndex(tags.length - 1);
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
      className={`dark:bg-input/30 border-input md:text-sm" flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ${
        className && className
      } ${isFocused && "border-ring ring-ring/50 ring-[3px]"}`}
    >
      <AnimatePresence>
        <div className="flex items-center">
          {tags &&
            tags.map((tag, index) => (
              <motion.div
                layout
                key={tag}
                className="mx-1 flex items-center justify-between rounded-full bg-black px-2 text-white"
                initial={{ opacity: 1, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 1, scale: 0.9 }}
                transition={{ duration: 0.1 }}
              >
                <Button
                  size="icon"
                  className="my-auto mr-1 h-4 w-4"
                  onClick={() => onRemoveTagByIndex(index)}
                >
                  <X size={5} className="my-auto inline-block" />
                </Button>
                <div>{tag}</div>
              </motion.div>
            ))}
        </div>
      </AnimatePresence>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="my-auto inline-block flex-grow-1"
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
                    className="placeholder:text-muted-foreground bg-white focus:outline-0 md:text-sm"
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
