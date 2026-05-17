"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  CheckSquare, 
  Tags, 
  Settings, 
  Plus, 
  Book,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Minhas Tarefas', href: '/', icon: CheckSquare },
  { name: 'Categorias', href: '/categories', icon: Tags },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-full hidden md:flex flex-col border-r-2 border-[#d4bd9b] bg-[#efe7d3] z-20 relative shadow-[4px_0_20px_rgba(0,0,0,0.06)]">
      {/* Detalhe de espiral/furos de caderno */}
      <div className="absolute top-0 bottom-0 -right-2 w-4 flex flex-col justify-evenly">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-4 h-4 rounded-full bg-[#fdfbf7] border-2 border-[#d4bd9b] shadow-inner" />
        ))}
      </div>

      {/* Brand */}
      <div className="h-20 flex items-center px-6">
        <div className="flex items-center gap-3 transform -rotate-2">
          <Book size={32} className="text-[#dc2626]" />
          <span className="font-bold text-3xl font-handwriting text-[#1e3a8a]">TaskFlow</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-8 px-4 flex flex-col gap-3">
        <p className="px-3 text-sm font-handwriting text-[#b45309] uppercase tracking-wider mb-2 -rotate-1 origin-left">Seu Diário</p>
        
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
                           (pathname.startsWith('/tasks') && item.href === '/' && pathname !== '/tasks/new');
          
          return (
            <Link key={item.name} href={item.href} className="relative group">
              <div className={cn(
                "relative z-10 flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 transform",
                isActive 
                  ? "bg-white shadow-sm border-2 border-[#d4bd9b] text-[#1e3a8a] -translate-x-1 hand-drawn-border" 
                  : "text-[#57534e] hover:bg-white/50 hover:text-[#1d4ed8] border-2 border-transparent"
              )}>
                <item.icon size={22} className={isActive ? "stroke-[2.5px] text-[#dc2626]" : ""} />
                <span className={isActive ? "font-handwriting text-2xl" : "font-handwriting text-xl text-[#44403c] group-hover:text-[#1d4ed8]"}>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Action Area */}
      <div className="p-6 border-t-2 border-dashed border-[#d4bd9b]">
        <Link 
          href="/tasks/new"
          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-md font-handwriting text-2xl text-[#fdfbf7] bg-[#1e3a8a] hover:bg-[#1d4ed8] shadow-[3px_4px_0_rgba(30,58,138,0.3)] transition-all duration-300 transform hover:scale-105 active:scale-95 hand-drawn-border -rotate-1"
        >
          <Plus size={22} />
          <span>Nova Tarefa</span>
        </Link>
      </div>
      
      {/* User Profile Summary */}
      <div className="p-4 mt-auto mb-4 mx-4 bg-white/60 rounded-md border-2 border-[#d4bd9b] hand-drawn-border rotate-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#fca5a5] border-2 border-[#dc2626] flex flex-shrink-0 items-center justify-center font-handwriting text-2xl text-[#7f1d1d] shadow-sm transform -rotate-3">
            A
          </div>
          <div className="overflow-hidden">
            <p className="font-handwriting text-xl text-[#1e3a8a] truncate">Admin User</p>
            <p className="text-xs font-bold text-[#57534e] truncate">admin@taskflow.com</p>
          </div>
          <button className="ml-auto text-[#78716c] hover:text-[#dc2626] transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>
    </aside>
  );
}
