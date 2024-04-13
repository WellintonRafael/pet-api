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
      id: data._id,
      name: data.name,
      type: data.type,
      size: data.size,
      gender: data.gender,
      bio: data.bio,
      photo: data.photo,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
  
  constructor(data: Partial<PetResponse>) {
    Object.assign(this, data);
  }
}