import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
/* istambul ignore file */
export class UpdateClientDto extends PartialType(CreateProductDto) {}
