import { Priority } from '@/types';
import { AlertCircle, ArrowDown, ArrowRight, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = {
    LOW: {
      label: 'Baixa',
      icon: ArrowDown,
      iconClass: 'text-emerald-500',
      classes: 'bg-emerald-500/10 text-emerald-400',
    },
    MEDIUM: {
      label: 'Média',
      icon: ArrowRight,
      iconClass: 'text-amber-500',
      classes: 'bg-amber-500/10 text-amber-500',
    },
    HIGH: {
      label: 'Alta',
      icon: ArrowUp,
      iconClass: 'text-red-500',
      classes: 'bg-red-500/10 text-red-500',
    },
  };

  const { label, icon: Icon, iconClass, classes } = config[priority];

  return (
    <div className={cn('inline-flex items-center gap-1 text-xs font-semibold', classes, 'px-2 py-0.5 rounded', className)}>
      <Icon size={12} className={iconClass} strokeWidth={3} />
      {label}
    </div>
  );
}
