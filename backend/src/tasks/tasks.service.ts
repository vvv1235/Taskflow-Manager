import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  // Cria uma nova tarefa e conecta (estabelece o relacionamento) com as categorias selecionadas
  async create(createTaskDto: CreateTaskDto) {
    const { categoryIds, ...taskData } = createTaskDto;

    return this.prisma.task.create({
      data: {
        title: taskData.title,
        description: taskData.description,
        dueDate: taskData.dueDate ? new Date(taskData.dueDate) : null,
        priority: (taskData.priority as any) || 'MEDIUM',
        status: (taskData.status as any) || 'PENDING',
        userId: taskData.userId || 1,
        categories: categoryIds?.length
          ? { connect: categoryIds.map((id) => ({ id })) }
          : undefined,
      },
      include: { categories: true, user: true },
    });
  }

  // Busca lista de tarefas, permitindo filtros compostos (Status, Prioridade, ID da Categoria, e Busca textual)
  async findAll(filters: {
    status?: string;
    priority?: string;
    categoryId?: number;
    search?: string;
  }) {
    const where: Prisma.TaskWhereInput = {};

    // Adiciona condicional para status no filtro Prismático
    if (filters.status) {
      where.status = filters.status as any;
    }

    if (filters.priority) {
      where.priority = filters.priority as any;
    }

    if (filters.categoryId) {
      where.categories = {
        some: { id: filters.categoryId },
      };
    }

    if (filters.search) {
      // Busca via ILIKE (insensitive) tanto no título quanto na descrição
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.task.findMany({
      where,
      include: {
        categories: true, // Traz os dados das categorias no JSON de resposta
        user: true,
      },
      orderBy: { createdAt: 'desc' }, // Sempre retorna os mais novos primeiro
    });
  }

  // Busca uma única tarefa baseada na sua ID
  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        categories: true,
        user: true,
      },
    });
    if (!task) {
      throw new NotFoundException(`Tarefa de ID #${id} não encontrada`);
    }
    return task;
  }

  // Atualiza integralmente a tarefa (todas as propriedades) e refaz as ligações com as categorias
  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.findOne(id); // Garante que a tarefa existe, senão capta a excessão de NotFoundException
    const { categoryIds, ...taskData } = updateTaskDto;

    const data: any = {
      ...taskData,
    };

    if (taskData.dueDate) {
      data.dueDate = new Date(taskData.dueDate);
    }

    if (categoryIds !== undefined) {
      data.categories = {
        set: categoryIds.map((cid) => ({ id: cid })),
      };
    }

    delete data.userId;

    return this.prisma.task.update({
      where: { id },
      data,
      include: { categories: true, user: true },
    });
  }

  async updateStatus(id: number, status: string) {
    await this.findOne(id);
    return this.prisma.task.update({
      where: { id },
      data: { status: status as any },
      include: { categories: true, user: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.task.delete({
      where: { id },
      include: { categories: true }, // Retorna a tarefa deletada para fins de histórico
    });
  }

  // Gera dados estatísticos da dashboard de forma otimizada via contagem (count) invés de fetch no banco inteiro
  async getStats() {
    const [total, pending, inProgress, completed] = await Promise.all([
      this.prisma.task.count(),
      this.prisma.task.count({ where: { status: 'PENDING' } }),
      this.prisma.task.count({ where: { status: 'IN_PROGRESS' } }),
      this.prisma.task.count({ where: { status: 'COMPLETED' } }),
    ]);
    return { total, pending, inProgress, completed };
  }
}
