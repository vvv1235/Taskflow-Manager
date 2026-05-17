"use client";

import { Category } from '@/types';
import { Filter, Search } from 'lucide-react';
import { useCallback, useState } from 'react';

interface FilterBarProps {
  categories: Category[];
  onFilterChange: (filters: { status?: string, priority?: string, categoryId?: string, search?: string }) => void;
}

export function FilterBar({ categories, onFilterChange }: FilterBarProps) {
  const [search, setSearch] = useState('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    if (target.name === 'search') setSearch(target.value);
    
    // Defer the API call slightly or a formal submit for search can be used, but simple form handling is okay here
    const form = target.closest('form');
    if (form && target.name !== 'search') {
      const formData = new FormData(form);
      onFilterChange({
        status: formData.get('status') as string,
        priority: formData.get('priority') as string,
        categoryId: formData.get('categoryId') as string,
        search: search // keep current search state
      });
    }
  }, [onFilterChange, search]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onFilterChange({
      status: formData.get('status') as string,
      priority: formData.get('priority') as string,
      categoryId: formData.get('categoryId') as string,
      search: search
    });
  }

  return (
    <form onSubmit={handleSearchSubmit} className="bg-[#f0eade]/80 hand-drawn-border border-2 border-[#d4bd9b] p-4 flex flex-col md:flex-row gap-4 mb-8 shadow-sm">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
        <input 
          type="text" 
          name="search"
          value={search}
          onChange={handleChange}
          placeholder="Pesquisar nos registros..."
          className="w-full bg-transparent border-b-2 border-dashed border-[#a8a29e] rounded-none pl-10 pr-4 py-2 font-handwriting text-2xl text-[#1e3a8a] focus:outline-none focus:border-[#1d4ed8] transition-all placeholder-slate-500"
        />
      </div>
      
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 border-b-2 border-[#a8a29e]">
          <select title="Status" name="status" onChange={handleChange} className="bg-transparent font-handwriting text-2xl text-[#44403c] outline-none cursor-pointer">
            <option value="">Todos Status</option>
            <option value="PENDING">Pendente</option>
            <option value="IN_PROGRESS">Fazendo</option>
            <option value="COMPLETED">Pronto</option>
          </select>
        </div>

        <select title="Prioridade" name="priority" onChange={handleChange} className="bg-transparent border-b-2 border-[#a8a29e] px-2 py-1 font-handwriting text-2xl text-[#44403c] outline-none cursor-pointer focus:border-[#1d4ed8]">
          <option value="">Qualquer Urgência</option>
          <option value="LOW">Baixa</option>
          <option value="MEDIUM">Média</option>
          <option value="HIGH">Alta</option>
        </select>

        <select title="Categoria" name="categoryId" onChange={handleChange} className="bg-transparent border-b-2 border-[#a8a29e] px-2 py-1 font-handwriting text-2xl text-[#44403c] outline-none cursor-pointer focus:border-[#1d4ed8]">
          <option value="">Sem Categoria Específica</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        
        <button type="submit" className="hidden">Submit Search</button>
      </div>
    </form>
  );
}
