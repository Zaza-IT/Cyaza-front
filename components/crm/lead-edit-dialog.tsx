"use client";

import React from "react"

import { useState, useEffect } from 'react';
import type { Lead, LeadStage, LeadTemperature, LeadSource } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Save, X } from 'lucide-react';

interface LeadEditDialogProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (leadId: string, data: Partial<Lead>) => Promise<void>;
}

const stages: { value: LeadStage; label: string }[] = [
  { value: 'novo', label: 'Novo' },
  { value: 'contato', label: 'Em Contato' },
  { value: 'qualificado', label: 'Qualificado' },
  { value: 'proposta', label: 'Proposta' },
  { value: 'negociacao', label: 'Negociação' },
  { value: 'ganho', label: 'Ganho' },
  { value: 'perdido', label: 'Perdido' },
];

const temperatures: { value: LeadTemperature; label: string }[] = [
  { value: 'frio', label: 'Frio' },
  { value: 'morno', label: 'Morno' },
  { value: 'quente', label: 'Quente' },
];

const sources: { value: LeadSource; label: string }[] = [
  { value: 'website', label: 'Website' },
  { value: 'indicacao', label: 'Indicação' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'evento', label: 'Evento' },
  { value: 'cold_call', label: 'Cold Call' },
  { value: 'outro', label: 'Outro' },
];

export function LeadEditDialog({ lead, open, onOpenChange, onSave }: LeadEditDialogProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Lead>>({});

  // Reset form when lead changes
  useEffect(() => {
    if (lead) {
      setFormData({
        name: lead.name,
        company: lead.company,
        position: lead.position,
        contact: { ...lead.contact },
        estimatedValue: lead.estimatedValue,
        stage: lead.stage,
        temperature: lead.temperature,
        source: lead.source,
        responsible: lead.responsible,
        nextFollowUp: lead.nextFollowUp,
        tags: lead.tags,
      });
    }
  }, [lead]);

  if (!lead) return null;

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value } as Lead['contact'],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(lead.id, formData);
      onOpenChange(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Lead</DialogTitle>
          <DialogDescription>
            Atualize as informações do lead. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input
                id="company"
                value={formData.company || ''}
                onChange={(e) => handleInputChange('company', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="position">Cargo</Label>
              <Input
                id="position"
                value={formData.position || ''}
                onChange={(e) => handleInputChange('position', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimatedValue">Valor Estimado (R$)</Label>
              <Input
                id="estimatedValue"
                type="number"
                value={formData.estimatedValue || 0}
                onChange={(e) => handleInputChange('estimatedValue', Number(e.target.value))}
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.contact?.email || ''}
              onChange={(e) => handleContactChange('email', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={formData.contact?.phone || ''}
                onChange={(e) => handleContactChange('phone', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                value={formData.contact?.whatsapp || ''}
                onChange={(e) => handleContactChange('whatsapp', e.target.value)}
              />
            </div>
          </div>

          {/* Status Fields */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Estágio</Label>
              <Select
                value={formData.stage}
                onValueChange={(value) => handleInputChange('stage', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((stage) => (
                    <SelectItem key={stage.value} value={stage.value}>
                      {stage.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Temperatura</Label>
              <Select
                value={formData.temperature}
                onValueChange={(value) => handleInputChange('temperature', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {temperatures.map((temp) => (
                    <SelectItem key={temp.value} value={temp.value}>
                      {temp.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Fonte</Label>
              <Select
                value={formData.source}
                onValueChange={(value) => handleInputChange('source', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sources.map((source) => (
                    <SelectItem key={source.value} value={source.value}>
                      {source.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Follow-up Date */}
          <div className="space-y-2">
            <Label htmlFor="nextFollowUp">Próximo Follow-up</Label>
            <Input
              id="nextFollowUp"
              type="date"
              value={formData.nextFollowUp || ''}
              onChange={(e) => handleInputChange('nextFollowUp', e.target.value)}
            />
          </div>

          {/* Responsible */}
          <div className="space-y-2">
            <Label htmlFor="responsible">Responsável</Label>
            <Input
              id="responsible"
              value={formData.responsible || ''}
              onChange={(e) => handleInputChange('responsible', e.target.value)}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
              <X size={16} className="mr-1" />
              Cancelar
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 size={16} className="mr-1 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save size={16} className="mr-1" />
                  Salvar
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
