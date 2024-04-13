import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Pet } from "./schemas/pet.schema";
import IPetRepository from "./interfaces/pet.repository.interface";
import GetPetsUseCaseInput from "./usecases/dtos/inputs/get.pets.usecase.input";
import FindByFiltersAndTotal from "./usecases/find.by.filters.and.total";

@Injectable()
export default class PetRepository implements IPetRepository {

    constructor(
        @InjectModel(Pet.name)
        private readonly petModel: Model<Pet>
    ) { }

    async deleteById(id: string): Promise<void> {
        await this.petModel.findByIdAndDelete(id);
    }

    async getById(id: string): Promise<Pet> {
        return await this.petModel.findById(id)
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

    async create(data: Partial<Pet>): Promise<Pet> {
        return await this.petModel.create({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }

    async findByFilters(input: GetPetsUseCaseInput): Promise<FindByFiltersAndTotal> {

        const FIST_PAGE = 1;

        const skip = input.page == FIST_PAGE ? 0 : input.itemsPerPage * (input.page - 1);

        let query = this.petModel.find();

        if (input.type) {
            query = query.find({
                type: input.type
            });
        }

        if (input.size) {
            query = query.find({
                size: input.size
            });
        }

        if (input.gender) {
            query = query.find({
                gender: input.gender
            });
        }

        const totalQuery = query.clone().countDocuments();
        const skipQuery = query.clone().skip(skip).limit(input.itemsPerPage);

        const [items, total] = await Promise.all([

            skipQuery.exec(),
            totalQuery.exec()            
        ]);

        return new FindByFiltersAndTotal({items, total});
    }
}
