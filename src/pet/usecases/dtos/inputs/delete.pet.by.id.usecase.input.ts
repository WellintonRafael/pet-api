export default class DeletePetByIdUseCaseInput {
    id: string;

    constructor(data: Partial<DeletePetByIdUseCaseInput>) {
        Object.assign(this, data)
    }
}
