import { Home, Book, UsersRound, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// Navigation items with icons
const navigationItems = [
  {
    title: "ホーム",
    icon: Home,
    href: "/home",
  },
  {
    title: "教材一覧",
    icon: Book,
    href: "/materials",
  },
  {
    title: "グループ",
    icon: UsersRound,
    href: "/groups",
  },
  {
    title: "設定",
    icon: Settings,
    href: "/settings",
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r">
      <SidebarContent className="hidden sm:block">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="py-8">
                    <a href={item.href}>
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span className="font-bold">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
