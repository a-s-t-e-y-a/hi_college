import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [PrismaModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
