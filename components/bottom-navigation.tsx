import Link from "next/link";
import { Book, Home, UserRound, Settings } from "lucide-react";

export function BottomNavigation() {
  return (
    <div className="bg-primary fixed right-0 bottom-0 grid h-14 w-full grid-cols-4 border-t sm:hidden">
      <Link href="/" className="bg-white">
        <Home className="mx-auto h-8" fontSize="32px" />
        <div className="h-6 w-full text-center text-xs">ホーム</div>
      </Link>
      <Link href="/materials" className="bg-white">
        <Book className="mx-auto h-8" fontSize="32px" />
        <div className="h-6 w-full text-center text-xs">教材一覧</div>
      </Link>
      <Link href="/groups" className="bg-white">
        <UserRound className="mx-auto h-8" fontSize="32px" />
        <div className="h-6 w-full text-center text-xs">グループ</div>
      </Link>
      <Link href="/settings" className="bg-white">
        <Settings className="mx-auto h-8" fontSize="32px" />
        <div className="h-6 w-full text-center text-xs">設定</div>
      </Link>
    </div>
  );
}
