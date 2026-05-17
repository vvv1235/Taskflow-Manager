import { Task } from '@/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PriorityBadge } from '@/components/ui/PriorityBadge';
import { Calendar, Tag } from 'lucide-react';
import { format, isPast, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate)) && task.status !== 'COMPLETED';

  const postItColors = ['post-it-yellow', 'post-it-blue', 'post-it-pink'];
  const postItClass = postItColors[task.id % 3];
  
  // Random slight rotation for organic feel (-2, -1, 1, 2)
  const rotation = [-2, -1, 1, 2][task.id % 4];

  return (
    <Link 
      href={`/tasks/${task.id}`}
      className={`block post-it ${postItClass} p-5 group hover:scale-105 hover:shadow-xl transition-all duration-300 transform`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="flex justify-between items-start mb-3">
        <StatusBadge status={task.status} />
        <PriorityBadge priority={task.priority} />
      </div>

      <h3 className="font-handwriting text-3xl font-bold mb-2 group-hover:text-blue-700 transition-colors line-clamp-1 leading-tight">
        {task.title}
      </h3>
      
      {task.description && (
        <p className="text-black/70 text-sm line-clamp-2 mb-4 h-10 font-medium">
          {task.description}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t-2 border-black/10 border-dashed">
        <div className="flex gap-2 text-xs">
          {task.categories.slice(0, 2).map(cat => (
            <span 
              key={cat.id} 
              className="px-2 py-1 rounded bg-white/40 border border-black/20 text-black/80 flex items-center gap-1 font-bold shadow-sm"
            >
              <span className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: cat.color }} />
              {cat.name}
            </span>
          ))}
          {task.categories.length > 2 && (
            <span className="px-2 py-1 rounded bg-white/40 border border-black/20 text-black/80 flex items-center font-bold shadow-sm">
              +{task.categories.length - 2}
            </span>
          )}
          {task.categories.length === 0 && (
            <span className="text-black/50 flex items-center gap-1 font-semibold"><Tag size={12}/> Sem categoria</span>
          )}
        </div>

        {task.dueDate && (
          <div className={`flex items-center gap-1.5 text-xs font-bold ${isOverdue ? 'text-red-600' : 'text-black/60'}`}>
            <Calendar size={14} className={isOverdue ? "text-red-600" : "text-black/50"} />
            {format(new Date(task.dueDate), "d 'de' MMM", { locale: ptBR })}
          </div>
        )}
      </div>
    </Link>
  );
}
