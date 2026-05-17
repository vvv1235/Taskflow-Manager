import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('tasks') // Endpoint base da API: http://localhost:3001/tasks
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post() // Rota POST para criar tarefas
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get('stats') // Rota GET exclusiva para preencher a estatística do dashboard
  getStats() {
    return this.tasksService.getStats();
  }

  @Get() // Rota GET que aceita as query strings de filtros
  findAll(
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('categoryId') categoryId?: string,
    @Query('search') search?: string,
  ) {
    return this.tasksService.findAll({
      status,
      priority,
      categoryId: categoryId ? parseInt(categoryId, 10) : undefined,
      search,
    });
  }

  @Get(':id') // Rota dinâmica para resgatar uma tarefa
  findOne(@Param('id', ParseIntPipe) id: number) { // ParseIntPipe valida se o ID é número de fato
    return this.tasksService.findOne(id);
  }

  @Put(':id') // Atualiza toda a essência de uma tarefa
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Patch(':id/status') // Modifica APENAS a propriedade de Status (operação leve)
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.tasksService.updateStatus(id, updateStatusDto.status);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.remove(id);
  }
}
