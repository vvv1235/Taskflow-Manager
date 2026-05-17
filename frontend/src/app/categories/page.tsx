"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Category } from "@/types";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { format } from "date-fns";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<(Category & { _count?: { tasks: number } })[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCatName, setNewCatName] = useState("");
  const [newCatColor, setNewCatColor] = useState("#6366f1");
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (error) {
      toast.error('Erro ao carregar categorias');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    try {
      await api.post('/categories', { name: newCatName, color: newCatColor });
      toast.success('Categoria criada!');
      setNewCatName("");
      fetchCategories();
    } catch (error) {
      toast.error('Erro ao criar categoria. Talvez este nome já exista.');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirmDeleteId !== id) {
      setConfirmDeleteId(id);
      setTimeout(() => setConfirmDeleteId(null), 3000);
      return;
    }

    try {
      await api.delete(`/categories/${id}`);
      toast.success('Categoria excluída');
      setConfirmDeleteId(null);
      fetchCategories();
    } catch (error) {
      toast.error('Erro ao excluir');
    }
  };

  if (loading) return <div className="max-w-4xl mx-auto p-4"><div className="bg-[#f0eade] h-96 animate-pulse hand-drawn-border" /></div>;

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-5xl font-handwriting font-bold text-[#1e3a8a] mb-2 transform -rotate-1">Categorias & Etiquetas</h1>
        <p className="text-[#57534e] font-medium text-lg">Organize suas páginas dividindo-as por clipes coloridos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Formulário de Criação */}
        <div className="md:col-span-1">
          <form onSubmit={handleCreate} className="bg-[#fef08a]/80 shadow-[2px_4px_10px_rgba(0,0,0,0.1)] hand-drawn-border p-6 sticky top-6 transform rotate-1">
            <h3 className="text-3xl font-handwriting font-bold text-[#453c0a] mb-4">Nova Etiqueta</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xl font-handwriting text-[#453c0a] mb-2">Qual nome?</label>
                <input 
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="Ex: Trabalho, Faculdade..."
                  className="w-full bg-white/50 border-b-2 border-dashed border-[#a16207] px-2 py-2 text-[#44403c] font-handwriting text-2xl focus:outline-none focus:border-[#ca8a04] transition-all placeholder-[#a16207]/60"
                />
              </div>

              <div>
                <label className="block text-xl font-handwriting text-[#453c0a] mb-2">Qual cor?</label>
                <div className="flex gap-4 items-center">
                  <input 
                    type="color"
                    value={newCatColor}
                    onChange={(e) => setNewCatColor(e.target.value)}
                    className="w-12 h-12 rounded-full border-2 border-[#a16207] bg-transparent cursor-pointer shrink-0 hand-drawn-border"
                  />
                  <input 
                    type="text"
                    required
                    value={newCatColor}
                    onChange={(e) => setNewCatColor(e.target.value.toUpperCase())}
                    className="w-full bg-white/50 border-b-2 border-dashed border-[#a16207] px-2 py-2 text-[#44403c] font-handwriting text-2xl focus:outline-none focus:border-[#ca8a04] transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 font-handwriting text-2xl text-[#fdfbf7] bg-[#a16207] hover:bg-[#854d0e] transition-colors hand-drawn-border shadow-[2px_3px_0_rgba(161,98,7,0.4)] transform hover:-translate-y-1 active:translate-y-0"
              >
                <Plus size={22} />
                Grampear
              </button>
            </div>
          </form>
        </div>

        {/* Lista de Categorias */}
        <div className="md:col-span-2 space-y-4">
          {categories.map((cat, idx) => {
             const rotations = [-1, 2, -2, 1];
             const rotate = rotations[idx % 4];
             return (
            <div key={cat.id} className="bg-white border-2 border-black/10 shadow-sm p-4 flex items-center justify-between group hand-drawn-border transition-transform hover:scale-105" style={{ transform: `rotate(${rotate}deg)` }}>
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-inner border-2 border-black/20"
                  style={{ backgroundColor: `${cat.color}30` }}
                >
                  <div className="w-5 h-5 rounded-full shadow-md border border-black/20" style={{ backgroundColor: cat.color }} />
                </div>
                <div>
                  <h4 className="font-handwriting text-3xl text-[#1e3a8a]">{cat.name}</h4>
                  <p className="font-handwriting text-xl text-[#78716c]">
                    Surgiu em {format(new Date(cat.createdAt), 'dd/MM/yyyy')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-3xl font-handwriting font-bold text-[#ef4444]">{cat._count?.tasks || 0}</span>
                  <span className="text-[12px] font-bold text-[#78716c] uppercase tracking-widest leading-none">vezes</span>
                </div>
                
                <button
                  onClick={() => handleDelete(cat.id)}
                  className={`p-2 border-2 rounded-md transition-colors flex items-center gap-2 hand-drawn-border ${
                    confirmDeleteId === cat.id
                    ? 'bg-[#ef4444] text-white border-[#ef4444] animate-pulse opacity-100'
                    : 'text-[#ef4444] border-transparent hover:border-[#ef4444] hover:bg-[#ef4444] hover:text-white opacity-0 group-hover:opacity-100 focus:opacity-100'
                  }`}
                  title="Jogar no lixo"
                >
                  <Trash2 size={20} />
                  {confirmDeleteId === cat.id && <span className="font-handwriting text-xl px-1">Lixo?</span>}
                </button>
              </div>
            </div>
          )})}

          {categories.length === 0 && (
            <div className="text-center py-12 px-4 border-2 border-dashed border-[#d4bd9b] rounded-sm text-[#78716c] hand-drawn-border font-handwriting text-2xl font-bold">
              Você ainda não tem categorias. Crie uma etiqueta ali do lado!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
