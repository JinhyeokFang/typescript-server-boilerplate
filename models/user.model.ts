import { Schema, model, Model } from 'mongoose';
import { Document } from 'mongoose';

interface UserModelT extends Document {
    username: string;
    password: string;
};

const userSchema = new Schema({
    username: String,
    password: String
});

const UserModel: Model<UserModelT> = model("user", userSchema);

export { UserModel, UserModelT }