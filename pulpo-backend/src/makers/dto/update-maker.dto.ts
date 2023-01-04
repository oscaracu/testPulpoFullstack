import { PartialType } from '@nestjs/mapped-types';
import { CreateMakerDto } from './create-maker.dto';

export class UpdateMakerDto extends PartialType(CreateMakerDto) {}
