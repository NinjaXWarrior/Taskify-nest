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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import GetUser from '../common/decorators/get-user.decorator';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';

@ApiTags('Comments')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('tasks/:taskId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a comment to a task' })
  @ApiBody({ type: CreateCommentDto })
  createComment(
    @Param('taskId') taskId: string,
    @GetUser() user: any,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentsService.createComment(taskId, user, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List comments for a task' })
  listComments(@Param('taskId') taskId: string) {
    return this.commentsService.listComments(taskId);
  }

  @Patch(':commentId')
  @ApiOperation({ summary: 'Edit a comment' })
  @ApiBody({ type: UpdateCommentDto })
  updateComment(
    @Param('commentId') commentId: string,
    @GetUser() user: any,
    @Body() dto: UpdateCommentDto,
  ) {
    return this.commentsService.updateComment(commentId, user, dto);
  }

  @Delete(':commentId')
  @ApiOperation({ summary: 'Delete a comment' })
  deleteComment(@Param('commentId') commentId: string, @GetUser() user: any) {
    return this.commentsService.deleteComment(commentId, user);
  }
}
