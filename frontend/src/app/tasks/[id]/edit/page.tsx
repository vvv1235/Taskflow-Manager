"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/api";
import { Category, Task } from "@/types";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

type TaskFormData = {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  categoryIds: number[];
};

export default function TaskForm() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isEditing = !!id && id !== 'new';
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    dueDate: "",
    priority: "MEDIUM",
    status: "PENDING",
    categoryIds: [],
  });

  useEffect(() => {
    const fetchCategoriesAndTask = async () => {
      try {
        const catRes = await api.get<Category[]>('/categories');
        setCategories(catRes.data);

        if (isEditing) {
          const taskRes = await api.get<Task>(`/tasks/${id}`);
          const task = taskRes.data;
          
          let dateStr = "";
          if (task.dueDate) {
            const d = new Date(task.dueDate);
            dateStr = d.toISOString().split('T')[0];
          }

          setFormData({
            title: task.title,
            description: task.description || "",
            dueDate: dateStr,
            priority: task.priority,
            status: task.status,
            categoryIds: task.categories.map(c => c.id),
          });
        }
      } catch (error) {
        toast.error('Erro ao carregar dados');
        console.error(error);
      } finally {
        setFetching(false);
      }
    };
    
    fetchCategoriesAndTask();
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryToggle = (catId: number) => {
    setFormData(prev => {
      const isSelected = prev.categoryIds.includes(catId);
      if (isSelected) {
        return { ...prev, categoryIds: prev.categoryIds.filter(id => id !== catId) };
      } else {
        return { ...prev, categoryIds: [...prev.categoryIds, catId] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : undefined,
      };

      if (isEditing) {
        await api.put(`/tasks/${id}`, payload);
        toast.success("Tarefa atualizada com sucesso!");
        router.push(`/tasks/${id}`);
      } else {
        await api.post('/tasks', payload);
        toast.success("Tarefa criada com sucesso!");
        router.push('/');
      }
    } catch (error) {
      toast.error('Erro ao salvar a tarefa. Verifique os campos.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="max-w-3xl mx-auto p-4"><div className="bg-[#f0eade] border-2 border-dashed border-[#d4bd9b] rounded-sm hand-drawn-border h-96 animate-pulse" /></div>;

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <Link href={isEditing ? `/tasks/${id}` : "/"} className="inline-flex items-center gap-2 text-[#44403c] hover:text-[#1d4ed8] font-handwriting text-2xl transition-colors mb-6">
        <ArrowLeft size={22} />
        {isEditing ? "Desistir de Editar" : "Rasgar Folha"}
      </Link>

      <div className="bg-[#fdfbf7] shadow-[2px_5px_15px_rgba(0,0,0,0.05)] border-2 border-[#d4bd9b] relative overflow-hidden hand-drawn-border transform -rotate-1">
        {/* Lado esquerdo margem vermelha */}
        <div className="absolute top-0 bottom-0 left-10 w-0.5 bg-red-400/30 z-0 hidden sm:block" />

        <div className="p-6 md:p-10 relative z-10 pl-6 sm:pl-16">
          <h1 className="text-4xl font-handwriting font-bold text-[#1e3a8a] mb-8 transform -rotate-1">
            {isEditing ? "Corrigir Anotação" : "Nova Anotação"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-2xl font-handwriting font-bold text-[#1d4ed8] mb-2">Título Principal *</label>
              <input 
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Tirar foto do pôr do sol..."
                className="w-full bg-transparent border-b-2 border-dashed border-[#a8a29e] rounded-none px-2 py-2 text-2xl font-handwriting text-[#44403c] focus:outline-none focus:border-[#1e3a8a] transition-all placeholder-slate-400"
              />
            </div>

            <div>
              <label className="block text-2xl font-handwriting font-bold text-[#1d4ed8] mb-2">Rabiscos / Descrição</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Detalhes..."
                className="w-full bg-transparent border-b-2 border-l-2 border-dashed border-[#a8a29e] bg-[#1d4ed8]/5 p-4 text-xl font-medium text-[#44403c] focus:outline-none focus:border-[#1e3a8a] transition-all resize-none shadow-inner"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-2xl font-handwriting font-bold text-[#1d4ed8] mb-2">Até quando?</label>
                <input 
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full bg-white/50 border-2 border-dashed border-[#a8a29e] rounded-sm px-4 py-2 font-handwriting text-2xl text-[#44403c] focus:outline-none focus:border-[#1e3a8a] transition-all cursor-pointer shadow-sm"
                />
              </div>

              <div>
                <label className="block text-2xl font-handwriting font-bold text-[#1d4ed8] mb-2">Nível de Importância</label>
                <select 
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full bg-white/50 border-2 border-dashed border-[#a8a29e] rounded-sm px-4 py-2 font-handwriting text-2xl text-[#44403c] focus:outline-none focus:border-[#1e3a8a] transition-all cursor-pointer shadow-sm"
                >
                  <option value="LOW">Baixa</option>
                  <option value="MEDIUM">Média</option>
                  <option value="HIGH">Alta</option>
                </select>
              </div>
            </div>
            
            {isEditing && (
              <div>
                <label className="block text-2xl font-handwriting font-bold text-[#1d4ed8] mb-2">Situação Atual</label>
                <select 
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-[#fef08a] border-2 border-dashed border-[#eab308] rounded-sm px-4 py-2 font-handwriting text-2xl text-[#453c0a] focus:outline-none transition-all cursor-pointer shadow-md transform rotate-1"
                >
                  <option value="PENDING">Anotado</option>
                  <option value="IN_PROGRESS">Fazendo Agora</option>
                  <option value="COMPLETED">Já era!</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-2xl font-handwriting font-bold text-[#1d4ed8] mb-3">Clipes & Etiquetas</label>
              <div className="flex flex-wrap gap-4">
                {categories.map((cat) => {
                  const isSelected = formData.categoryIds.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryToggle(cat.id)}
                      className={`px-4 py-2 border-2 flex items-center gap-2 transition-transform transform shadow-sm hand-drawn-border ${
                        isSelected 
                          ? 'bg-[#1e3a8a] border-[#1e3a8a] text-white rotate-2 scale-105' 
                          : 'bg-white border-[#d4bd9b] text-[#57534e] hover:border-[#1e3a8a] hover:-rotate-1'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: cat.color }} />
                      <span className="font-bold text-sm tracking-wide">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-8 border-t-2 border-dashed border-[#d4bd9b] flex justify-end gap-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2.5 font-handwriting text-2xl font-bold text-[#44403c] hover:text-[#dc2626] border-2 border-transparent hover:border-[#dc2626] transition-all hand-drawn-border"
              >
                Esquecer
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-8 py-2.5 font-handwriting text-2xl font-bold text-white bg-[#1e3a8a] hover:bg-[#1d4ed8] border-2 border-[#1e3a8a] shadow-[4px_6px_0_rgba(30,58,138,0.2)] transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0 hand-drawn-border -rotate-1"
              >
                <Save size={20} />
                {loading ? "Riscando..." : (isEditing ? "Reescrever" : "Grudar Tarefa")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
