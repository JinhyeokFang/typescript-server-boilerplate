import { UserModel, UserModelT } from '../models/user.model';
import { Crypto } from '../utils/crypto';

export enum AuthServiceError {
    UserAlreadyExist,
    UserNotFound,
    DBError
}

export class AuthService {
    public login(username: string, password: string): Promise<void> {
        return new Promise((resolve: Function, reject: Function): void => {
            UserModel.findOne({username: Crypto.encrypt(username), password: Crypto.encrypt(password)}, (err: object, res: UserModelT): void => {
                if (err) {
                    reject({errorType: AuthServiceError.DBError, message: err});
                } else if (res == null) {
                    reject({errorType: AuthServiceError.UserNotFound});
                } else {
                    resolve({});
                }
            });
        });
    }

    public register(username: string, password: string): Promise<void> {
        return new Promise((resolve: Function, reject: Function): void => {
            UserModel.findOne({username: Crypto.encrypt(username)}, (err: object, res: UserModelT): void => {
                if (err) {
                    reject({errorType: AuthServiceError.DBError, message: err});
                } else if (res == null) {
                    new UserModel({username: Crypto.encrypt(username), password: Crypto.encrypt(password)}).save((err: object): void => {
                        if (err)
                            reject({errorType: AuthServiceError.DBError, message: err});
                        else
                            resolve({});
                    })
                } else {
                    reject({errorType: AuthServiceError.UserAlreadyExist});
                }
            });
        });
    }
}