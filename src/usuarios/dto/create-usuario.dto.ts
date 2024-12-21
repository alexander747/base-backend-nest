import { ArrayMinSize, IsArray, IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUsuarioDto {
    @IsNotEmpty()
    @IsString()
    usuario: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    identificacion: string;

    @IsNotEmpty()
    @IsString()
    nombres: string;

    @IsOptional()
    @IsBoolean()
    activo: boolean = true;

}


export class LoginUsuarioDto {
    @IsNotEmpty()
    @IsString()
    usuario: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}


