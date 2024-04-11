import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import CreatePetControllerInput from './dtos/create.pet.controller.input';
import { IUseCase } from 'src/domain/iusecase.interface';
import CreatePetUseCaseInput from './usecases/dtos/inputs/create.pet.usecase.input';
import CreatePetUseCaseOutput from './usecases/dtos/outputs/create.pet.usecase.output';
import PetTokens from './pet.tokens';
import GetPetByIdUseCaseInput from './usecases/dtos/inputs/get.pet.by.id.usecase.input';
import GetPetByIdUseCaseOutput from './usecases/dtos/outputs/get.pet.by.id.usecase.output';
import UpdatePetControllerInput from './dtos/update.pet.controller.input';
import UpdatePetByIdUseCaseOutput from './usecases/dtos/outputs/update.pet.by.id.usecase.output';
import UpdatePetByIdUseCaseInput from './usecases/dtos/inputs/update.pet.by.id.usecase.input';
import UpdatePetByIdUseCase from './usecases/update.pet.by.id.usecase';
import DeletePetByIdUseCaseInput from './usecases/dtos/inputs/delete.pet.by.id.usecase.input';
import DeletePetByIdUseCaseOutput from './usecases/dtos/outputs/delete.pet.by.id.usecase.output';

@Controller('pet')
export class PetController {

    @Inject(PetTokens.createPetUseCase)
    private readonly createPetUseCase: IUseCase<CreatePetUseCaseInput, CreatePetUseCaseOutput>

    @Inject(PetTokens.getPetByIdUseCase)
    private readonly getPetByIdUseCase: IUseCase<GetPetByIdUseCaseInput, GetPetByIdUseCaseOutput>

    @Inject(PetTokens.updatePetByIdUseCase)
    private readonly updatePetByIdUseCase: IUseCase<UpdatePetByIdUseCaseInput, UpdatePetByIdUseCaseOutput>

    @Inject(PetTokens.deletePetByIdUseCase)
    private readonly deletePetByIdUseCase: IUseCase<DeletePetByIdUseCaseInput, DeletePetByIdUseCaseOutput>

    @Post()
    async createPet(@Body() input: CreatePetControllerInput): Promise<CreatePetUseCaseOutput> {
        const useCaseInput = new CreatePetUseCaseInput({ ...input });

        return await this.createPetUseCase.run(useCaseInput);
    }

    @Get(':id')
    async getPetById(@Param('id') id: string): Promise<GetPetByIdUseCaseOutput> {
        try {
            const useCaseInput = new GetPetByIdUseCaseInput({ id })

            return await this.getPetByIdUseCase.run(useCaseInput);
        }
        catch (error) {
            throw new BadRequestException(JSON.parse(error.message));
        }
    }

    @Put(':id')
    async updatePet(@Param('id') id: string, @Body() input: UpdatePetControllerInput): Promise<UpdatePetByIdUseCaseOutput> {
        try {
            const useCaseInput = new UpdatePetByIdUseCaseInput({ ...input, id })

            return await this.updatePetByIdUseCase.run(useCaseInput);
        }
        catch (error) {
            throw new BadRequestException(JSON.parse(error.message));
        }
    }

    @Delete(':id')
    async deletePet(@Param('id') id: string) {
        try {
            const useCaseInput = new DeletePetByIdUseCaseInput({ id });
            return await this.deletePetByIdUseCase.run(useCaseInput);
        } catch (error) {
            throw new BadRequestException(JSON.parse(error.message));
        }
    }
}
