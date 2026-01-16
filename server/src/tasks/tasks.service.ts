import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async createTask(
    createTaskDto: CreateTaskDTO,
    userId: string,
  ): Promise<Task> {
    const task = this.taskRepo.create({
      ...createTaskDto,
      user: { id: userId },
    });

    return this.taskRepo.save(task);
  }

  async findAll(userId: string): Promise<Task[]> {
    return this.taskRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Task> {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.user.id !== userId) {
      throw new ForbiddenException('You do not have access to this task');
    }

    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDTO,
    userId: string,
  ): Promise<Task> {
    const task = await this.findOne(id, userId);

    Object.assign(task, updateTaskDto);

    return this.taskRepo.save(task);
  }

  async delete(id: string, userId: string) {
    const task = await this.findOne(id, userId);
    await this.taskRepo.remove(task);
  }
}
