export default class CreatePetUseCaseInput {
    name: string;
    type: string;
    size: string;
    gender: string;
    bio: string;

    constructor(data: Partial<CreatePetUseCaseInput>) {
        Object.assign(this, data)
    }
}
