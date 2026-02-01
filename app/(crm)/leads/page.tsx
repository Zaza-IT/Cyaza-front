"use client";

import { useState, useMemo } from 'react';
import type { Lead, LeadStage, LeadTemperature } from '@/lib/types';
import { getLeads, updateLead } from '@/services/mock-data';
import { LeadDetailSheet } from '@/components/crm/lead-detail-sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  UserPlus,
  Calendar,
  Building2,
  Mail,
  Phone,
  ChevronRight,
  Thermometer,
  SlidersHorizontal,
} from 'lucide-react';

const temperatureColors: Record<LeadTemperature, string> = {
  frio: 'bg-blue-100 text-blue-700',
  morno: 'bg-yellow-100 text-yellow-700',
  quente: 'bg-red-100 text-red-700',
};

const stageLabels: Record<LeadStage, string> = {
  novo: 'Novo',
  contato: 'Em Contato',
  qualificado: 'Qualificado',
  proposta: 'Proposta',
  negociacao: 'Negociacao',
  ganho: 'Ganho',
  perdido: 'Perdido',
};

const stageColors: Record<LeadStage, string> = {
  novo: 'bg-slate-100 text-slate-700',
  contato: 'bg-blue-100 text-blue-700',
  qualificado: 'bg-indigo-100 text-indigo-700',
  proposta: 'bg-purple-100 text-purple-700',
  negociacao: 'bg-orange-100 text-orange-700',
  ganho: 'bg-green-100 text-green-700',
  perdido: 'bg-red-100 text-red-700',
};

export default function LeadsPage() {
  // In production, replace with SWR/React Query for data fetching
  const [leads, setLeads] = useState<Lead[]>(() => getLeads());
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [temperatureFilter, setTemperatureFilter] = useState<string>('all');
  
  // Sheet state
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Filter leads based on search and filters
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchLower) ||
        lead.company.toLowerCase().includes(searchLower) ||
        lead.contact.email.toLowerCase().includes(searchLower);

      // Stage filter
      const matchesStage = stageFilter === 'all' || lead.stage === stageFilter;

      // Temperature filter
      const matchesTemperature = temperatureFilter === 'all' || lead.temperature === temperatureFilter;

      return matchesSearch && matchesStage && matchesTemperature;
    });
  }, [leads, searchQuery, stageFilter, temperatureFilter]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  const handleRowClick = (lead: Lead) => {
    setSelectedLead(lead);
    setDetailOpen(true);
  };

  const handleSaveLead = (leadId: string, data: Partial<Lead>) => {
    // In production, replace with API call
    // await fetch(`/api/leads/${leadId}`, { method: 'PATCH', body: JSON.stringify(data) });
    const updated = updateLead(leadId, data);
    if (updated) {
      setLeads(getLeads()); // Refresh leads
      setSelectedLead(updated);
    }
  };

  // Calculate summary stats
  const stats = useMemo(() => {
    return {
      total: leads.length,
      quentes: leads.filter(l => l.temperature === 'quente').length,
      valorTotal: leads.reduce((sum, l) => sum + l.estimatedValue, 0),
      comFollowUp: leads.filter(l => l.nextFollowUp).length,
    };
  }, [leads]);

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Leads</h1>
          <p className="text-slate-500 mt-1">Gerencie e acompanhe seus leads de vendas.</p>
        </div>
        <Button className="shadow-sm shadow-blue-600/20">
          <UserPlus size={16} className="mr-2" />
          Novo Lead
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium">Total de Leads</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium">Leads Quentes</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{stats.quentes}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium">Valor em Pipeline</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{formatCurrency(stats.valorTotal)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium">Follow-ups Agendados</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{stats.comFollowUp}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 flex-1 min-w-[250px]">
            <Search size={18} className="text-slate-400" />
            <Input
              type="text"
              placeholder="Buscar por nome, empresa ou email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 shadow-none focus-visible:ring-0 px-0"
            />
          </div>
          
          <div className="flex gap-3 items-center">
            <SlidersHorizontal size={16} className="text-slate-400" />
            
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Estagio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Estagios</SelectItem>
                {Object.entries(stageLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={temperatureFilter} onValueChange={setTemperatureFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Temperatura" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="frio">Frio</SelectItem>
                <SelectItem value="morno">Morno</SelectItem>
                <SelectItem value="quente">Quente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Leads Grid/Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Lead</th>
                <th className="px-6 py-4">Contato</th>
                <th className="px-6 py-4">Valor</th>
                <th className="px-6 py-4">Estagio</th>
                <th className="px-6 py-4">Temperatura</th>
                <th className="px-6 py-4">Responsavel</th>
                <th className="px-6 py-4">Proximo Follow-up</th>
                <th className="px-6 py-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                    Nenhum lead encontrado com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr 
                    key={lead.id} 
                    onClick={() => handleRowClick(lead)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{lead.name}</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <Building2 size={12} />
                            {lead.company}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-slate-600 flex items-center gap-1">
                          <Mail size={12} className="text-slate-400" />
                          {lead.contact.email}
                        </p>
                        <p className="text-slate-500 text-xs flex items-center gap-1">
                          <Phone size={12} className="text-slate-400" />
                          {lead.contact.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-800">
                        {formatCurrency(lead.estimatedValue)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={stageColors[lead.stage]}>
                        {stageLabels[lead.stage]}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={temperatureColors[lead.temperature]}>
                        <Thermometer size={12} className="mr-1" />
                        {lead.temperature.charAt(0).toUpperCase() + lead.temperature.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold">
                          {lead.responsible.charAt(0)}
                        </div>
                        <span className="text-slate-600">{lead.responsible.split(' ')[0]}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {lead.nextFollowUp ? (
                        <span className="flex items-center gap-1 text-slate-600">
                          <Calendar size={14} className="text-blue-500" />
                          {formatDate(lead.nextFollowUp)}
                        </span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <ChevronRight 
                        size={16} 
                        className="text-slate-300 group-hover:text-slate-500 transition-colors" 
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Sheet with inline editing */}
      <LeadDetailSheet
        lead={selectedLead}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onSave={handleSaveLead}
      />
    </div>
  );
}
