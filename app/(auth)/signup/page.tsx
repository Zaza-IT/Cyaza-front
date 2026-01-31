'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { signUp, type SignUpFormState } from '@/lib/auth/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2, Building2, UserPlus } from 'lucide-react';

const initialState: SignUpFormState = {
  success: false,
  error: undefined,
  errors: undefined,
};

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(signUp, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F6F8] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-slate-900">
            <Building2 className="h-7 w-7 text-white" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">Criar Conta</CardTitle>
            <CardDescription className="text-muted-foreground">
              Preencha os dados abaixo para criar sua conta no CRM Nexus
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            {state.error && !state.errors && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nome</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Seu nome"
                  required
                  disabled={isPending}
                  autoComplete="given-name"
                  autoFocus
                  aria-invalid={!!state.errors?.firstName}
                />
                {state.errors?.firstName && (
                  <p className="text-sm text-destructive">{state.errors.firstName}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Sobrenome</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Seu sobrenome"
                  required
                  disabled={isPending}
                  autoComplete="family-name"
                  aria-invalid={!!state.errors?.lastName}
                />
                {state.errors?.lastName && (
                  <p className="text-sm text-destructive">{state.errors.lastName}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Escolha um nome de usuário"
                required
                disabled={isPending}
                autoComplete="username"
                aria-invalid={!!state.errors?.username}
              />
              {state.errors?.username && (
                <p className="text-sm text-destructive">{state.errors.username}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Crie uma senha segura"
                required
                disabled={isPending}
                autoComplete="new-password"
                aria-invalid={!!state.errors?.password}
              />
              {state.errors?.password && (
                <p className="text-sm text-destructive">{state.errors.password}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Digite a senha novamente"
                required
                disabled={isPending}
                autoComplete="new-password"
                aria-invalid={!!state.errors?.confirmPassword}
              />
              {state.errors?.confirmPassword && (
                <p className="text-sm text-destructive">{state.errors.confirmPassword}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tenantName">
                Nome da Empresa <span className="text-muted-foreground font-normal">(opcional)</span>
              </Label>
              <Input
                id="tenantName"
                name="tenantName"
                type="text"
                placeholder="Criar nova empresa"
                disabled={isPending}
                autoComplete="organization"
              />
              <p className="text-xs text-muted-foreground">
                Deixe em branco para entrar na empresa de demonstração
              </p>
            </div>
            
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Criar Conta
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-6 pt-6 border-t text-center">
            <p className="text-sm text-muted-foreground">
              Já possui uma conta?{' '}
              <Link 
                href="/login" 
                className="font-medium text-primary hover:underline"
              >
                Entrar
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
