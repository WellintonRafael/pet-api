import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose"

export type PetDocument = HydratedDocument<Pet>;

@Schema({ versionKey: false })
export class Pet {
    @Prop({
        required: true, auto: true, type: mongoose.Schema.Types.ObjectId
    })
    _id: string;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    bio: string;

    @Prop({required: true})
    gender: string;

    @Prop({required: true})
    size: string;

    @Prop({required: false, default: null})
    photo: string;

    @Prop({required: true})
    type: string;

    @Prop({required: true})
    updatedAt: string;

    @Prop({required: true})
    createdAt: string;
};

export const ShelterSchema = SchemaFactory.createForClass(Pet);
