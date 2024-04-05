import { Shelter } from "../schemas/shelter.schema";

export default interface IShelterRepository {
    get(): Promise<Shelter>
}