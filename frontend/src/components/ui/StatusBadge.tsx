import { Status } from '@/types';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = {
    PENDING: {
      label: 'Pendente',
      icon: Circle,
      classes: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    },
    IN_PROGRESS: {
      label: 'Em Andamento',
      icon: Clock,
      classes: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    },
    COMPLETED: {
      label: 'Concluído',
      icon: CheckCircle2,
      classes: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
  };

  const { label, icon: Icon, classes } = config[status];

  return (
    <div className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border', classes, className)}>
      <Icon size={14} className={status === 'COMPLETED' ? 'text-emerald-500' : 'opacity-70'} />
      {label}
    </div>
  );
}
