"use client";

import { Search, Bell } from 'lucide-react';

export function CRMHeader() {
  return (
    <header className="bg-white/80 backdrop-blur-md h-16 border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="md:hidden font-bold text-lg text-slate-800">CRM Nexus</div>
      
      <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-2 w-96 border border-transparent focus-within:border-blue-400 focus-within:bg-white transition-all">
        <Search size={18} className="text-slate-400 mr-2" />
        <input 
          type="text" 
          placeholder="Buscar contratos, clientes..." 
          className="bg-transparent border-none outline-none text-sm w-full placeholder-slate-400 text-slate-700"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </header>
  );
}
