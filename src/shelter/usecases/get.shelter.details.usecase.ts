import { IUseCase } from "src/domain/iusecase.interface";
import GetShelterDetailsUseCaseOutput from "./dtos/get.shelter.details.usecase.output";

export default class GetShelterDetailsUseCase implements IUseCase<null, GetShelterDetailsUseCaseOutput> {
    run(input: null): Promise<GetShelterDetailsUseCaseOutput> {
            return Promise.resolve(new GetShelterDetailsUseCaseOutput({
                shelterName: "name",
                shelterEmail: "email",
                shelterPhone: "phone",
                shelterWhatsApp: "whats",
                createdAt: new Date(),
                updatedAt: new Date()
            }))
    }
}