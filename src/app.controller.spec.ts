import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return a polished API welcome payload', () => {
      const result = appController.getHello();

      expect(result).toMatchObject({
        status: 'success',
        message: 'Taskify API is running',
      });
      expect(result.endpoints).toBeDefined();
      expect(result.docs).toBe('/api');
    });
  });
});
