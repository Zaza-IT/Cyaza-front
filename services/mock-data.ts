import type { KanbanData, KanbanItem, ChartDataItem, RankingDataItem } from '@/lib/types';

export const chartData: ChartDataItem[] = [
  { name: 'Sem 1', contratos: 4, valor: 2400 },
  { name: 'Sem 2', contratos: 7, valor: 4500 },
  { name: 'Sem 3', contratos: 5, valor: 3200 },
  { name: 'Sem 4', contratos: 12, valor: 8900 },
];

export const rankingData: RankingDataItem[] = [
  { name: 'Consultoria Estratégica', valor: 450000 },
  { name: 'Implementação de ERP', valor: 320000 },
  { name: 'Treinamento Corporativo', valor: 180000 },
  { name: 'Auditoria Fiscal', valor: 120000 },
];

export const initialKanbanData: KanbanData = {
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
export const getAllKanbanItems = (): KanbanItem[] => {
  const allItems: KanbanItem[] = [];
  Object.values(initialKanbanData).forEach((column) => {
    column.items.forEach((item: KanbanItem) => {
      allItems.push({ ...item, stage: column.title });
    });
  });
  return allItems;
};
