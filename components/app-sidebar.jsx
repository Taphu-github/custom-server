"use client";

import * as React from "react";
import {
  ChevronsUpDown,
  LogOut,
  Home,
  Smartphone,
  User,
  Users,
  Squirrel,
  Radio,
  PawPrint,
  Blocks,
  ChartBarStacked,
  ChevronRight,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import logo from "@/app/AIDS_logo.png";

const navItems = [
  { name: "Home", icon: Home, href: "/dashboard" },
  { name: "Device", icon: Smartphone, href: "/dashboard/device" },
  {
    name: "Inventory",
    icon: Blocks,
    href: "/dashboard/item,/dashboard/item-category",
    items: [
      { name: "Items", icon: Blocks, href: "/dashboard/item" },
      {
        name: "Item Category",
        icon: ChartBarStacked,
        href: "/dashboard/item-category",
      },
    ],
  },

  { name: "Owner", icon: User, href: "/dashboard/owner" },
  { name: "User", icon: Users, href: "/dashboard/user" },
  {
    name: "Detected Animal",
    icon: PawPrint,
    href: "/dashboard/detected-animal",
  },
  {
    name: "Animal Category",
    icon: Squirrel,
    href: "/dashboard/animal-category",
  },
  { name: "MQTT Credentials", icon: Radio, href: "/dashboard/mqtt-credit" },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  // State to hold user data
  const [user, setUser] = React.useState({ name: "", email: "" });

  // Fetch user data from localStorage on mount
  React.useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser({
        name: parsedUser.name,
        email: parsedUser.email,
      });
    }
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("user"); // Remove user data
    router.push("/login"); // Redirect to login
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-primary-foreground">
                    <Image src={logo} width={200} height={200} alt="logo" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <p className="truncate font-bold text-xl">
                      D<span className="text-[#5ebea3]">A</span>
                      KZ
                      <span className="text-[#5ebea3]">I</span>N
                    </p>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = item.href.includes(pathname);

              if (item.name !== "Inventory") {
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      className={
                        pathname === item.href ? "bg-muted text-primary" : ""
                      }
                    >
                      <a href={item.href} className="flex items-center gap-2">
                        {item.icon && <item.icon />}
                        <span>{item.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              } else {
                return (
                  <Collapsible
                    key={item.name}
                    asChild
                    defaultOpen={isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.name}>
                          {item.icon && <item.icon />}
                          <span>{item.name}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.name}>
                              <SidebarMenuSubButton
                                asChild
                                className={
                                  pathname === subItem.href
                                    ? "bg-muted text-primary"
                                    : ""
                                }
                              >
                                <a href={subItem.href}>
                                  <span>{subItem.name}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              }
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg text-white bg-slate-300 font-bold">
                      {user.name ? user.name[0] + user.name[1] : "NA"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user.name || "Guest"}
                    </span>
                    <span className="truncate text-xs">
                      {user.email || "guest@example.com"}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg">
                        {user.name ? user.name[0] + user.name[1] : "NA"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user.name || "Guest"}
                      </span>
                      <span className="truncate text-xs">
                        {user.email || "guest@example.com"}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
