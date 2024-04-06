export default class UpdateShelterDetailsUseCaseInput {

    name: string;
    whatsApp: string;
    email: string;
    phone: string;

    constructor(data: Partial<UpdateShelterDetailsUseCaseInput>) {
        Object.assign(this, data);
    }
}
