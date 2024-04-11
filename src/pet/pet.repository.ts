import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Pet } from "./schemas/pet.schema";
import IPetRepository from "./interfaces/pet.repository.interface";

@Injectable()
export default class PetRepository implements IPetRepository {

    constructor(
        @InjectModel(Pet.name)
        private readonly petModel: Model<Pet>
    ) { }

    async deleteById(id: string): Promise<void> {
        await this.petModel.findByIdAndDelete(id);
    }

    async updateById(data: Partial<Pet>): Promise<void> {
        await this.petModel.updateOne(
            {
                _id: data._id
            },
            {
                ...data,
                updatedAt: new Date()
            }
        )
    }

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
