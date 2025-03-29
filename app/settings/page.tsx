"use client";

import { PageTitle } from "@/components/page-title";
import { Toggle } from "../../components/toggle-button";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDatabase } from "@/hooks/use-database";

export default function Settings() {
  const { deleteAllData } = useDatabase();
  return (
    <div>
      <PageTitle>設定</PageTitle>
      <div className="space-y-5 p-4">
        <div className="flex">
          リマインダー
          <Toggle />
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="mx-1 cursor-pointer">
              初期化
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>本当に初期化しますか？</AlertDialogTitle>
              <AlertDialogDescription>
                この操作は取り消すことができません。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">
                キャンセル
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive hover:bg-destructive cursor-pointer hover:opacity-80"
                onClick={deleteAllData}
              >
                初期化する
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
