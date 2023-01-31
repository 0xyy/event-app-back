import { IsDate, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateEventDto {
    @IsString()
    @MinLength(2)
    @MaxLength(24)
    @IsNotEmpty()
    name: string;

    @IsString()
    @MinLength(2)
    @MaxLength(35)
    @IsNotEmpty()
    location: string;

    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @IsDate()
    @IsNotEmpty()
    endDate: Date;
}