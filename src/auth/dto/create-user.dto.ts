import { IsNotEmpty, IsString } from "class-validator"
/* istambul ignore file */
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string
    @IsString()
    @IsNotEmpty()
    password: string
}