import { IsNotEmpty, IsString, Length, MaxLength } from "class-validator";

export default class CreatePetControllerInput {
    @IsNotEmpty()
    @IsString()
    @Length(256)
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(128)
    type: string;

    @IsNotEmpty()
    @IsString()
    size: string;

    @IsNotEmpty()
    @IsString()
    gender: string;
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(1024)
    bio: string;
}