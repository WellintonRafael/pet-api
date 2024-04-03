import { Body, Controller, Get, Inject, Patch } from '@nestjs/common';
import GetShelterDetailsUseCaseOutput from './usecases/dtos/get.shelter.details.usecase.output';
import { IUseCase } from 'src/domain/iusecase.interface';
import ShelterTokens from './shelter.tokens';
import UpdateShelterControllerInput from './usecases/dtos/update.shelter.controller.input';

@Controller('shelter')
export class ShelterController {
    
    @Inject(ShelterTokens.getSgelterDetailsUseCase)
    private readonly getShelterDetailsUseCase: IUseCase<null, GetShelterDetailsUseCaseOutput>;

    @Get()
    async getShelterDetails(): Promise<GetShelterDetailsUseCaseOutput> { 
        return await this.getShelterDetailsUseCase.run(null);        
    }

    @Patch()
    async updateShelterDetails(@Body() input: UpdateShelterControllerInput): Promise<string> {
        console.log(input)

        return await "atualizado";
    }
}
