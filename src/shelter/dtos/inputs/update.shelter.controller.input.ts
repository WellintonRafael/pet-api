import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export default class UpdateShelterControllerInput {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsPhoneNumber("BR") 
    whatsApp: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber("BR")
    phone: string;
}
