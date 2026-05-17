import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
