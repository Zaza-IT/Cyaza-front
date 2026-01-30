"use client";

import { 
  Briefcase, 
  Users, 
  CheckCircle2, 
  Filter, 
  Trophy, 
  MoreVertical, 
  ArrowRight 
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { MetricCard } from '@/components/crm/metric-card';
import { ProspeccaoCard } from '@/components/crm/prospeccao-card';
import { chartData, rankingData } from '@/services/mock-data';

export default function DashboardPage() {
  return (
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
          
          {/* Conversion metrics */}
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
}
