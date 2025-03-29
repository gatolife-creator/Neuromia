import Link from "next/link";
import { Book, Home, UserRound, Settings, PlusCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";

export function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="fixed right-0 bottom-0 grid h-14 w-full grid-cols-5 gap-3 border-t bg-white sm:hidden">
      <Link
        href="/"
        className={`rounded-md ${pathname === "/" ? "bg-muted" : "bg-white"}`}
      >
        <Home className="mx-auto h-8" fontSize="32px" />
        <div className="h-6 w-full text-center text-xs">ホーム</div>
      </Link>
      <Link
        href="/materials"
        className={`rounded-md ${pathname === "/materials" ? "bg-muted" : "bg-white"}`}
      >
        <Book className="mx-auto h-8" fontSize="32px" />
        <div className="h-6 w-full text-center text-xs">教材一覧</div>
      </Link>
      <Sheet>
        <SheetTrigger>
          <PlusCircle className="mx-auto h-8" fontSize="32px" />
          <div className="h-6 w-full text-center text-xs">追加</div>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]" side="bottom">
          <SheetHeader>
          </SheetHeader>
          <div className="mx-auto min-h-[100px] w-4/5 space-y-1">
            <Button
              className="w-full cursor-pointer"
              onClick={() => {
                router.push("/materials/create");
              }}
            >
              新しい教材を作成する
            </Button>
            <Button
              className="w-full cursor-pointer"
              onClick={() => {
                router.push("#");
              }}
            >
              新しいグループを作成する
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <Link
        href="/groups"
        className={`rounded-md ${pathname === "/groups" ? "bg-muted" : "bg-white"}`}
      >
        <UserRound className="mx-auto h-8" fontSize="32px" />
        <div className="h-6 w-full text-center text-xs">グループ</div>
      </Link>
      <Link
        href="/settings"
        className={`rounded-md ${pathname === "/settings" ? "bg-muted" : "bg-white"}`}
      >
        <Settings className="mx-auto h-8" fontSize="32px" />
        <div className="h-6 w-full text-center text-xs">設定</div>
      </Link>
    </div>
  );
}
