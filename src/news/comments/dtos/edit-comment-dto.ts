import {
    IsNotEmpty,
    IsString,
    ValidateIf,
    IsDateString,
    IsNumber,
} from 'class-validator';    

export class EditCommentDto {
    @IsString()
    @IsNotEmpty()
    @ValidateIf((o) => o.message)
    message: string;

    @IsString()
    @IsNotEmpty()
    @ValidateIf((o) => o.author)
    author: string;

    @IsString()
    @IsNotEmpty()
    @ValidateIf((o) => o.comment)
    comment: string;
}