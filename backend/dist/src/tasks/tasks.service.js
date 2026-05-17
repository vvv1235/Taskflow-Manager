"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TasksService = class TasksService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTaskDto) {
        const { categoryIds, ...taskData } = createTaskDto;
        return this.prisma.task.create({
            data: {
                title: taskData.title,
                description: taskData.description,
                dueDate: taskData.dueDate ? new Date(taskData.dueDate) : null,
                priority: taskData.priority || 'MEDIUM',
                status: taskData.status || 'PENDING',
                userId: taskData.userId || 1,
                categories: categoryIds?.length
                    ? { connect: categoryIds.map((id) => ({ id })) }
                    : undefined,
            },
            include: { categories: true, user: true },
        });
    }
    async findAll(filters) {
        const where = {};
        if (filters.status) {
            where.status = filters.status;
        }
        if (filters.priority) {
            where.priority = filters.priority;
        }
        if (filters.categoryId) {
            where.categories = {
                some: { id: filters.categoryId },
            };
        }
        if (filters.search) {
            where.OR = [
                { title: { contains: filters.search, mode: 'insensitive' } },
                { description: { contains: filters.search, mode: 'insensitive' } },
            ];
        }
        return this.prisma.task.findMany({
            where,
            include: {
                categories: true,
                user: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const task = await this.prisma.task.findUnique({
            where: { id },
            include: {
                categories: true,
                user: true,
            },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Tarefa de ID #${id} não encontrada`);
        }
        return task;
    }
    async update(id, updateTaskDto) {
        await this.findOne(id);
        const { categoryIds, ...taskData } = updateTaskDto;
        const data = {
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
    async updateStatus(id, status) {
        await this.findOne(id);
        return this.prisma.task.update({
            where: { id },
            data: { status: status },
            include: { categories: true, user: true },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.task.delete({
            where: { id },
            include: { categories: true },
        });
    }
    async getStats() {
        const [total, pending, inProgress, completed] = await Promise.all([
            this.prisma.task.count(),
            this.prisma.task.count({ where: { status: 'PENDING' } }),
            this.prisma.task.count({ where: { status: 'IN_PROGRESS' } }),
            this.prisma.task.count({ where: { status: 'COMPLETED' } }),
        ]);
        return { total, pending, inProgress, completed };
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map