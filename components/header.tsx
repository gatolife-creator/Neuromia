import Link from "next/link";

import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Plus } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">My App</span>
          </Link>
        </div>
        <div className="flex gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer w-[32px] h-[32px] bg-black rounded-sm">
              <Plus color="white" width={"80%"} height={"80%"} className="mx-auto"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href={"/materials/create"}>新しい学習リストを作成</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>新しグループを作成</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Avatar>
            <AvatarImage src="#" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
