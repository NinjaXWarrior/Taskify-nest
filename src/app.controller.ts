import { Controller, Get, Header } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './common/decorators/public.decorator';

@ApiTags('Root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @Header('Content-Type', 'text/html')
  @ApiOperation({
    summary: 'Taskify Landing Page',
    description: 'Returns the Taskify API landing page.',
  })
  @ApiResponse({
    status: 200,
    description: 'Landing page loaded successfully',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
