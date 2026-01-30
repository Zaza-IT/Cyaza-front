"use client";

import React from "react"

import Link from "next/link";

interface SidebarItemProps {
  icon: React.ComponentType<{ size: number }>;
  label: string;
  active?: boolean;
  href?: string;
}

export function SidebarItem({ icon: Icon, label, active = false, href = "#" }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-r-full mr-2
        ${active 
          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent'
        }`}
    >
      <Icon size={20} />
      {label}
    </Link>
  );
}
