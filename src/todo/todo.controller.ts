// todo.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from '@prisma/client';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Tenant, UserToken } from 'src/auth/auth.decorator';

@ApiTags('Todos')
@ApiBearerAuth()
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create new todo ' })
  @Post()
  @ApiCreatedResponse({
    description: 'The todo has been successfully created.',
  })
  @ApiBody({ type: CreateTodoDto })
  create(@Body() createTodoDto: CreateTodoDto, @Tenant() user: UserToken) {
    return this.todoService.create(createTodoDto, user);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Return List of todos' })
  @ApiOkResponse({
    description: 'Return a list of todos.',
  })
  findAll(@Tenant() user: UserToken) {
    return this.todoService.findAll(user.userId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Return todo on the basis of id' })
  @ApiParam({ name: 'id', description: 'The ID of the todo', required: true })
  @ApiOkResponse({
    description: 'Return the todo with the given ID.',
  })
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Edit the todo list' })
  @ApiParam({ name: 'id', description: 'The ID of the todo', required: true })
  @ApiOkResponse({
    description: 'The todo has been successfully updated.',
  })
  @ApiBody({ type: CreateTodoDto })
  update(@Param('id') id: string, @Body() updateTodoDto: CreateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @UseGuards(AuthGuard)
  @Patch('done/:id')
  @ApiOperation({ summary: 'Make a todo done' })
  @ApiParam({ name: 'id', description: 'The ID of the todo', required: true })
  @ApiOkResponse({
    description: 'The todo has been successfully done.',
  })
  doneTodo(@Param('id') id: string) {
    return this.todoService.done(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete the todo' })
  @ApiParam({ name: 'id', description: 'The ID of the todo', required: true })
  @ApiOkResponse({
    description: 'The todo has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
