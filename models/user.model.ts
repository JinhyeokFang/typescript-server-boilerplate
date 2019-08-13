import { Schema, model, Model, Document } from 'mongoose';

import { encrypt } from '../utils/crypto';

interface UserModelType extends Document {
    username: string;
    password: string;
};

const userSchema = new Schema({
    username: String,
    password: String
});

class User {
    private userModel: Model<UserModelType> = model("user", userSchema);
    public login(username: string, password: string, callback: Function): void {
        this.userModel.findOne({username: encrypt(username), password: encrypt(password)}, (err: object, res: UserModelType): void => {
            if (err) {
                callback({ message: "failed", err });
            } else if (res == null) {
                callback({ message: "failed", err: "the user not found" });
            } else {
                callback({ message: "complete" });
            }
        });
    }

    public register(username: string, password: string, callback: Function): void {
        this.userModel.findOne({username: encrypt(username)}, (err: object, res: UserModelType): void => {
            if (err) {
                callback({ message: "failed", err });
            } else if (res == null) {
                new this.userModel({username: encrypt(username), password: encrypt(password)}).save((err: object): void => {
                    if (err)
                        callback({ message: "failed", err });
                    else
                        callback({ message: "complete" });
                })
            } else {
                callback({ message: "failed", err: "the user already exist."});
            }
        });
    }
}

export default new User();