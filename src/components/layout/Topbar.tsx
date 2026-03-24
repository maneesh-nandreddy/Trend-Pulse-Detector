'use client';

import { Bell, Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Topbar() {
  return (
    <header className="h-16 border-b border-[#1e293b] bg-[#0f172a]/80 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-6">
      <div className="flex-1 flex items-center gap-4 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input 
            placeholder="Search topics, keywords, platforms... (Press '/')" 
            className="pl-9 bg-slate-900/50 border-slate-800 text-slate-200 placeholder:text-slate-500 focus-visible:ring-blue-500 rounded-full h-9"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4 pl-4">
        <button className="relative p-2 rounded-full hover:bg-slate-800/50 text-slate-400 hover:text-slate-300 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-500 border border-[#0f172a]"></span>
        </button>
        
        <div className="h-6 w-px bg-[#1e293b] mx-1"></div>
        
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium text-slate-200">Admin User</div>
            <div className="text-xs text-slate-500">Pro Plan</div>
          </div>
          <Avatar className="h-9 w-9 border border-slate-800">
            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            <AvatarFallback className="bg-slate-800 text-slate-300">AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
