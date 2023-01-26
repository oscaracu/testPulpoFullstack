import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateNoveltyDto {
  @IsNotEmpty()
  @IsNumber()
  noveltiesCategoryId: number;
  @IsNotEmpty()
  @IsNumber()
  description: string;
}
