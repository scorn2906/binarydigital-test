import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  status?: 'OPEN' | 'IN_PROGRESS' | 'DONE';
}
