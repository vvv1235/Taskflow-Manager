"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Task } from "@/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { ArrowLeft, Calendar, Edit3, Tag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import toast from "react-hot-toast";

export default function TaskDetail() {
  const router = useRouter(); // Utilizado para redirecionar o usuário após exclusão (ex: push para '/')
  const params = useParams(); // Resgata os parâmetros dinâmicos da URL
  const id = params.id as string;
  
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Busca os detalhes aprofundados da tarefa
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get<Task>(`/tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        toast.error('Erro ao buscar tarefa');
        console.error(error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id, router]);

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      // Auto-cancela a confirmação se o usuário não clicar novamente em 3 segundos
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    
    try {
      await api.delete(`/tasks/${id}`);
      toast.success('Tarefa excluída com sucesso');
      window.location.href = '/';
    } catch (error) {
      toast.error('Erro ao excluir tarefa');
      console.error(error);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      const res = await api.patch(`/tasks/${id}/status`, { status: newStatus });
      setTask(res.data);
      toast.success('Status atualizado!');
    } catch (error) {
      toast.error('Erro ao atualizar status');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8 glass-panel animate-pulse h-96"></div>
    );
  }

  if (!task) return null;

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <Link href="/" className="inline-flex items-center gap-2 text-[#44403c] hover:text-[#1d4ed8] mb-6 transition-colors font-handwriting text-2xl">
        <ArrowLeft size={22} />
        Voltar para Diário
      </Link>

      <div className="bg-[#f9f5eb] shadow-md border-2 border-dashed border-[#d4bd9b] pb-8 hand-drawn-border transform rotate-1">
        {/* Header Ribbon / Tape */}
        <div className="h-6 opacity-30 w-32 bg-[#ef4444] mx-auto -mt-3 transform -rotate-2 hand-drawn-border shadow-sm mb-4" />
        
        <div className="p-8 md:p-10 pt-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <h1 className="text-5xl font-handwriting font-bold text-[#1e3a8a] leading-tight">
              {task.title}
            </h1>

            <div className="flex items-center gap-3 shrink-0">
              <Link 
                href={`/tasks/${task.id}/edit`} 
                className="p-2.5 rounded-lg border-2 border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white transition-colors hand-drawn-border"
                title="Editar Tarefa"
              >
                <Edit3 size={20} />
              </Link>
              <button 
                onClick={handleDelete}
                className={`p-2.5 rounded-lg border-2 transition-colors flex items-center gap-2 hand-drawn-border ${
                  confirmDelete 
                  ? 'bg-[#ef4444] text-white border-[#ef4444] animate-pulse' 
                  : 'border-[#ef4444] text-[#ef4444] hover:bg-[#ef4444] hover:text-white'
                }`}
                title="Excluir Tarefa"
              >
                <Trash2 size={20} />
                {confirmDelete && <span className="font-handwriting text-xl px-1">Certeza?</span>}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b-2 border-dashed border-[#d4bd9b]">
            <div className="flex items-center gap-2 px-3 py-1.5 border-b-2 border-[#1d4ed8]">
              <span className="text-[#44403c] text-xl font-handwriting">Situação:</span>
              <select 
                value={task.status} 
                onChange={(e) => handleStatusChange(e.target.value)}
                className="bg-transparent text-[#1d4ed8] font-handwriting text-2xl outline-none cursor-pointer font-bold"
              >
                <option value="PENDING" className="text-black">Pendente</option>
                <option value="IN_PROGRESS" className="text-black">Sendo Feita</option>
                <option value="COMPLETED" className="text-black">Pronto</option>
              </select>
            </div>
            
            <PriorityBadge priority={task.priority} className="text-sm px-3 py-1.5 shadow-sm hand-drawn-border" />
            
            {task.dueDate && (
              <div className="flex items-center gap-2 px-3 py-1.5 text-[#1e3a8a] text-xl font-handwriting font-bold">
                <Calendar size={18} className="text-[#ef4444]" />
                {format(new Date(task.dueDate), "dd 'de' MMMM, yyyy", { locale: ptBR })}
              </div>
            )}
            
            <div className="text-[#78716c] font-handwriting text-xl ml-auto">
              Anotado em {format(new Date(task.createdAt), "dd/MM/yyyy")}
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-2xl font-handwriting text-[#1d4ed8] font-bold mb-4">Anotações / Descrição</h3>
            {task.description ? (
              <div className="text-[#44403c] whitespace-pre-wrap leading-loose font-medium text-lg px-2 border-l-4 border-[#1d4ed8]/20 bg-[#1d4ed8]/5 py-2">
                {task.description}
              </div>
            ) : (
              <p className="text-[#a8a29e] italic font-handwriting text-2xl">Nada anotado aqui...</p>
            )}
          </div>

          <div>
            <h3 className="text-2xl font-handwriting text-[#1d4ed8] font-bold mb-4 flex items-center gap-2">
              <Tag size={22} className="text-[#ef4444]" />
              Tags anexadas
            </h3>
            {task.categories.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {task.categories.map((cat) => (
                  <span 
                    key={cat.id} 
                    className="px-4 py-2 bg-white border-2 border-black/10 text-[#44403c] flex items-center gap-2 font-bold shadow-sm transform -rotate-1 hover:rotate-0 transition-transform"
                  >
                    <span className="w-3 h-3 rounded-full shadow-inner" style={{ backgroundColor: cat.color }} />
                    <span className="">{cat.name}</span>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[#a8a29e] italic font-handwriting text-2xl">Anotação solta, sem cadernos...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
