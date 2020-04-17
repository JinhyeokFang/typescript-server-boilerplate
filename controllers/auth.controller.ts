import { Router, Request, Response } from 'express';
import { ResponseSuccess, ResponseForbidden, ResponseNotFound, ResponseInternalServerError } from '../utils/response';
import { encodeToken, decodeToken } from '../utils/jwt';

import authService from '../services/auth.service'

class AuthController {

    private router: Router = Router();

    public constructor () {
        this.router.get('/', this.index);
        this.router.post('/login', this.login);
        this.router.post('/register', this.register);
    }
    public index(req: Request, res: Response): void {
        
    }
    
    public login(req: Request, res: Response): void {
        let { username, password } = req.body;
        
        authService.login(username, password, (result: any): void => {
            if (result.err == "the user not found") {
                ResponseNotFound(res, {});
            } else if (result.err) {
                ResponseInternalServerError(res, {err: result.err});
            } else {
                ResponseSuccess(res, {token: encodeToken({
                    username: username,
                    time: new Date().getTime()
                })});
            }
        });
    }
    
    public register(req: Request, res: Response): void {
        let { username, password } = req.body;  
        
        authService.register(username, password, (result: any): void => {
            if (result.err == "the user already exist.") {
                ResponseForbidden(res, {});
            } else if (result.err) {
                ResponseInternalServerError(res, {err: result.err});
            } else {
                ResponseSuccess(res, {token: encodeToken({
                    username: username,
                    time: new Date().getTime()
                })});
            }
        });
    }

    public refreshToken(req: Request, res: Response): void {
        let { token } = req.body;

        authService.refreshToken(decodeToken(token), (result: any): void => {
            if (result.err) {
                ResponseForbidden(res, {err: result.err})
            } else {
                ResponseSuccess(res, {token: encodeToken(result.token)})
            }
        });
    }

    public get controllerRouter() {
        return this.router
    }
}


export default new AuthController().controllerRouter;