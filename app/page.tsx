/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Filter, 
  DollarSign, 
  Package, 
  MoreVertical, 
  Search, 
  Bell, 
  ChevronDown,
  TrendingUp,
  Briefcase,
  CheckCircle2,
  Clock,
  Calendar,
  Trophy,
  ListFilter,
  ArrowRight
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

// --- MOCK DATA ---

const chartData = [
  { name: 'Sem 1', contratos: 4, valor: 2400 },
  { name: 'Sem 2', contratos: 7, valor: 4500 },
  { name: 'Sem 3', contratos: 5, valor: 3200 },
  { name: 'Sem 4', contratos: 12, valor: 8900 },
];

const rankingData = [
  { name: 'Consultoria Estratégica', valor: 450000 },
  { name: 'Implementação de ERP', valor: 320000 },
  { name: 'Treinamento Corporativo', valor: 180000 },
  { name: 'Auditoria Fiscal', valor: 120000 },
];

const initialKanbanData = {
  received: {
    title: 'Lead Recebido',
    color: 'border-l-blue-500',
    items: [
      { id: 1, title: 'TechSolutions Ltda', type: 'Lead', value: 'R$ 12.000', date: '12 Ago', status: 'Novo', responsible: 'Carlos' },
      { id: 2, title: 'Grupo Martins', type: 'Lead', value: 'R$ 8.500', date: '13 Ago', status: 'Novo', responsible: 'Ana' },
    ]
  },
  contact: {
    title: 'Em Contato',
    color: 'border-l-yellow-500',
    items: [
      { id: 3, title: 'Alpha Varejo', type: 'Contrato', value: 'R$ 45.000', date: '10 Ago', status: 'Aguardando', responsible: 'Carlos' },
    ]
  },
  negotiation: {
    title: 'Em Negociação',
    color: 'border-l-orange-500',
    items: [
      { id: 4, title: 'Consultoria Beta', type: 'Contrato', value: 'R$ 22.000', date: '05 Ago', status: 'Quente', responsible: 'Roberto' },
      { id: 5, title: 'Logística Express', type: 'Contrato', value: 'R$ 150.000', date: '01 Ago', status: 'Revisão', responsible: 'Ana' },
    ]
  },
  proposal: {
    title: 'Proposta Enviada',
    color: 'border-l-purple-500',
    items: [
      { id: 6, title: 'Startup Innovate', type: 'Lead', value: 'R$ 5.000', date: '11 Ago', status: 'Enviado', responsible: 'Carlos' },
    ]
  },
  closed: {
    title: 'Contrato Fechado',
    color: 'border-l-green-500',
    items: [
      { id: 7, title: 'Banco Nacional', type: 'Renovação', value: 'R$ 320.000', date: '28 Jul', status: 'Assinado', responsible: 'Roberto' },
    ]
  }
};

// Helper to flatten kanban data for the Grid view
interface KanbanItem {
  id: number;
  title: string;
  type: string;
  value: string;
  date: string;
  status: string;
  responsible: string;
  stage?: string;
}

interface KanbanColumn {
  title: string;
  color: string;
  items: KanbanItem[];
}

const getAllKanbanItems = (): KanbanItem[] => {
  const allItems: KanbanItem[] = [];
  Object.values(initialKanbanData).forEach((column: KanbanColumn) => {
    column.items.forEach((item: KanbanItem) => {
      allItems.push({ ...item, stage: column.title });
    });
  });
  return allItems;
};

// --- COMPONENTS ---

const SidebarItem = ({ icon: Icon, label, active = false, onClick }: { icon: React.ComponentType<{ size: number }>, label: string, active?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-r-full mr-2
      ${active 
        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent'
      }`}
  >
    <Icon size={20} />
    {label}
  </button>
);

interface MetricCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  trend?: string;
  icon: React.ComponentType<{ size: number }>;
  colorClass: string;
}

const MetricCard = ({ title, value, subtext, trend, icon: Icon, colorClass }: MetricCardProps) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className="flex items-center text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
          <TrendingUp size={12} className="mr-1" />
          {trend}
        </span>
      )}
    </div>
    <div>
      <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
      <div className="text-2xl font-bold text-slate-800">{value}</div>
      {subtext && <p className="text-xs text-slate-400 mt-2">{subtext}</p>}
    </div>
  </div>
);

const ProspeccaoCard = ({ days, count, percent }: { days: string, count: number, percent: string }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Últimos {days}</p>
      <h4 className="text-2xl font-bold text-slate-800">{count} <span className="text-sm font-normal text-slate-400">leads</span></h4>
    </div>
    <div className="text-right">
      <span className="text-green-600 bg-green-50 px-2 py-1 rounded-md text-xs font-bold">{percent}</span>
      <p className="text-[10px] text-slate-400 mt-1">vs período anterior</p>
    </div>
  </div>
);

const KanbanCard = ({ item }: { item: KanbanItem }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-3 hover:shadow-md transition-all cursor-pointer group">
    <div className="flex justify-between items-start mb-2">
      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full 
        ${item.type === 'Contrato' ? 'bg-indigo-50 text-indigo-700' : 'bg-teal-50 text-teal-700'}`}>
        {item.type}
      </span>
      <button className="text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
        <MoreVertical size={16} />
      </button>
    </div>
    <h4 className="font-semibold text-slate-800 text-sm mb-1">{item.title}</h4>
    <div className="flex justify-between items-end mt-3">
      <div>
        <p className="text-xs text-slate-500">Valor Estimado</p>
        <p className="font-bold text-slate-700 text-sm">{item.value}</p>
      </div>
      <div className="flex items-center text-xs text-slate-400">
        <Clock size={12} className="mr-1" />
        {item.date}
      </div>
    </div>
  </div>
);

