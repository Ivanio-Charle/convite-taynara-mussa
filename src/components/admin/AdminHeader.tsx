'use client';

import { useRouter, usePathname } from 'next/navigation';
import { LogOut, Users, LayoutDashboard, ArrowLeft, RefreshCw, Download } from 'lucide-react';
import Link from 'next/link';

interface AdminHeaderProps {
  title: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export default function AdminHeader({ title, onRefresh, isRefreshing }: AdminHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const isHome = pathname === '/admin';

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-sand-300 px-4 py-3 shadow-sm">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {!isHome ? (
            <Link
              href="/admin"
              className="w-9 h-9 rounded-full bg-sand-100 flex items-center justify-center text-charcoal-700 hover:bg-sand-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
          ) : (
            <div className="w-9 h-9 rounded-full bg-champagne-100 flex items-center justify-center text-champagne-600 font-serif font-bold text-sm">
              T
            </div>
          )}
          <div>
            <h1 className="font-serif text-lg font-semibold text-charcoal-900 leading-tight">
              {title}
            </h1>
            <p className="text-[10px] text-charcoal-800 uppercase tracking-widest font-medium">
              Painel da Anfitriã
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-full text-charcoal-600 hover:bg-sand-100 transition-colors active:scale-95"
              title="Atualizar dados"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-champagne-500' : ''}`} />
            </button>
          )}

          <a
            href="/api/admin/export"
            download
            className="p-2 rounded-full text-champagne-600 hover:bg-champagne-50 transition-colors"
            title="Exportar CSV"
          >
            <Download className="w-4 h-4" />
          </a>

          <button
            onClick={handleLogout}
            className="p-2 rounded-full text-rose-500 hover:bg-rose-50 transition-colors"
            title="Sair"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Navigation Tabs for Mobile */}
      <div className="max-w-md mx-auto mt-2 pt-2 border-t border-sand-200 flex items-center justify-around text-xs font-medium text-charcoal-800">
        <Link
          href="/admin"
          className={`flex items-center gap-1.5 py-1.5 px-3 rounded-full transition-all ${
            isHome ? 'bg-charcoal-900 text-white shadow-sm' : 'hover:bg-sand-100'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/admin/convidados"
          className={`flex items-center gap-1.5 py-1.5 px-3 rounded-full transition-all ${
            pathname.startsWith('/admin/convidados') ? 'bg-charcoal-900 text-white shadow-sm' : 'hover:bg-sand-100'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Convidados</span>
        </Link>
      </div>
    </header>
  );
}
