import { Contains, IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export default class UpdateShelterControllerInput {

    @IsString()
    @IsNotEmpty()
    shelterName: string;

    @IsPhoneNumber() 
    shelterWhatsApp: string;

    @IsEmail()
    shelterEmail: string;

    @IsPhoneNumber("BR")
    shelterPhone: string;
}