interface KanbanColumnProps {
  title: string;
  items: KanbanItem[];
  colorBorder: string;
}

const KanbanColumn = ({ title, items, colorBorder }: KanbanColumnProps) => (
  <div className="min-w-72 w-full bg-slate-50/50 rounded-xl flex flex-col h-full border border-slate-200/60">
    <div className={`p-4 border-b border-slate-100 flex justify-between items-center ${colorBorder} border-t-4 rounded-t-xl bg-white`}>
      <h3 className="font-semibold text-slate-700 text-sm">{title}</h3>
      <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-full">
        {items.length}
      </span>
    </div>
    <div className="p-3 flex-1 overflow-y-auto custom-scrollbar">
      {items.map((item: KanbanItem) => (
        <KanbanCard key={item.id} item={item} />
      ))}
      <button className="w-full py-2 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-sm font-medium hover:border-blue-300 hover:text-blue-500 transition-colors flex items-center justify-center gap-2 mt-2">
        <span>+ Adicionar</span>
      </button>
    </div>
  </div>
);

// --- VIEWS ---

const DashboardView = () => (
  <div className="space-y-6">
    {/* Analítico Zona Superior */}
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Analítico</h1>
        <p className="text-slate-500 mt-1">Visão geral de performance e métricas chave.</p>
      </div>
      <div className="hidden md:flex gap-2">
        <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">Exportar Relatório</button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard 
        title="Total Ativos" 
        value="142" 
        subtext="+12 novos este mês" 
        trend="+8.5%"
        icon={Briefcase}
        colorClass="bg-blue-600 text-blue-600"
      />
      <MetricCard 
        title="Em Negociação" 
        value="28" 
        subtext="R$ 450k em pipeline" 
        icon={Users}
        colorClass="bg-orange-500 text-orange-500"
      />
      <MetricCard 
        title="Fechados (Mês)" 
        value="15" 
        subtext="Meta mensal atingida" 
        trend="+12%"
        icon={CheckCircle2}
        colorClass="bg-green-500 text-green-500"
      />
      
      {/* Area Chart Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between mb-2">
          <h3 className="text-slate-500 text-sm font-medium">Faturamento Estimado</h3>
          <span className="text-xs font-bold text-green-600">+24%</span>
        </div>
        <div className="h-16 w-full">
           <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="valor" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-2xl font-bold text-slate-800">R$ 1.2M</div>
      </div>
    </div>

    {/* Analítico Zona Inferior */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Coluna 1: Prospecção (2/3 width on large screens) */}
      <div className="lg:col-span-2 space-y-4">
        <h3 className="font-bold text-slate-700 flex items-center gap-2">
          <Filter size={20} className="text-blue-600" />
          Métricas de Prospecção
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ProspeccaoCard days="7 Dias" count={12} percent="+5%" />
          <ProspeccaoCard days="15 Dias" count={34} percent="+12%" />
          <ProspeccaoCard days="30 Dias" count={86} percent="+28%" />
        </div>
        
        {/* Placeholder for extra analytical data if needed */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm mt-4">
          <div className="flex justify-between items-center mb-4">
             <h4 className="font-semibold text-slate-700">Conversão de Leads</h4>
             <button className="text-blue-600 text-sm font-medium hover:underline">Ver Detalhes</button>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden flex">
            <div className="w-[45%] bg-blue-500 h-full"></div>
            <div className="w-[30%] bg-indigo-500 h-full"></div>
            <div className="w-[15%] bg-teal-500 h-full"></div>
            <div className="w-[10%] bg-slate-300 h-full"></div>
          </div>
          <div className="flex gap-4 mt-3 text-xs text-slate-500">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Frio</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Morno</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-teal-500"></div> Quente</div>
          </div>
        </div>
      </div>

      {/* Coluna 2: Ranking de Serviços */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-700 flex items-center gap-2">
            <Trophy size={18} className="text-yellow-500" />
            Ranking de Serviços
          </h3>
          <MoreVertical size={16} className="text-slate-400 cursor-pointer" />
        </div>
        <div className="space-y-5">
          {rankingData.map((service, index) => (
            <div key={index} className="flex flex-col gap-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-slate-700">{index + 1}. {service.name}</span>
                <span className="font-bold text-slate-900">
                  {(service.valor / 1000).toFixed(0)}k
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${(service.valor / 500000) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-6 py-2 text-sm text-blue-600 font-medium bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
          Ver Todos os Serviços <ArrowRight size={14}/>
        </button>
      </div>
    </div>
  </div>
);

const PipelineView = () => {
  const flatItems = getAllKanbanItems();

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Pipeline de Vendas</h1>
          <p className="text-slate-500 mt-1">Gerencie oportunidades e acompanhe o fluxo de vendas.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm shadow-blue-600/20">
          + Nova Oportunidade
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Filtrar por nome, empresa ou valor..." 
            className="outline-none text-sm text-slate-700 w-full"
          />
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
            <Filter size={16} /> Status
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
            <Calendar size={16} /> Data
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
            <Users size={16} /> Responsável
          </button>
        </div>
      </div>

      {/* Grid Zone (Upper) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-shrink-0 max-h-[300px] overflow-y-auto">
        <div className="p-4 border-b border-slate-100 bg-slate-50 font-semibold text-sm text-slate-700 flex items-center gap-2 sticky top-0">
          <ListFilter size={16} /> 
          Registros em Lista
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0">
            <tr>
              <th className="px-6 py-3">Oportunidade</th>
              <th className="px-6 py-3">Estágio</th>
              <th className="px-6 py-3">Valor</th>
              <th className="px-6 py-3">Responsável</th>
              <th className="px-6 py-3">Data</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {flatItems.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-3 font-medium text-slate-800">{item.title}</td>
                <td className="px-6 py-3">
                  <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs border border-slate-200">
                    {item.stage}
                  </span>
                </td>
                <td className="px-6 py-3 text-slate-600">{item.value}</td>
                <td className="px-6 py-3 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                    {item.responsible ? item.responsible.charAt(0) : 'U'}
                  </div>
                  {item.responsible || 'N/A'}
                </td>
                <td className="px-6 py-3 text-slate-500">{item.date}</td>
                <td className="px-6 py-3">
                   <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${item.status === 'Novo' ? 'bg-blue-50 text-blue-600' : ''}
                    ${item.status === 'Quente' ? 'bg-orange-50 text-orange-600' : ''}
                    ${item.status === 'Assinado' ? 'bg-green-50 text-green-600' : ''}
                    ${!['Novo', 'Quente', 'Assinado'].includes(item.status) ? 'bg-slate-100 text-slate-600' : ''}
                   `}>
                    {item.status}
                   </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Kanban Zone (Lower) */}
      <div className="flex-1 flex flex-col min-h-[400px]">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
          <LayoutDashboard size={20} className="text-blue-600"/>
          Quadro Kanban
        </h2>
        <div className="flex-1 overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max h-full px-1">
            <KanbanColumn 
              title={initialKanbanData.received.title} 
              items={initialKanbanData.received.items} 
              colorBorder={initialKanbanData.received.color}
            />
            <KanbanColumn 
              title={initialKanbanData.contact.title} 
              items={initialKanbanData.contact.items} 
              colorBorder={initialKanbanData.contact.color}
            />
            <KanbanColumn 
              title={initialKanbanData.negotiation.title} 
              items={initialKanbanData.negotiation.items} 
              colorBorder={initialKanbanData.negotiation.color}
            />
            <KanbanColumn 
              title={initialKanbanData.proposal.title} 
              items={initialKanbanData.proposal.items} 
              colorBorder={initialKanbanData.proposal.color}
            />
            <KanbanColumn 
              title={initialKanbanData.closed.title} 
              items={initialKanbanData.closed.items} 
              colorBorder={initialKanbanData.closed.color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN LAYOUT ---

export default function CRM_Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-[#F4F6F8] font-sans text-slate-900 overflow-hidden">
      
      {/* SIDEBAR */}
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
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
          />
          <SidebarItem 
            icon={Filter} 
            label="Pipeline de Vendas" 
            active={activeTab === 'pipeline'} 
            onClick={() => setActiveTab('pipeline')}
          />
          <SidebarItem icon={FileText} label="Gestão de Contratos" />
          <SidebarItem icon={Users} label="Clientes" />
          <SidebarItem icon={DollarSign} label="Financeiro" />
          <SidebarItem icon={Package} label="Estoque" />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
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

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* TOP NAVBAR (Mobile/Search) */}
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

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8">
          {activeTab === 'dashboard' ? <DashboardView /> : <PipelineView />}
        </div>
      </main>
    </div>
  );
}