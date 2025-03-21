import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Trash2 } from "lucide-react";

interface EditingFlashcardProps {
  front: string;
  back: string;
  index: number;
  onClickDelete: () => void;
}

export function EditingFlashcard({ ...props }: EditingFlashcardProps) {
  const { front, back, index, onClickDelete } = props;

  return (
    <Card className="w-full my-5">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div>{index}</div>
          <Button
            className="cursor-pointer"
            variant="destructive"
            onClick={onClickDelete}
          >
            <Trash2 />
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4">
        <Textarea
          className="w-full"
          placeholder="問題文を入力してください"
          defaultValue={front}
        />
        <Textarea
          className="w-full"
          placeholder="答えを入力してください"
          defaultValue={back}
        />
      </CardContent>
    </Card>
  );
}
