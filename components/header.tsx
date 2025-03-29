import Link from "next/link";
import Image from "next/image";
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
    <header className="bg-background fixed top-0 z-40 w-full border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              className="dark:invert"
              src="/neuromia.svg"
              alt="Next.js logo"
              width={48}
              height={48}
              priority
            />
            {/* <span className="text-xl font-bold">Neuromia</span> */}
          </Link>
        </div>
        <div className="flex gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger className="h-[32px] w-[32px] cursor-pointer rounded-sm bg-black">
              <Plus
                color="white"
                width={"80%"}
                height={"80%"}
                className="mx-auto"
              />
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
