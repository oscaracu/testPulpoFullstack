import { PartialType } from '@nestjs/mapped-types';
import { CreateNoveltiesCategoryDto } from './create-novelties-category.dto';

export class UpdateNoveltiesCategoryDto extends PartialType(CreateNoveltiesCategoryDto) {}
