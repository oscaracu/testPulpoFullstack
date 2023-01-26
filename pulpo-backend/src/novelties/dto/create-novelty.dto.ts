import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNoveltyDto {
  @IsNotEmpty()
  @IsNumber()
  noveltiesCategoryId: number;
  @IsNotEmpty()
  @IsString()
  description: string;
}
