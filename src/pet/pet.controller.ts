import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from 'src/config/multer.config';
import { IUseCase } from 'src/domain/iusecase.interface';
import CreatePetControllerInput from './dtos/create.pet.controller.input';
import UpdatePetControllerInput from './dtos/update.pet.controller.input';
import PetTokens from './pet.tokens';
import CreatePetUseCaseInput from './usecases/dtos/inputs/create.pet.usecase.input';
import DeletePetByIdUseCaseInput from './usecases/dtos/inputs/delete.pet.by.id.usecase.input';
import GetPetByIdUseCaseInput from './usecases/dtos/inputs/get.pet.by.id.usecase.input';
import UpdatePetByIdUseCaseInput from './usecases/dtos/inputs/update.pet.by.id.usecase.input';
import UpdatePetPhotoByIdUseCaseInput from './usecases/dtos/inputs/update.pet.photo.by.id.usecase.input';
import CreatePetUseCaseOutput from './usecases/dtos/outputs/create.pet.usecase.output';
import DeletePetByIdUseCaseOutput from './usecases/dtos/outputs/delete.pet.by.id.usecase.output';
import GetPetByIdUseCaseOutput from './usecases/dtos/outputs/get.pet.by.id.usecase.output';
import UpdatePetByIdUseCaseOutput from './usecases/dtos/outputs/update.pet.by.id.usecase.output';
import UpdatePetPhotoByIdUseCaseOutput from './usecases/dtos/outputs/update.pet.photo.by.id.usecase.output';
import GetPetsUseCaseInput from './usecases/dtos/inputs/get.pets.usecase.input';
import GetPetsUseCaseOutput from './usecases/dtos/outputs/get.pets.usecase.output';
import { Promise } from 'mongoose';

@Controller('pet')
export class PetController {

    @Inject(PetTokens.createPetUseCase)
    private readonly createPetUseCase: IUseCase<CreatePetUseCaseInput, CreatePetUseCaseOutput>

    @Inject(PetTokens.getPetsUseCase)
    private readonly getPetsUseCase: IUseCase<GetPetsUseCaseInput, GetPetsUseCaseOutput>

    @Inject(PetTokens.getPetByIdUseCase)
    private readonly getPetByIdUseCase: IUseCase<GetPetByIdUseCaseInput, GetPetByIdUseCaseOutput>

    @Inject(PetTokens.updatePetByIdUseCase)
    private readonly updatePetByIdUseCase: IUseCase<UpdatePetByIdUseCaseInput, UpdatePetByIdUseCaseOutput>

    @Inject(PetTokens.deletePetByIdUseCase)
    private readonly deletePetByIdUseCase: IUseCase<DeletePetByIdUseCaseInput, DeletePetByIdUseCaseOutput>

    @Inject(PetTokens.updatePetPhotoByIdUseCase)
    private readonly updatePetPhotoByIdUseCase: IUseCase<UpdatePetPhotoByIdUseCaseInput, UpdatePetPhotoByIdUseCaseOutput>

    @Post()
    async createPet(@Body() input: CreatePetControllerInput): Promise<CreatePetUseCaseOutput> {
        const useCaseInput = new CreatePetUseCaseInput({ ...input });

        return await this.createPetUseCase.run(useCaseInput);
    }

    @Get()
    async getPets(
        @Query('type') type?: string,
        @Query('size') size?: string,
        @Query('gender') gender?: string,
        @Query('page') page?: string,
        @Query('itemsPerPage') itemsPerPage?: string,
    ): Promise<GetPetsUseCaseOutput> {
        const FIRST_PAGE: number = 1;
        const DEFAULT_ITEMS_PER_PAGE: number = 10;
        const useCaseInput = new GetPetsUseCaseInput ({
            type: !!type ? type : null,
            size: !!size ? size : null,
            gender: !!gender ? gender : null,
            page: !!page ? parseInt(page) : FIRST_PAGE,
            itemsPerPage: !!itemsPerPage ? parseInt(itemsPerPage) : DEFAULT_ITEMS_PER_PAGE,
        });

        return await this.getPetsUseCase.run(useCaseInput)
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

    @Patch(':id/photo')
    @UseInterceptors(FileInterceptor('photo', multerConfig))
    async updatePhoto(@UploadedFile() photo: Express.Multer.File, @Param('id') id: string): Promise<UpdatePetByIdUseCaseOutput> {

        try {
            const useCaseInput = new UpdatePetPhotoByIdUseCaseInput({
                id,
                photoPatch: photo.path
            })

            return await this.updatePetPhotoByIdUseCase.run(useCaseInput)
        }
        catch (error) {
            throw new BadRequestException(JSON.parse(error.message));
        }
    }
}
