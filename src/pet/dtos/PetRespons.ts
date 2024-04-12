import { Pet } from "../schemas/pet.schema";

export default class PetResponse {
  id: string;
  name: string;
  type: string;
  size: string;
  gender: string;
  bio: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;

  static fromPet(data: Pet): PetResponse {
    return new PetResponse({
      ...data,
      id: data._id,
    });
  }
  constructor(data: Partial<PetResponse>) {
    Object.assign(this);
  }
}