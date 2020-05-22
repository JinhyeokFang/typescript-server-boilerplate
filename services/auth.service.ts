import UserModelT from '../types/user.type';
import UserModel from '../models/user.model';
import { crypto } from '../utils/crypto';

export class AuthService {
    public login(username: string, password: string): Promise<void> {
        return new Promise((resolve: Function, reject: Function): void => {
            UserModel.findOne({username: crypto.encrypt(username), password: crypto.encrypt(password)}, (err: object, res: UserModelT): void => {
                if (err) {
                    reject(err);
                } else if (res == null) {
                    reject("the user not found");
                } else {
                    resolve();
                }
            });
        });
    }

    public register(username: string, password: string): Promise<void> {
        return new Promise((resolve: Function, reject: Function): void => {
            UserModel.findOne({username: crypto.encrypt(username)}, (err: object, res: UserModelT): void => {
                if (err) {
                    reject(err);
                } else if (res == null) {
                    new UserModel({username: crypto.encrypt(username), password: crypto.encrypt(password)}).save((err: object): void => {
                        if (err)
                            reject(err);
                        else
                            resolve();
                    })
                } else {
                    reject("the user already exist.");
                }
            });
        });
    }

    public refreshToken(token): Promise<object> {
        return new Promise((resolve: Function, reject: Function): void => {
            if (token.time < new Date().getTime() - 345600) {
                reject("time expired")
            } else {
                resolve({time: new Date().getTime(), username: token.username });
            }
        });
    }
}