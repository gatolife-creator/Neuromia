import { Card, CardContent } from "./ui/card";

interface EditingFlashcardAdditionButtonProps {
  onClickCardAddition: () => void;
}

export function EditingFlashcardAdditionButton({
  ...props
}: EditingFlashcardAdditionButtonProps) {
  const { onClickCardAddition } = props;
  return (
    <Card className="cursor-pointer" onClick={onClickCardAddition}>
      <CardContent className="text-center font-bold">
        フラッシュカードを追加する
      </CardContent>
    </Card>
  );
}
