import {
    IsNotEmpty,
    IsString,
    ValidateIf,
    IsDateString,
} from 'class-validator';    

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    message: string;

    @IsNotEmpty()
    @IsString()
    author: string;

    @IsNotEmpty()
    @IsString()
    comment: string;

    avatar: string;
}
