"use client";

import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Edit, Trash2 } from "lucide-react";

interface EditingFlashcardProps {
  front: string;
  back: string;
  index: number;
  onClickDelete: (index: number) => void;
  onClickEdit: (index: number) => void;
}

export function EditingFlashcard({ ...props }: EditingFlashcardProps) {
  const { front, back, index, onClickDelete } = props;

  return (
    <Card className="w-full my-5">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div>{index}</div>
          <div>
            <Button
              className="cursor-pointer mx-1"
              size="icon"
              onClick={() => {
                props.onClickEdit(index - 1);
              }}
            >
              <Edit />
            </Button>
            <Button
              className="cursor-pointer mx-1"
              size="icon"
              variant="destructive"
              onClick={() => {
                onClickDelete(index - 1);
              }}
            >
              <Trash2 />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4">
        <div className="w-full">{front}</div>
        <div className="w-full">{back}</div>
      </CardContent>
    </Card>
  );
}
