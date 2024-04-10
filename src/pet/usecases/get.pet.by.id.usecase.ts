import { IUseCase } from "src/domain/iusecase.interface";
import GetPetByIdUseCaseInput from "./dtos/inputs/get.pet.by.id.usecase.input";
import GetPetByIdUseCaseOutput from "./dtos/outputs/get.pet.by.id.usecase.output";
import { Inject, Injectable } from "@nestjs/common";
import { get } from "http";
import PetTokens from "../pet.tokens";
import IPetRepository from "../interfaces/pet.repository.interface";
import { Pet } from "../schemas/pet.schema";
import PetNotFoundError from "src/domain/errors/pet.notfound.error";

@Injectable()
export default class GetPetByIdUseCase implements IUseCase<GetPetByIdUseCaseInput, GetPetByIdUseCaseOutput> {
    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository
    ) { }

    async run(input: GetPetByIdUseCaseInput): Promise<GetPetByIdUseCaseOutput> {

        const pet = await this.getPetById(input.id)
        
        if (pet == null) {
            throw new PetNotFoundError();            
        }

        return new GetPetByIdUseCaseOutput({
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
