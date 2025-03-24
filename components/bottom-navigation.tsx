import Link from "next/link";
import { Book, Home, UserRound, Settings } from "lucide-react";

export function BottomNavigation() {
  return (
    <div className="fixed bottom-0 right-0 bg-primary w-full h-14 grid grid-cols-4 sm:hidden border-t">
      <Link href="/" className="bg-white">
        <Home className="mx-auto h-8" fontSize="32px" />
        <div className="w-full text-center text-xs h-6">ホーム</div>
      </Link>
      <Link href="/materials" className="bg-white">
        <Book className="mx-auto h-8" fontSize="32px" />
        <div className="w-full text-center text-xs h-6">教材一覧</div>
      </Link>
      <Link href="/groups" className="bg-white">
        <UserRound className="mx-auto h-8" fontSize="32px" />
        <div className="w-full text-center text-xs h-6">グループ</div>
      </Link>
      <Link href="/settings" className="bg-white">
        <Settings className="mx-auto h-8" fontSize="32px" />
        <div className="w-full text-center text-xs h-6">設定</div>
      </Link>
    </div>
  );
}
