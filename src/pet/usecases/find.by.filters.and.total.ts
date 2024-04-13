import { Pet } from "../schemas/pet.schema";

export default class FindByFiltersAndTotal {
    items: Pet[];
    total: number;

    constructor(data: Partial<FindByFiltersAndTotal>) {
        Object.assign(this, data)
    }
}