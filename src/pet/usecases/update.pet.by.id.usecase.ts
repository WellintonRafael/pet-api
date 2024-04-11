import { IUseCase } from "src/domain/iusecase.interface";
import UpdatePetByIdUseCaseOutput from "./dtos/outputs/update.pet.by.id.usecase.output";
import UpdatePetByIdUseCaseInput from "./dtos/inputs/update.pet.by.id.usecase.input";
import { Inject, Injectable } from "@nestjs/common";
import IPetRepository from "../interfaces/pet.repository.interface";
import PetTokens from "../pet.tokens";
import { Pet } from "../schemas/pet.schema";
import PetNotFoundError from "src/domain/errors/pet.notfound.error";

@Injectable()
export default class UpdatePetByIdUseCase implements IUseCase<UpdatePetByIdUseCaseInput, UpdatePetByIdUseCaseOutput> {
    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository
    ) { }

    async run(input: UpdatePetByIdUseCaseInput): Promise<UpdatePetByIdUseCaseOutput> {

        let pet = await this.getPetById(input.id)

        if (!pet) {
            throw new PetNotFoundError();            
        }

        await this.petRepository.updateById({
            ...input,
            _id: input.id
        })

        pet = await this.getPetById(input.id)

        return new UpdatePetByIdUseCaseOutput({
            id: pet._id,
            name: pet.name,
            type: pet.type,
            size: pet.size,
            gender: pet.gender,
            bio: pet.bio,
            photo: pet.photo,
            createdAt: pet.createdAt,
            updatedAt: pet.updatedAt
        })
    } 

    private async getPetById(id: string): Promise<Pet> {
        try {
            return await this.petRepository.getById(id)
        }
        catch(error) {
            return null;
        }
    }
}
