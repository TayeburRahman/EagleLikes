"use client";

import { Menu, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ThemeToggle } from "../ui/custom/theme-toggle";
import { useAuthContext } from "@/providers/auth-provider";

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const auth = useAuthContext();
  const user = auth?.user;
  const isLoading = auth?.initializing;

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-20 z-30 bg-background/80 backdrop-blur-xl border-b border-white/5">
      <div className="relative h-full flex items-center justify-between px-6">
        {/* Left side: mobile menu or spacer */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-10 w-10 text-white/70"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="hidden lg:block">
             <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest">Dashboard Overview</h2>
          </div>
        </div>

        {/* Right: notification + theme toggle + profile */}
        <div className="flex items-center space-x-3 md:space-x-5">
          {/* Theme toggle */}
          <ThemeToggle variant="ghost" size="icon" className="h-10 w-10 text-white/50 hover:text-white transition-colors" />

          {/* Notification icon */}
          <Link href="/notifications">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl h-10 w-10 text-white/50 hover:text-white transition-colors"
            >
              <Bell className="h-5 w-5" />
            </Button>
          </Link>

          <div className="flex items-center pl-4 border-l border-white/10 ml-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer group">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-10 w-10 rounded-xl bg-white/5" />
                      <div className="hidden lg:flex flex-col gap-1">
                        <Skeleton className="h-4 w-24 bg-white/5" />
                        <Skeleton className="h-3 w-16 bg-white/5" />
                      </div>
                    </>
                  ) : (
                    <>
                      <Avatar className="h-10 w-10 border border-white/10 shadow-lg group-hover:border-primary/50 transition-colors rounded-xl">
                        <AvatarImage src={user?.image} alt={user?.name} className="rounded-xl" />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold rounded-xl">
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden lg:flex flex-col text-left">
                        <p className="text-sm font-bold text-white leading-none">
                          {user?.name || "User"}
                        </p>
                        <p className="text-[10px] text-white/40 mt-1.5 uppercase tracking-tighter font-black">
                          {user?.role || "Member"}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-navy-card border-white/10 text-white" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-white/40">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild className="focus:bg-white/5 focus:text-white cursor-pointer rounded-lg mx-1 my-0.5">
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-white/5 focus:text-white cursor-pointer rounded-lg mx-1 my-0.5">
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem 
                  className="text-rose-500 focus:bg-rose-500/10 focus:text-rose-500 cursor-pointer rounded-lg mx-1 my-0.5 font-bold"
                  onClick={() => auth?.logout()}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
