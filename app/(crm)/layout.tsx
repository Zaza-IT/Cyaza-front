import React from "react"
import { CRMSidebar } from '@/components/crm/sidebar';
import { CRMHeader } from '@/components/crm/header';

export default function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#F4F6F8] font-sans text-slate-900 overflow-hidden">
      <CRMSidebar />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <CRMHeader />
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
