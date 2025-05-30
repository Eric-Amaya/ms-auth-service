import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class CommentDto {
  user: string;
  content: string;
  timestamp: Date;
}