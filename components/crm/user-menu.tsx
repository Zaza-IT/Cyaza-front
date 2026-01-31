'use client';

import { logout } from '@/lib/auth/actions';
import type { User, Tenant } from '@/lib/auth/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User as UserIcon, Building2 } from 'lucide-react';

interface UserMenuProps {
  user: User;
  tenant: Tenant;
}

export function UserMenu({ user, tenant }: UserMenuProps) {
  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  
  const roleLabels: Record<string, string> = {
    admin: 'Administrador',
    manager: 'Gerente',
    sales: 'Vendedor',
    viewer: 'Visualizador',
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-slate-900">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xs text-slate-500">{roleLabels[user.role]}</p>
        </div>
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-slate-900 text-white text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-muted-foreground">@{user.username}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled className="text-xs">
          <Building2 className="mr-2 h-4 w-4" />
          <span>{tenant.name}</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled className="text-xs">
          <UserIcon className="mr-2 h-4 w-4" />
          <span>{roleLabels[user.role]}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive cursor-pointer"
          onClick={() => logout()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
