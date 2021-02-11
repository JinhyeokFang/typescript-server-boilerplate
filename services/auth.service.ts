import { UserModel, UserModelT } from '../models/user.model';
import { Crypto } from '../utils/crypto';

export enum AuthServiceError {
    UserAlreadyExist,
    UserNotFound,
    DBError
}

export class AuthService {
    public login(username: string, password: string): Promise<Record<string, unknown>> {
        return new Promise((resolve: (data: Record<string, unknown>) => void, reject: (error: Record<string, unknown>) => void): void => {
            UserModel.findOne({username: Crypto.encrypt(username), password: Crypto.encrypt(password)}, (err: Record<string, unknown>, res: UserModelT): void => {
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

    public register(username: string, password: string): Promise<Record<string, unknown>> {
        return new Promise((resolve: (data: Record<string, unknown>) => void, reject: (error: Record<string, unknown>) => void): void => {
            UserModel.findOne({username: Crypto.encrypt(username)}, (err: Record<string, unknown>, res: UserModelT): void => {
                if (err) {
                    reject({errorType: AuthServiceError.DBError, message: err});
                } else if (res == null) {
                    new UserModel({username: Crypto.encrypt(username), password: Crypto.encrypt(password)}).save((err: Record<string, unknown>): void => {
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