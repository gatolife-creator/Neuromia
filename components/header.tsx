import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ThemeToggle } from "@/components/theme-toggle";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="bg-background fixed top-0 z-40 w-full border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/home" className="flex items-center gap-2">
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
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
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
                <Button
                  className="w-full cursor-pointer"
                  onClick={() => {
                    router.push("/materials/create");
                    setIsOpen(false);
                  }}
                >
                  新しい教材を作成
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  className="w-full cursor-pointer"
                  onClick={() => {
                    router.push("#");
                    setIsOpen(false);
                  }}
                >
                  新しグループを作成
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          {/* <Avatar>
            <AvatarImage src="#" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar> */}
        </div>
      </div>
    </header>
  );
}
