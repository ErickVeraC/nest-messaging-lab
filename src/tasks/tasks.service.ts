import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Task } from './entities/task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class TasksService implements OnModuleInit {
  private readonly REDIS_KEY = 'tasks';
  private readonly TTL = 3600;

  constructor(private readonly redisService: RedisService) {}

  async onModuleInit() {
    //Para inicializar un array vacio si no existe
    const tasks = await this.redisService.get<Task[]>(this.REDIS_KEY);
    if (!tasks) {
      await this.redisService.set(this.REDIS_KEY, [], this.TTL);
    }
  }

  private tasks: Task[] = [
    {
      id: 1,
      title: 'Creando prueba 1',
      description: 'Implementando prueba 1',
      completed: false,
    },
    {
      id: 2,
      title: 'Crear API REST',
      description: 'Implementar endpoints para una API',
      completed: false,
    },
    {
      id: 3,
      title: 'Desplegar aplicación',
      description: 'Subir la aplicación a un servidor',
      completed: true,
    },
  ];
  private nextId = 1; // Para autoincrementar IDs

  private async getTasks(): Promise<Task[]> {
    return (await this.redisService.get<Task[]>(this.REDIS_KEY)) || [];
  }

  private async saveTasks(tasks: Task[]): Promise<void> {
    await this.redisService.set(this.REDIS_KEY, tasks, this.TTL);
  }

  private generateId(tasks: Task[]): number {
    const ids = tasks.map((t) => (typeof t.id === 'number' ? t.id : 0));
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  create(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: this.nextId++,
      title: createTaskDto.title,
      description: createTaskDto.description,
      completed: false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  findOne(id: number): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  remove(id: number): void {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    this.tasks.splice(taskIndex, 1);
  }

  updateTask(id: number, data: Partial<Task>): Task {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    // Actualiza solo las propiedades proporcionadas
    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...data,
      updatedAt: new Date(),
    };
    return this.tasks[taskIndex];
  }

  // Cambiar estado de completado
  toggleComplete(id: number): Task {
    const task = this.findOne(id);
    return this.updateTask(id, {
      completed: !task.completed,
    });
  }

  async clear(): Promise<void> {
    await this.redisService.del(this.REDIS_KEY);
    // Volver a inicializar con array vacio
    await this.redisService.set(this.REDIS_KEY, [], this.TTL);
  }
}
