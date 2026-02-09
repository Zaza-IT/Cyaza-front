import type { KanbanData, KanbanItem, ChartDataItem, RankingDataItem, Lead } from '@/lib/types';

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

// Mock Leads Data
// In production, replace with API calls:
// export async function getLeads(): Promise<Lead[]> {
//   const response = await fetch(`${process.env.API_URL}/api/leads/`);
//   return response.json();
// }
export const mockLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Ricardo Almeida',
    company: 'TechSolutions Ltda',
    position: 'Diretor de TI',
    contact: {
      email: 'ricardo@techsolutions.com.br',
      phone: '(11) 99999-1234',
      whatsapp: '(11) 99999-1234',
    },
    estimatedValue: 45000,
    stage: 'qualificado',
    temperature: 'quente',
    source: 'linkedin',
    interests: [
      { id: 'int-1', service: 'Consultoria Estratégica', priority: 'alta' },
      { id: 'int-2', service: 'Implementação ERP', priority: 'media' },
    ],
    meetings: [
      { id: 'meet-1', date: '2024-08-15', time: '14:00', type: 'video', notes: 'Apresentação inicial do produto', completed: true },
      { id: 'meet-2', date: '2024-08-22', time: '10:00', type: 'presencial', notes: 'Demonstração técnica', completed: false },
    ],
    notes: [
      { id: 'note-1', content: 'Cliente muito interessado em automação de processos. Tem budget aprovado para Q3.', createdAt: '2024-08-12', author: 'Carlos' },
    ],
    responsible: 'Carlos Mendes',
    responsibleId: 'user-1',
    createdAt: '2024-08-10',
    updatedAt: '2024-08-15',
    lastContactAt: '2024-08-15',
    nextFollowUp: '2024-08-22',
    tags: ['enterprise', 'tech', 'urgente'],
  },
  {
    id: 'lead-2',
    name: 'Fernanda Costa',
    company: 'Grupo Martins',
    position: 'CEO',
    contact: {
      email: 'fernanda@grupomartins.com.br',
      phone: '(21) 98888-5678',
      whatsapp: '(21) 98888-5678',
    },
    estimatedValue: 120000,
    stage: 'proposta',
    temperature: 'quente',
    source: 'indicacao',
    interests: [
      { id: 'int-3', service: 'Auditoria Fiscal', priority: 'alta' },
      { id: 'int-4', service: 'Consultoria Tributária', priority: 'alta' },
    ],
    meetings: [
      { id: 'meet-3', date: '2024-08-08', time: '09:00', type: 'call', notes: 'Primeiro contato', completed: true },
      { id: 'meet-4', date: '2024-08-14', time: '15:00', type: 'video', notes: 'Reunião com diretoria', completed: true },
      { id: 'meet-5', date: '2024-08-25', time: '11:00', type: 'presencial', notes: 'Apresentação da proposta final', completed: false },
    ],
    notes: [
      { id: 'note-2', content: 'Grupo em expansão, planejando abrir 3 novas filiais.', createdAt: '2024-08-08', author: 'Ana' },
      { id: 'note-3', content: 'Muito satisfeita com a reunião. Pediu proposta detalhada.', createdAt: '2024-08-14', author: 'Ana' },
    ],
    responsible: 'Ana Silva',
    responsibleId: 'user-2',
    createdAt: '2024-08-05',
    updatedAt: '2024-08-14',
    lastContactAt: '2024-08-14',
    nextFollowUp: '2024-08-25',
    tags: ['varejo', 'grande-porte', 'indicação-vip'],
  },
  {
    id: 'lead-3',
    name: 'Bruno Ferreira',
    company: 'Alpha Varejo',
    position: 'Gerente Comercial',
    contact: {
      email: 'bruno@alphavarejo.com',
      phone: '(31) 97777-9012',
    },
    estimatedValue: 28000,
    stage: 'contato',
    temperature: 'morno',
    source: 'website',
    interests: [
      { id: 'int-5', service: 'Treinamento Corporativo', priority: 'media' },
    ],
    meetings: [
      { id: 'meet-6', date: '2024-08-18', time: '16:00', type: 'call', notes: 'Ligação de qualificação', completed: false },
    ],
    notes: [],
    responsible: 'Carlos Mendes',
    responsibleId: 'user-1',
    createdAt: '2024-08-16',
    updatedAt: '2024-08-16',
    lastContactAt: undefined,
    nextFollowUp: '2024-08-18',
    tags: ['varejo', 'medio-porte'],
  },
  {
    id: 'lead-4',
    name: 'Mariana Santos',
    company: 'Startup Innovate',
    position: 'Co-founder',
    contact: {
      email: 'mariana@innovate.io',
      phone: '(11) 96666-3456',
      whatsapp: '(11) 96666-3456',
    },
    estimatedValue: 15000,
    stage: 'novo',
    temperature: 'frio',
    source: 'evento',
    interests: [
      { id: 'int-6', service: 'Consultoria Estratégica', priority: 'baixa' },
    ],
    meetings: [],
    notes: [
      { id: 'note-4', content: 'Conhecida no evento TechWeek. Empresa em estágio inicial, pode crescer.', createdAt: '2024-08-17', author: 'Roberto' },
    ],
    responsible: 'Roberto Lima',
    responsibleId: 'user-3',
    createdAt: '2024-08-17',
    updatedAt: '2024-08-17',
    lastContactAt: '2024-08-17',
    nextFollowUp: '2024-08-24',
    tags: ['startup', 'tech', 'potencial'],
  },
  {
    id: 'lead-5',
    name: 'Paulo Oliveira',
    company: 'Logística Express',
    position: 'Diretor de Operações',
    contact: {
      email: 'paulo@logisticaexpress.com.br',
      phone: '(41) 95555-7890',
      whatsapp: '(41) 95555-7890',
    },
    estimatedValue: 180000,
    stage: 'negociacao',
    temperature: 'quente',
    source: 'cold_call',
    interests: [
      { id: 'int-7', service: 'Implementação ERP', priority: 'alta' },
      { id: 'int-8', service: 'Consultoria em Logística', priority: 'alta' },
      { id: 'int-9', service: 'Treinamento de Equipe', priority: 'media' },
    ],
    meetings: [
      { id: 'meet-7', date: '2024-07-25', time: '10:00', type: 'call', notes: 'Prospecção inicial', completed: true },
      { id: 'meet-8', date: '2024-08-02', time: '14:00', type: 'video', notes: 'Demo do sistema', completed: true },
      { id: 'meet-9', date: '2024-08-10', time: '09:00', type: 'presencial', notes: 'Visita técnica', completed: true },
      { id: 'meet-10', date: '2024-08-20', time: '15:00', type: 'video', notes: 'Negociação final', completed: false },
    ],
    notes: [
      { id: 'note-5', content: 'Empresa em rápido crescimento. Precisam urgentemente de um ERP robusto.', createdAt: '2024-07-25', author: 'Ana' },
      { id: 'note-6', content: 'Visita foi excelente. Conhecemos toda a operação.', createdAt: '2024-08-10', author: 'Ana' },
      { id: 'note-7', content: 'Estão comparando com 2 concorrentes. Preço é importante mas não decisivo.', createdAt: '2024-08-12', author: 'Ana' },
    ],
    responsible: 'Ana Silva',
    responsibleId: 'user-2',
    createdAt: '2024-07-25',
    updatedAt: '2024-08-12',
    lastContactAt: '2024-08-12',
    nextFollowUp: '2024-08-20',
    tags: ['logistica', 'grande-porte', 'erp', 'prioridade'],
  },
  {
    id: 'lead-6',
    name: 'Carla Mendonça',
    company: 'Consultoria Beta',
    position: 'Sócia-diretora',
    contact: {
      email: 'carla@consultoriabeta.com.br',
      phone: '(11) 94444-2345',
    },
    estimatedValue: 35000,
    stage: 'qualificado',
    temperature: 'morno',
    source: 'indicacao',
    interests: [
      { id: 'int-10', service: 'Parceria Comercial', priority: 'alta' },
    ],
    meetings: [
      { id: 'meet-11', date: '2024-08-19', time: '11:00', type: 'video', notes: 'Discussão de parceria', completed: false },
    ],
    notes: [
      { id: 'note-8', content: 'Indicada pelo Grupo Martins. Interesse em parceria para atender clientes em comum.', createdAt: '2024-08-15', author: 'Carlos' },
    ],
    responsible: 'Carlos Mendes',
    responsibleId: 'user-1',
    createdAt: '2024-08-15',
    updatedAt: '2024-08-15',
    lastContactAt: '2024-08-15',
    nextFollowUp: '2024-08-19',
    tags: ['parceria', 'consultoria'],
  },
];

