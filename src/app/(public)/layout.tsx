'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoreSidebar from "@/components/StoreSidebar";
import { useState } from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile Sidebar - Only visible when toggled */}
      <div className="lg:hidden">
        <StoreSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onToggleSidebar={toggleSidebar} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
} 