'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Activity, Search, Bell, FileText, Settings, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Live Monitor', href: '/monitor', icon: Activity },
  { name: 'Explore', href: '/explore', icon: Search },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Integrations', href: '/onboarding', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isConnected } = useStore();

  return (
    <aside className="w-64 border-r border-[#1e293b] bg-[#0f172a]/95 backdrop-blur-md hidden md:flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-[#1e293b]">
        <div className="flex items-center gap-2 text-blue-400 font-bold text-xl tracking-tight">
          <Zap className="h-6 w-6" />
          TrendPulse
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive 
                  ? "bg-blue-500/10 text-blue-400" 
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300")} />
              {item.name}
              
              {item.name === 'Alerts' && (
                <span className="ml-auto bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  3
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#1e293b]">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-800">
          <div className="relative flex h-3 w-3">
            {isConnected ? (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </>
            ) : (
                <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-500"></span>
            )}
          </div>
          <div className="text-xs text-slate-400">
            {isConnected ? 'Kafka Stream Active' : 'Connecting...'}
          </div>
        </div>
      </div>
    </aside>
  );
}
