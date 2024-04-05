import { Module } from '@nestjs/common';
import { ShelterController } from './shelter.controller';
import ShelterTokens from './shelter.tokens';
import GetShelterDetailsUseCase from './usecases/get.shelter.details.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import { Shelter, ShelterSchema } from './schemas/shelter.schema';

@Module({
  controllers: [ShelterController],
  imports: [MongooseModule.forFeature([{ name: Shelter.name, schema: ShelterSchema }])],
  providers: [
    {
      provide: ShelterTokens.getSgelterDetailsUseCase,
      useClass: GetShelterDetailsUseCase
    }
  ]
})
export class ShelterModule {

}
