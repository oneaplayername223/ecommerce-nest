import { IsNotEmpty, IsString } from "class-validator"
/* istambul ignore file */
export class loginUserDto {
    @IsString()
    @IsNotEmpty()
    username: string
    @IsString()
    @IsNotEmpty()
    password: string
}