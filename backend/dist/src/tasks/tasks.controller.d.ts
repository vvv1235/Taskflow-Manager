import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
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
    getStats(): Promise<{
        total: number;
        pending: number;
        inProgress: number;
        completed: number;
    }>;
    findAll(status?: string, priority?: string, categoryId?: string, search?: string): Promise<({
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
    updateStatus(id: number, updateStatusDto: UpdateStatusDto): Promise<{
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
}
