import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export default class UpdatePetControllerInput {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
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