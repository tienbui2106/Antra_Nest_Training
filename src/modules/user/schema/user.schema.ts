import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  collection: 'users',
})
export class User {
  @Prop({unique: true})
  username: string;

  @Prop()
  password: string;

  @Prop({unique: true})
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);