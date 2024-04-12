export default class UpdatePetPhotoByIdUseCaseInput {
    id: string;
    photoPatch: string;

    constructor (data: Partial<UpdatePetPhotoByIdUseCaseInput>) {
        Object.assign(this, data)
    }
}
