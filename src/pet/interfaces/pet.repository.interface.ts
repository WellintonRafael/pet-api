import { Pet } from "../schemas/pet.schema";
import GetPetsUseCaseInput from "../usecases/dtos/inputs/get.pets.usecase.input";
import FindByFiltersAndTotal from "../usecases/find.by.filters.and.total";

export default interface IPetRepository {
    create(data: Partial<Pet>): Promise<Pet>;
    getById(id: string): Promise<Pet>;
    updateById(data: Partial<Pet>): Promise<void>;
    deleteById(id: string): Promise<void>;
    findByFilters(input: GetPetsUseCaseInput): Promise<FindByFiltersAndTotal>;
}
