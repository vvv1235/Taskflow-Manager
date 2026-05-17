import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTaskDto: CreateTaskDto): Promise<{
        user: {
            createdAt: Date;
            id: number;
            name: string;
            email: string;
        };
        categories: {
            createdAt: Date;
            id: number;
            name: string;
            color: string;
        }[];
    } & {
        title: string;
        description: string | null;
        dueDate: Date | null;
        priority: import("@prisma/client").$Enums.Priority;
        status: import("@prisma/client").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    findAll(filters: {
        status?: string;
        priority?: string;
        categoryId?: number;
        search?: string;
    }): Promise<({
        user: {
            createdAt: Date;
            id: number;
            name: string;
            email: string;
        };
        categories: {
            createdAt: Date;
            id: number;
            name: string;
            color: string;
        }[];
    } & {
        title: string;
        description: string | null;
        dueDate: Date | null;
        priority: import("@prisma/client").$Enums.Priority;
        status: import("@prisma/client").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    })[]>;
    findOne(id: number): Promise<{
        user: {
            createdAt: Date;
            id: number;
            name: string;
            email: string;
        };
        categories: {
            createdAt: Date;
            id: number;
            name: string;
            color: string;
        }[];
    } & {
        title: string;
        description: string | null;
        dueDate: Date | null;
        priority: import("@prisma/client").$Enums.Priority;
        status: import("@prisma/client").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<{
        user: {
            createdAt: Date;
            id: number;
            name: string;
            email: string;
        };
        categories: {
            createdAt: Date;
            id: number;
            name: string;
            color: string;
        }[];
    } & {
        title: string;
        description: string | null;
        dueDate: Date | null;
        priority: import("@prisma/client").$Enums.Priority;
        status: import("@prisma/client").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    updateStatus(id: number, status: string): Promise<{
        user: {
            createdAt: Date;
            id: number;
            name: string;
            email: string;
        };
        categories: {
            createdAt: Date;
            id: number;
            name: string;
            color: string;
        }[];
    } & {
        title: string;
        description: string | null;
        dueDate: Date | null;
        priority: import("@prisma/client").$Enums.Priority;
        status: import("@prisma/client").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    remove(id: number): Promise<{
        categories: {
            createdAt: Date;
            id: number;
            name: string;
            color: string;
        }[];
    } & {
        title: string;
        description: string | null;
        dueDate: Date | null;
        priority: import("@prisma/client").$Enums.Priority;
        status: import("@prisma/client").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    getStats(): Promise<{
        total: number;
        pending: number;
        inProgress: number;
        completed: number;
    }>;
}
