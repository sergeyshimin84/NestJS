import {
    IsNotEmpty,
    IsString,
    ValidateIf,
    IsDateString,
    IsNumber,
} from 'class-validator';    

export class EditUserDto {
    @IsNotEmpty()
    @IsString()
    @ValidateIf((o) => o.firstName)
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @ValidateIf((o) => o.email)
    email: string;

    @IsNotEmpty()
    @IsString()
    @ValidateIf((o) => o.password)
    password: string;

    @IsNotEmpty()
    @IsString()
    @ValidateIf((o) => o.roles)
    roles: string;
}