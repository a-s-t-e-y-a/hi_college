// todo.service.ts
import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto, user): Promise<Todo> {
    console.log(user);
    return this.prisma.todo.create({
      data: {
        title: createTodoDto.todo,
        description: createTodoDto.description,
        user: {
          connect: { id: user.userId },
        },
      },
    });
  }

  async findAll(id: string): Promise<Todo[]> {
    return this.prisma.todo.findMany({
      where: { user_id: id },
    });
  }

  async findOne(id: string): Promise<Todo> {
    return this.prisma.todo.findFirst({
      where: { id },
    });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.prisma.todo.update({
      where: { id },
      data: {
        title: updateTodoDto.todo,
        description: updateTodoDto.description,
      },
    });
  }

  async done(id: string): Promise<Todo> {
    return this.prisma.todo.update({
      where: { id },
      data: {
        is_completed: true,
        completed_at: new Date(),
      },
    });
  }

  async remove(id: string): Promise<Todo> {
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
