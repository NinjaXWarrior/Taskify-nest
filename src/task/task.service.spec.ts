import { TaskService } from './task.service';

describe('TaskService', () => {
  it('allows access when the task belongs to the authenticated user', async () => {
    const taskModel = {
      findById: jest.fn().mockResolvedValue({ createdBy: 'user-1' }),
    };

    const service = new TaskService(taskModel as any);

    await expect(service.validateUser('user-1', 'task-1')).resolves.toBe(true);
  });
});
