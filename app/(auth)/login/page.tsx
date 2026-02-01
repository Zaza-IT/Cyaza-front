'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { login, type LoginFormState } from '@/lib/auth/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2, Building2 } from 'lucide-react';

const initialState: LoginFormState = {
  success: false,
  error: undefined,
};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F6F8] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-slate-900">
            <Building2 className="h-7 w-7 text-white" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">CRM Nexus</CardTitle>
            <CardDescription className="text-muted-foreground">
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            {state.error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Digite seu usuário"
                required
                disabled={isPending}
                autoComplete="username"
                autoFocus
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Digite sua senha"
                required
                disabled={isPending}
                autoComplete="current-password"
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>
          
          <div className="mt-6 pt-6 border-t space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Ainda não tem uma conta?{' '}
                <Link 
                  href="/signup" 
                  className="font-medium text-primary hover:underline"
                >
                  Criar conta
                </Link>
              </p>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground text-center">
                Credenciais de demonstração:
              </p>
              <div className="mt-2 space-y-1 text-xs text-muted-foreground text-center">
                <p><span className="font-medium">admin</span> / admin123</p>
                <p><span className="font-medium">carlos</span> / carlos123</p>
                <p><span className="font-medium">ana</span> / ana123</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
