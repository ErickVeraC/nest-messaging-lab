import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [RedisModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
