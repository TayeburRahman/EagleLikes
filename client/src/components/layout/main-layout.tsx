"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { ScrollArea } from "@/components/ui/scroll-area";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background grid-bg selection:bg-primary/20">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative lg:pl-64 h-screen overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-hidden pt-20">
          <ScrollArea className="h-full">
            <div className="p-6 lg:p-8">
              {children}
            </div>
          </ScrollArea>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-navy-dark/60 z-30 lg:hidden backdrop-blur-md transition-all duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;
