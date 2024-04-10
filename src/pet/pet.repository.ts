import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Pet } from "./schemas/pet.schema";
import IPetRepository from "./interfaces/pet.repository.interface";
import GetPetByIdUseCaseInput from "./usecases/dtos/inputs/get.pet.by.id.usecase.input";
import GetPetByIdUseCaseOutput from "./usecases/dtos/outputs/get.pet.by.id.usecase.output";

@Injectable()
export default class PetRepository implements IPetRepository {

    constructor(
        @InjectModel(Pet.name)
        private readonly petModel: Model<Pet>
    ) { }

    async getById(id: string): Promise<Pet> {
        return await this.petModel.findById(id)
    }

    async create(data: Partial<Pet>): Promise<Pet> {
        return await this.petModel.create({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }

}
