import { Pet } from "../schemas/pet.schema";

export default interface IPetRepository {
    create(data: Partial<Pet>): Promise<Pet>;
    getById(id: string): Promise<Pet>;
    updateById(data: Partial<Pet>): Promise<void>;
    deleteById(id: string): Promise<void>;
}
