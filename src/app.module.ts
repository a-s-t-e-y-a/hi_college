import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    AuthModule,
    TodoModule,
    PrismaModule.forRoot({
      prismaServiceOptions: {
        explicitConnect: true,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
