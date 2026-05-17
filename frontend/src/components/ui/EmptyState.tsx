import { ListTodo } from 'lucide-react';
import Link from 'next/link';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mb-6 border border-slate-700">
        <ListTodo size={40} className="text-slate-500" />
      </div>
      <h3 className="text-xl font-medium text-white mb-2">Nenhuma tarefa encontrada</h3>
      <p className="text-slate-400 max-w-sm mb-6">
        Você não possui tarefas que correspondam aos filtros atuais ou ainda não criou nenhuma.
      </p>
      <Link 
        href="/tasks/new"
        className="px-6 py-2.5 bg-white text-black font-medium rounded-lg hover:bg-slate-200 transition-colors"
      >
        Criar Primeira Tarefa
      </Link>
    </div>
  );
}
