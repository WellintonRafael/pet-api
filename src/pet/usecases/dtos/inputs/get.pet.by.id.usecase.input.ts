export default class GetPetByIdUseCaseInput {
    id: string;

    constructor(data: Partial<GetPetByIdUseCaseInput>) {
        Object.assign(this, data)
    }
}
