"use client";

import { useState, useEffect } from 'react';
import type { Lead, LeadStage, LeadTemperature, LeadSource } from '@/lib/types';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Building2, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  MessageSquare,
  Video,
  PhoneCall,
  MapPin,
  Edit,
  Save,
  X,
  TrendingUp,
  FileText
} from 'lucide-react';

interface LeadDetailSheetProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (leadId: string, data: Partial<Lead>) => void;
}

const temperatureColors = {
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

const sourceLabels: Record<LeadSource, string> = {
  website: 'Website',
  indicacao: 'Indicacao',
  linkedin: 'LinkedIn',
  evento: 'Evento',
  cold_call: 'Cold Call',
  outro: 'Outro',
};

const meetingIcons = {
  call: PhoneCall,
  video: Video,
  presencial: MapPin,
};

export function LeadDetailSheet({ lead, open, onOpenChange, onSave }: LeadDetailSheetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Lead>>({});

  // Reset edit state when lead changes or dialog closes
  useEffect(() => {
    if (lead) {
      setEditData({
        name: lead.name,
        company: lead.company,
        position: lead.position,
        contact: { ...lead.contact },
        estimatedValue: lead.estimatedValue,
        stage: lead.stage,
        temperature: lead.temperature,
        source: lead.source,
        nextFollowUp: lead.nextFollowUp || '',
        tags: [...lead.tags],
      });
    }
    if (!open) {
      setIsEditing(false);
    }
  }, [lead, open]);

  if (!lead) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  const handleSave = () => {
    onSave(lead.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: lead.name,
      company: lead.company,
      position: lead.position,
      contact: { ...lead.contact },
      estimatedValue: lead.estimatedValue,
      stage: lead.stage,
      temperature: lead.temperature,
      source: lead.source,
      nextFollowUp: lead.nextFollowUp || '',
      tags: [...lead.tags],
    });
    setIsEditing(false);
  };

  const updateField = (field: string, value: unknown) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const updateContactField = (field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value } as Lead['contact'],
    }));
  };

  // Display values (show edited values when editing)
  const displayName = isEditing ? editData.name : lead.name;
  const displayCompany = isEditing ? editData.company : lead.company;
  const displayPosition = isEditing ? editData.position : lead.position;
  const displayValue = isEditing ? editData.estimatedValue : lead.estimatedValue;
  const displayStage = isEditing ? editData.stage : lead.stage;
  const displayTemperature = isEditing ? editData.temperature : lead.temperature;
  const displaySource = isEditing ? editData.source : lead.source;
  const displayEmail = isEditing ? editData.contact?.email : lead.contact.email;
  const displayPhone = isEditing ? editData.contact?.phone : lead.contact.phone;
  const displayWhatsapp = isEditing ? editData.contact?.whatsapp : lead.contact.whatsapp;
  const displayNextFollowUp = isEditing ? editData.nextFollowUp : lead.nextFollowUp;
  const displayTags = isEditing ? editData.tags : lead.tags;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            {/* Header */}
            <DialogHeader className="pb-4 border-b mb-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold">
                    {(displayName?.charAt(0)) || 'L'}
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <Input
                        value={editData.name || ''}
                        onChange={(e) => updateField('name', e.target.value)}
                        className="font-bold text-xl h-10 mb-2"
                      />
                    ) : (
                      <DialogTitle className="text-xl font-bold">{lead.name}</DialogTitle>
                    )}
                    {isEditing ? (
                      <div className="flex gap-3 mt-1">
                        <Input
                          value={editData.company || ''}
                          onChange={(e) => updateField('company', e.target.value)}
                          placeholder="Empresa"
                          className="h-8 text-sm w-40"
                        />
                        <Input
                          value={editData.position || ''}
                          onChange={(e) => updateField('position', e.target.value)}
                          placeholder="Cargo"
                          className="h-8 text-sm w-40"
                        />
                      </div>
                    ) : (
                      <DialogDescription className="flex items-center gap-2 text-base">
                        <Building2 size={16} />
                        {lead.company} - {lead.position}
                      </DialogDescription>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button variant="outline" onClick={handleCancel}>
                        <X size={16} className="mr-2" />
                        Cancelar
                      </Button>
                      <Button onClick={handleSave}>
                        <Save size={16} className="mr-2" />
                        Salvar
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit size={16} className="mr-2" />
                      Editar
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Status Badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {isEditing ? (
                  <div className="flex gap-3 flex-wrap">
                    <Select
                      value={editData.temperature}
                      onValueChange={(value) => updateField('temperature', value)}
                    >
                      <SelectTrigger className="w-32 h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frio">Frio</SelectItem>
                        <SelectItem value="morno">Morno</SelectItem>
                        <SelectItem value="quente">Quente</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={editData.stage}
                      onValueChange={(value) => updateField('stage', value)}
                    >
                      <SelectTrigger className="w-40 h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(stageLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={editData.source}
                      onValueChange={(value) => updateField('source', value)}
                    >
                      <SelectTrigger className="w-36 h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(sourceLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <>
                    <Badge className={temperatureColors[lead.temperature]}>
                      {lead.temperature.charAt(0).toUpperCase() + lead.temperature.slice(1)}
                    </Badge>
                    <Badge variant="outline">{stageLabels[lead.stage]}</Badge>
                    <Badge variant="secondary">{sourceLabels[lead.source]}</Badge>
                  </>
                )}
              </div>
            </DialogHeader>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-xs text-slate-500 mb-1 font-medium">Valor Estimado</p>
                {isEditing ? (
                  <Input
                    type="number"
                    value={editData.estimatedValue || 0}
                    onChange={(e) => updateField('estimatedValue', Number(e.target.value))}
                    className="h-10 font-bold text-xl"
                  />
                ) : (
                  <p className="text-2xl font-bold text-slate-800">{formatCurrency(lead.estimatedValue)}</p>
                )}
              </div>
              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-xs text-slate-500 mb-1 font-medium">Responsavel</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                    {lead.responsible.charAt(0)}
                  </div>
                  <p className="font-semibold text-slate-800">{lead.responsible}</p>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl">
                <p className="text-xs text-slate-500 mb-1 font-medium">Proximo Follow-up</p>
                {isEditing ? (
                  <Input
                    type="date"
                    value={editData.nextFollowUp || ''}
                    onChange={(e) => updateField('nextFollowUp', e.target.value)}
                    className="h-10"
                  />
                ) : (
                  <p className="text-lg font-semibold text-blue-600">
                    {lead.nextFollowUp ? formatDate(lead.nextFollowUp) : '-'}
                  </p>
                )}
              </div>
            </div>

            {/* Tabs Content */}
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="w-full grid grid-cols-4 mb-4">
                <TabsTrigger value="info">Informacoes</TabsTrigger>
                <TabsTrigger value="meetings">Reunioes ({lead.meetings.length})</TabsTrigger>
                <TabsTrigger value="interests">Interesses ({lead.interests.length})</TabsTrigger>
                <TabsTrigger value="notes">Notas ({lead.notes.length})</TabsTrigger>
              </TabsList>

              {/* Contact Info Tab */}
              <TabsContent value="info" className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Contact Details */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-700 flex items-center gap-2 border-b pb-2">
                      <User size={18} />
                      Contato
                    </h4>
                    <div className="space-y-3">
                      {isEditing ? (
                        <>
                          <div>
                            <Label className="text-xs text-slate-500">Email</Label>
                            <div className="flex items-center gap-2 mt-1">
                              <Mail size={16} className="text-slate-400" />
                              <Input
                                type="email"
                                value={editData.contact?.email || ''}
                                onChange={(e) => updateContactField('email', e.target.value)}
                                className="h-9 flex-1"
                              />
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs text-slate-500">Telefone</Label>
                            <div className="flex items-center gap-2 mt-1">
                              <Phone size={16} className="text-slate-400" />
                              <Input
                                type="tel"
                                value={editData.contact?.phone || ''}
                                onChange={(e) => updateContactField('phone', e.target.value)}
                                className="h-9 flex-1"
                              />
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs text-slate-500">WhatsApp</Label>
                            <div className="flex items-center gap-2 mt-1">
                              <MessageSquare size={16} className="text-slate-400" />
                              <Input
                                type="tel"
                                value={editData.contact?.whatsapp || ''}
                                onChange={(e) => updateContactField('whatsapp', e.target.value)}
                                className="h-9 flex-1"
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <a href={`mailto:${lead.contact.email}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                            <Mail size={16} className="text-slate-400" />
                            {lead.contact.email}
                          </a>
                          <a href={`tel:${lead.contact.phone}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                            <Phone size={16} className="text-slate-400" />
                            {lead.contact.phone}
                          </a>
                          {lead.contact.whatsapp && (
                            <a href={`https://wa.me/${lead.contact.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-slate-600 hover:text-green-600 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                              <MessageSquare size={16} className="text-green-500" />
                              WhatsApp
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Dates & Tags */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-700 flex items-center gap-2 border-b pb-2">
                      <Calendar size={18} />
                      Datas e Tags
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                        <span className="text-slate-500">Criado em</span>
                        <span className="font-medium text-slate-700">{formatDate(lead.createdAt)}</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                        <span className="text-slate-500">Atualizado em</span>
                        <span className="font-medium text-slate-700">{formatDate(lead.updatedAt)}</span>
                      </div>
                      {lead.lastContactAt && (
                        <div className="flex justify-between p-2 bg-slate-50 rounded-lg">
                          <span className="text-slate-500">Ultimo contato</span>
                          <span className="font-medium text-slate-700">{formatDate(lead.lastContactAt)}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Tags */}
                    <div className="pt-2">
                      <Label className="text-xs text-slate-500 flex items-center gap-1 mb-2">
                        <Tag size={14} />
                        Tags
                      </Label>
                      {isEditing ? (
                        <Input
                          value={(editData.tags || []).join(', ')}
                          onChange={(e) => updateField('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                          placeholder="Tags separadas por virgula"
                          className="h-9"
                        />
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {lead.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {lead.tags.length === 0 && (
                            <span className="text-sm text-slate-400">Sem tags</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Meetings Tab */}
              <TabsContent value="meetings">
                {lead.meetings.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <Calendar className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p>Nenhuma reuniao agendada</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {lead.meetings.map((meeting) => {
                      const MeetingIcon = meetingIcons[meeting.type];
                      return (
                        <div 
                          key={meeting.id} 
                          className={`p-4 rounded-xl border ${meeting.completed ? 'bg-slate-50 border-slate-200' : 'bg-blue-50 border-blue-200'}`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <MeetingIcon size={18} className={meeting.completed ? 'text-slate-500' : 'text-blue-600'} />
                              <span className="font-semibold text-sm">
                                {meeting.type === 'call' ? 'Ligacao' : meeting.type === 'video' ? 'Videoconferencia' : 'Presencial'}
                              </span>
                            </div>
                            <Badge variant={meeting.completed ? 'secondary' : 'default'} className="text-xs">
                              {meeting.completed ? 'Concluida' : 'Agendada'}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {formatDate(meeting.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {meeting.time}
                            </span>
                          </div>
                          {meeting.notes && (
                            <p className="mt-3 text-sm text-slate-600 bg-white/50 p-2 rounded-lg">{meeting.notes}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </TabsContent>

              {/* Interests Tab */}
              <TabsContent value="interests">
                {lead.interests.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <TrendingUp className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p>Nenhum interesse registrado</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {lead.interests.map((interest) => (
                      <div key={interest.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center gap-3">
                          <TrendingUp size={18} className="text-slate-500" />
                          <span className="font-medium text-slate-700">{interest.service}</span>
                        </div>
                        <Badge 
                          variant="outline"
                          className={
                            interest.priority === 'alta' ? 'border-red-300 text-red-700 bg-red-50' :
                            interest.priority === 'media' ? 'border-yellow-300 text-yellow-700 bg-yellow-50' :
                            'border-slate-300 text-slate-600 bg-slate-50'
                          }
                        >
                          {interest.priority.charAt(0).toUpperCase() + interest.priority.slice(1)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes">
                {lead.notes.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p>Nenhuma nota registrada</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {lead.notes.map((note) => (
                      <div key={note.id} className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                        <p className="text-sm text-slate-700 leading-relaxed">{note.content}</p>
                        <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
                          <FileText size={12} />
                          <span className="font-medium">{note.author}</span>
                          <span>-</span>
                          <span>{formatDate(note.createdAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
