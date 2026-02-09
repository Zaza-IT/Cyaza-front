"use client";

import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Filter, 
  DollarSign, 
  Package, 
  ChevronDown,
  UserPlus,
  Bot
} from 'lucide-react';
import { SidebarItem } from './sidebar-item';

export function CRMSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex-col hidden md:flex z-10 shadow-sm">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
          <span className="text-white font-bold text-lg">C</span>
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-800">CRM Nexus</span>
      </div>

      <nav className="flex-1 mt-6 space-y-1">
        <SidebarItem 
          icon={LayoutDashboard} 
          label="Dashboard" 
          active={pathname === '/dashboard'} 
          href="/dashboard"
        />
<SidebarItem 
          icon={Filter} 
          label="Pipeline de Vendas" 
          active={pathname === '/pipeline'} 
          href="/pipeline"
        />
        <SidebarItem 
          icon={UserPlus} 
          label="Leads" 
          active={pathname === '/leads'} 
          href="/leads"
        />
        <SidebarItem 
          icon={Bot}
          label="Automações" 
          active={pathname === '/automations'} 
          href="/automations"
        />
        <SidebarItem icon={FileText} label="Gestão de Contratos" href="#" />
        <SidebarItem icon={Users} label="Clientes" href="#" />
        <SidebarItem icon={DollarSign} label="Financeiro" href="#" />
        <SidebarItem icon={Package} label="Estoque" href="#" />
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            alt="User" 
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm bg-slate-100"
          />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold text-slate-700 truncate">Carlos Mendes</p>
            <p className="text-xs text-slate-500 truncate">Head de Vendas</p>
          </div>
          <ChevronDown size={16} className="text-slate-400" />
        </div>
      </div>
    </aside>
  );
}
