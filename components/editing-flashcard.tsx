import { Textarea } from "./ui/textarea";

interface EditingFlashcardProps {
  front: string;
  back: string;
  index: number;
}

export function EditingFlashcard({ ...props }: EditingFlashcardProps) {
  const { front, back, index } = props;
  return (
    <div className="bg-slate-100">
      <div className="bg-gray-500 text-2xl">{index}</div>
      <div className="grid grid-cols-2 gap-4 my-5 ">
        <Textarea
          className="inline-block resize-none"
          placeholder="問題文を入力してください"
        >
          {front}
        </Textarea>
        <Textarea
          className="inline-block resize-none"
          placeholder="答えを入力してください"
        >
          {back}
        </Textarea>
      </div>
    </div>
  );
}