// Helper functions for Leads (simulate API calls)
export function getLeads(): Lead[] {
  return mockLeads;
}

export function getLeadById(id: string): Lead | undefined {
  return mockLeads.find(lead => lead.id === id);
}

export function updateLead(id: string, data: Partial<Lead>): Lead | null {
  const index = mockLeads.findIndex(lead => lead.id === id);
  if (index === -1) return null;
  mockLeads[index] = { ...mockLeads[index], ...data, updatedAt: new Date().toISOString().split('T')[0] };
  return mockLeads[index];
}

export function createLead(data: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Lead {
  const newLead: Lead = {
    ...data,
    id: `lead-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
  };
  mockLeads.push(newLead);
  return newLead;
}

export const automationsMock = [
  {
    id: 'auto-1',
    title: 'Cobrança recorrente - Mensal',
    status: 'online', // online | warning | offline
    onlineSince: '2024-11-10 08:32',
    info: 'Próximo pagamento em 2 dias',
    logs: [
      { date: '2025-02-05 09:12', message: 'Cobrança gerada com sucesso' },
      { date: '2025-02-04 09:11', message: 'Cobrança gerada com sucesso' },
    ],
  },
  {
    id: 'auto-2',
    title: 'Envio de Nota Fiscal',
    status: 'warning',
    onlineSince: '2024-12-01 10:00',
    info: 'Limite mensal atingido',
    logs: [
      { date: '2025-02-06 14:22', message: 'Execução bloqueada: limite atingido' },
    ],
  },
  {
    id: 'auto-3',
    title: 'Sincronização com ERP',
    status: 'offline',
    onlineSince: '-',
    info: 'Automação desativada',
    logs: [
      { date: '2025-01-30 18:00', message: 'Automação desativada manualmente' },
    ],
  },
];

