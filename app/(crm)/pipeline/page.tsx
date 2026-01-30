"use client";

import { 
  LayoutDashboard, 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  ListFilter 
} from 'lucide-react';
import { KanbanColumn } from '@/components/crm/kanban-column';
import { initialKanbanData, getAllKanbanItems } from '@/services/mock-data';

export default function PipelinePage() {
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
}
