export default class GetPetByIdUseCaseOutput {
    id: string;
    name: string;
    type: string;
    size: string;
    gender: string;
    bio: string;
    photo: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: Partial<GetPetByIdUseCaseOutput>) {
        Object.assign(this, data);
    }
}
