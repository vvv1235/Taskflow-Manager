"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Category, Task, TaskStats } from "@/types";
import { FilterBar } from "@/components/tasks/FilterBar";
import { TaskCard } from "@/components/tasks/TaskCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { CheckCircle2, Clock, ListTodo } from "lucide-react";
import toast from "react-hot-toast";

export default function Dashboard() {
  // Estados globais da página
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState<TaskStats>({ total: 0, pending: 0, inProgress: 0, completed: 0 });
  const [loading, setLoading] = useState(true);

  // Função central para buscar os dados de estatística, categorias e a lista de tarefas
  const fetchDashboardData = async (filters = {}) => {
    try {
      setLoading(true);
      // Promise.all permite que as 3 requisições ocorram paralelamente, reduzindo o tempo de carregamento
      const [tasksRes, categoriesRes, statsRes] = await Promise.all([
        api.get<Task[]>('/tasks', { params: filters }),
        api.get<Category[]>('/categories'),
        api.get<TaskStats>('/tasks/stats')
      ]);
      setTasks(tasksRes.data);
      setCategories(categoriesRes.data);
      setStats(statsRes.data);
    } catch (error) {
      toast.error('Erro ao buscar dados do painel');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Quando a página é montada no navegador, chama a função vazia (sem filtros iniciais)
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Intercepta mudanças do componente FilterBar e refaz a requisição na API com os novos filtros
  const handleFilterChange = (filters: any) => {
    fetchDashboardData(filters);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-12">
      {/* Header and Welcome */}
      <div>
        <h1 className="text-5xl font-handwriting text-[#1e3a8a] mb-2 font-bold transform -rotate-1">Seu Diário</h1>
        <p className="text-[#57534e] text-lg font-medium">Acompanhe e desenhe todas as suas tarefas em um só lugar.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
        <StatCard title="Total de Anotações" value={stats.total} icon={<ListTodo size={24} className="text-[#1d4ed8]"/>} highlight="rotate-1 bg-[#f0eade]" />
        <StatCard title="Rascunhos" value={stats.pending} icon={<CircleIcon/>} highlight="-rotate-1 bg-[#e2e8f0]" />
        <StatCard title="Sendo Feitas" value={stats.inProgress} icon={<Clock size={24} className="text-[#2563eb]"/>} highlight="rotate-1 bg-[#bae6fd]" />
        <StatCard title="Finalizadas" value={stats.completed} icon={<CheckCircle2 size={24} className="text-[#15803d]"/>} highlight="-rotate-1 bg-[#bbf7d0]" />
      </div>

      {/* Filters */}
      <FilterBar categories={categories} onFilterChange={handleFilterChange} />

      {/* Task List */}
      <div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-48 bg-[#d4bd9b]/30 animate-pulse rounded-md" />
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, highlight }: { title: string, value: number, icon: React.ReactNode, highlight?: string }) {
  return (
    <div className={`p-4 border-2 border-dashed border-black/20 shadow-md ${highlight || ''} hand-drawn-border`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#44403c] font-bold text-sm tracking-wide">{title}</h3>
        {icon}
      </div>
      <p className="text-4xl font-handwriting font-bold text-[#1e3a8a]">{value}</p>
    </div>
  );
}

function CircleIcon() {
  return <div className="w-6 h-6 rounded-full border-2 border-slate-500/50" />;
}
