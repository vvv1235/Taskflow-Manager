import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        color: string;
    }>;
    findAll(): Promise<({
        _count: {
            tasks: number;
        };
    } & {
        id: number;
        name: string;
        createdAt: Date;
        color: string;
    })[]>;
    findOne(id: number): Promise<{
        tasks: ({
            categories: {
                id: number;
                name: string;
                createdAt: Date;
                color: string;
            }[];
        } & {
            id: number;
            createdAt: Date;
            title: string;
            description: string | null;
            priority: import("@prisma/client").$Enums.Priority;
            status: import("@prisma/client").$Enums.Status;
            dueDate: Date | null;
            updatedAt: Date;
            userId: number;
        })[];
        _count: {
            tasks: number;
        };
    } & {
        id: number;
        name: string;
        createdAt: Date;
        color: string;
    }>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        color: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        color: string;
    }>;
}
