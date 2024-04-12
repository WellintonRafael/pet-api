import { IUseCase } from "src/domain/iusecase.interface";
import UpdatePetPhotoByIdUseCaseOutput from "./dtos/outputs/update.pet.photo.by.id.usecase.output";
import UpdatePetPhotoByIdUseCaseInput from "./dtos/inputs/update.pet.photo.by.id.usecase.input";
import PetTokens from "../pet.tokens";
import IPetRepository from "../interfaces/pet.repository.interface";
import { Inject } from "@nestjs/common";
import PetNotFoundError from "src/domain/errors/pet.notfound.error";
import { Pet } from "../schemas/pet.schema";
import AppTokens from "src/tokens/app.tokens";
import IFileService from "src/interfaces/file.service.interface";

export default class UpdatePetPhotoByIdUseCase implements IUseCase<UpdatePetPhotoByIdUseCaseInput, UpdatePetPhotoByIdUseCaseOutput> {

    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository,

        @Inject(AppTokens.fileService)
        private readonly fileService: IFileService
    ) { }

    async run(input: UpdatePetPhotoByIdUseCaseInput): Promise<UpdatePetPhotoByIdUseCaseOutput> {
        let pet = await this.getPetById(input.id)

        if (!pet) {
            throw new PetNotFoundError();
        }

        await this.petRepository.updateById({
            _id: input.id,
            photo: input.photoPatch
        })

        const photo = await this.fileService.readFile(input.photoPatch)

        return new UpdatePetPhotoByIdUseCaseOutput({
            id: pet._id,
            name: pet.name,
            type: pet.type,
            size: pet.size,
            gender: pet.gender,
            bio: pet.bio,
            photo: photo.toString('base64'),
            createdAt: pet.createdAt,
            updatedAt: pet.updatedAt
        })
    }

    private async getPetById(id: string): Promise<Pet> {
        try {
            return await this.petRepository.getById(id)
        }
        catch (error) {
            return null;
        }
    }
}    
