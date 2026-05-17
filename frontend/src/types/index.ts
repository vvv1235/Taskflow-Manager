// Tipos exatos que espelham a arquitetura do Prisma no Backend
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type Status = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  color: string;
  createdAt: string;
}

export interface Task {
  id: number;
  title: string;
  description: string | null;
  dueDate: string | null;
  priority: Priority;
  status: Status;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
  categories: Category[];
}

export interface TaskStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
}
