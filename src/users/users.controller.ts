import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Request,
  Patch,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { extname } from 'path';
import { Response } from 'express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List users with search, pagination and filters' })
  list(
    @Query('search') search: string,
    @Query('role') role: string,
    @Query('isActive') isActive: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    const parsed = {
      search,
      role,
      isActive:
        isActive === 'true' ? true : isActive === 'false' ? false : undefined,
      page: Number(page),
      limit: Number(limit),
    };

    return this.usersService.listUsers(parsed);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get current authenticated user profile' })
  async me(@Request() req) {
    const user = await this.usersService.findById(
      req.user.id || req.user.userId,
    );
    return user;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single user by id' })
  async get(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/activate')
  activate(@Param('id') id: string) {
    return this.usersService.updateUser(id, { isActive: true });
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.usersService.updateUser(id, { isActive: false });
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = extname(file.originalname);
          cb(null, `${uniqueSuffix}${fileExtName}`);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  async uploadAvatar(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      return { message: 'No file uploaded' };
    }

    const path = `/uploads/avatars/${file.filename}`;
    const user = await this.usersService.updateAvatar(id, path);

    return { message: 'Avatar uploaded', avatar: user.avatar };
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post()
  @ApiOperation({ summary: 'Create a new user (admin)' })
  create(@Body() dto: any) {
    return this.usersService.addUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/delete')
  @ApiOperation({ summary: 'Soft-delete a user (admin)' })
  delete(@Param('id') id: string) {
    return this.usersService.updateUser(id, {
      isDeleted: true,
      isActive: false,
    });
  }

  @Get(':id/avatar')
  async serveAvatar(@Param('id') id: string, @Res() res: Response) {
    const user = await this.usersService.findById(id);
    if (!user || !user.avatar) {
      return res.status(HttpStatus.NOT_FOUND).send('Avatar not found');
    }

    return res.sendFile(user.avatar, { root: '.' });
  }
}
