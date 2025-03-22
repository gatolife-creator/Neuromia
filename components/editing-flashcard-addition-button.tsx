import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";

interface EditingFlashcardAdditionButtonProps {
  onClickCardAddition: () => void;
}

export function EditingFlashcardAdditionButton({
  ...props
}: EditingFlashcardAdditionButtonProps) {
  const { onClickCardAddition } = props;

  return (
    <motion.div
      className={"relative cursor-pointer"}
      whileTap={{ scale: 0.995 }}
    >
      <Card className="cursor-pointer" onClick={onClickCardAddition}>
        <CardContent className="text-center font-bold">
          フラッシュカードを追加する
        </CardContent>
      </Card>
    </motion.div>
  );
}
