import { Module } from '@nestjs/common';
import { ShelterController } from './shelter.controller';
import ShelterTokens from './shelter.tokens';
import GetShelterDetailsUseCase from './usecases/get.shelter.details.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import { Shelter, ShelterSchema } from './schemas/shelter.schema';
import { ShelterRepository } from './shelter.repository';
import UpdateShelterDetailsUseCase from './usecases/update.shelter.details.usecases';

@Module({
  controllers: [ShelterController],
  imports: [MongooseModule.forFeature([{ name: Shelter.name, schema: ShelterSchema }])],
  providers: [
    {
      provide: ShelterTokens.getShelterDetailsUseCase,
      useClass: GetShelterDetailsUseCase
    },
    {
      provide: ShelterTokens.updateShelterDetailsUseCase,
      useClass: UpdateShelterDetailsUseCase
    },
    {
      provide: ShelterTokens.shelterRepository,
      useClass: ShelterRepository
    }
  ]
})
export class ShelterModule { }
