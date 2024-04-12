import { Module } from "@nestjs/common";
import { PetController } from "./pet.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Pet, PetSchema } from "./schemas/pet.schema";
import PetTokens from "./pet.tokens";
import CreatePetUseCase from "./usecases/create.pet.usecase";
import PetRepository from "./pet.repository";
import GetPetByIdUseCase from "./usecases/get.pet.by.id.usecase";
import UpdatePetByIdUseCase from "./usecases/update.pet.by.id.usecase";
import DeletePetByIdUseCase from "./usecases/delete.pet.by.id.usecase";
import UpdatePetPhotoByIdUseCase from "./usecases/update.pet.photo.by.id.usecase";
import AppTokens from "src/tokens/app.tokens";
import FileService from "src/services/file.service";

@Module({
  controllers: [PetController],
  imports: [MongooseModule.forFeature([{name: Pet.name, schema: PetSchema}])],
  providers: [
    {
      provide: PetTokens.createPetUseCase,
      useClass: CreatePetUseCase
    },
    {
      provide: PetTokens.petRepository,
      useClass: PetRepository
    },
    {
      provide: PetTokens.getPetByIdUseCase,
      useClass: GetPetByIdUseCase
    },
    {
      provide: PetTokens.updatePetByIdUseCase,
      useClass: UpdatePetByIdUseCase
    },
    {
      provide: PetTokens.deletePetByIdUseCase,
      useClass: DeletePetByIdUseCase
    },
    {
      provide: PetTokens.updatePetPhotoByIdUseCase,
      useClass: UpdatePetPhotoByIdUseCase
    },
    {
      provide: AppTokens.fileService,
      useClass: FileService
    }
  ]
})

export class PetModule { }
