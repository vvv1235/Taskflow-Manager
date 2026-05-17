import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        _count: {
            tasks: number;
        };
    } & {
        id: number;
        email: string;
        name: string;
        createdAt: Date;
    })[]>;
    findOne(id: number): Promise<({
        _count: {
            tasks: number;
        };
    } & {
        id: number;
        email: string;
        name: string;
        createdAt: Date;
    }) | null>;
}
