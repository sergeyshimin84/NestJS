import {
    IsNotEmpty,
    IsString,
    ValidateIf,
    IsDateString,
    IsNumber,
} from 'class-validator';    

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    message: string;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
}
