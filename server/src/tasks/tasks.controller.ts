import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import type { UserPayload } from 'src/common/decorators/current-user.decorator';

@Controller('/api/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDTO,
    @CurrentUser() user: UserPayload,
  ) {
    return this.tasksService.createTask(createTaskDto, user.userId);
  }
  @Get()
  findAll(@CurrentUser() user: UserPayload) {
    return this.tasksService.findAll(user.userId);
  }
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: UserPayload) {
    return this.tasksService.findOne(id, user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDTO,
    @CurrentUser() user: UserPayload,
  ) {
    return this.tasksService.update(id, updateTaskDto, user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: UserPayload) {
    return this.tasksService.delete(id, user.userId);
  }
}
