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
        encrypt(new Array<string>(username, password), (result: string[]): void => {
            this.userModel.findOne({username: result[0], password: result[1]}, (err: object, res: UserModelType): void => {
                if (err) {
                    callback({ message: "failed", err });
                } else if (res == null) {
                    callback({ message: "failed", err: "the user not found" });
                } else {
                    callback({ message: "complete" });
                }
            });
        });
    }

    public register(username: string, password: string, callback: Function): void {
        encrypt(new Array<string>(username, password), (result: string[]): void => {
            this.userModel.findOne({username: result[0]}, (err: object, res: UserModelType): void => {
                if (err) {
                    callback({ message: "failed", err });
                } else if (res == null) {
                    callback({ message: "success" });
                    new this.userModel({username: result[0], password: result[1]}).save((err: object): void => {
                        if (err)
                            callback({ message: "failed", err });
                        else
                            callback({ message: "complete" });
                    })
                } else {
                    callback({ message: "failed", err: "the user already exist."});
                }
            });
        });
    }
}

export default new User();