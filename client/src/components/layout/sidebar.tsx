"use client";

import {
  LayoutGrid,
  Settings,
  Shield,
  LogOut,
  LucideIcon,
  User,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/providers/auth-provider";
import { useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface NavItem {
  name: string;
  icon: LucideIcon;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Overview", icon: LayoutGrid, href: "/dashboard" },
  { name: "My Orders", icon: ShoppingBag, href: "/orders" },
  { name: "Profile", icon: User, href: "/profile" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}) => {
  const pathname = usePathname();
  const auth = useAuthContext();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname, setIsSidebarOpen]);

  const handleLogout = async () => {
    await auth?.logout();
    window.location.href = "/auth/login";
  };

  const getInitials = (name: string) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-40 h-screen bg-sidebar w-64 transition-transform duration-300 ease-in-out transform flex flex-col border-r",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0"
      )}
    >
      {/* Brand */}
      <div className="flex flex-col items-start justify-center pl-6 border-b h-20 bg-navy-card/50">
        <div className="flex items-center gap-3 w-full pr-6 h-10 relative">
          <Image
            src="/eagle-logo.png"
            alt="Eagle Likes Logo"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-[9px] text-primary font-bold uppercase tracking-[0.2em] ml-0.5 mt-1">
          DASHBOARD
        </p>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href + "/"));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group",
                  isActive
                    ? "bg-primary/10 text-primary shadow-[0_0_15px_rgba(0,229,255,0.1)] border border-primary/20"
                    : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                )}
              >
                <item.icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform group-hover:scale-110",
                    isActive ? "text-primary" : "text-white/40 group-hover:text-white/70"
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* User profile + logout */}
      <div className="border-t p-4 space-y-3 bg-navy-card/30">
        {auth?.user && (
          <div className="flex items-center gap-3 px-2 py-1">
            <Avatar className="h-9 w-9 border border-white/10 shadow-lg">
              <AvatarFallback className="text-xs bg-primary/10 text-primary font-bold">
                {getInitials(auth.user.name || auth.user.email)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold truncate text-white">
                {auth.user.name || "User"}
              </p>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-tight">
                {auth.user.role || "Member"}
              </p>
            </div>
          </div>
        )}
        <Button
          variant="outline"
          className="w-full justify-start gap-3 text-xs font-bold tracking-widest border-white/10 hover:bg-white/5 hover:text-white text-white/60 rounded-xl py-5"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          LOGOUT
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
