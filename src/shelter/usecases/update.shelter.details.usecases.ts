import { IUseCase } from "src/domain/iusecase.interface";
import { Inject } from "@nestjs/common";
import ShelterTokens from "../shelter.tokens";
import IShelterRepository from "../interfaces/shelter.repository.interface";
import UpdateShelterDetailsUseCaseOutput from "./dtos/outputs/update.shelter.details.usecase.output";

export default class UpdateShelterDetailsUseCase implements IUseCase<null, UpdateShelterDetailsUseCaseOutput> {

    constructor(
        @Inject(ShelterTokens.shelterRepository)
        private readonly shelterRepository: IShelterRepository
    ) {}

    async run(input: null): Promise<UpdateShelterDetailsUseCaseOutput> {
        const shelter = await this.shelterRepository.get();

        return new UpdateShelterDetailsUseCaseOutput({
            name: shelter.name,
            email: shelter.email,
            phone: shelter.phone,
            whatsApp: shelter.whatsApp,
            createdAt: shelter.createdAt,
            updatedAt: shelter.updateAt
        });
    }
}