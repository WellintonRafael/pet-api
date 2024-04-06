import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type ShelterDocument = HydratedDocument<Shelter>;

@Schema({ versionKey: false })
export class Shelter {
    @Prop({ required: true})
    name: string;
    @Prop({ required: true})
    whatsApp: string;
    @Prop({ required: true})
    phone: string;
    @Prop({ required: true})
    email: string;
    @Prop({ required: true})
    createdAt: Date;
    @Prop({ required: true})
    updateAt: Date;
};

export const ShelterSchema = SchemaFactory.createForClass(Shelter);