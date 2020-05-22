import { Router, Request, Response } from 'express';

import { AuthService } from '../services/auth.service'
import { Controller } from './controller';
import { jwt } from '../utils/jwt';

export class AuthController extends Controller {
    private authService: AuthService = new AuthService();
    protected router: Router = Router();

    public constructor () {
        super();
        this.router.get('/', this.index);
        this.router.post('/login', this.login);
        this.router.post('/register', this.register);
    }
    public index(req: Request, res: Response): void {
        
    }
    
    public async login(req: Request, res: Response): Promise<void> {
        let { username, password } = req.body;
        
        try {
            await this.authService.login(username, password);
            
            super.ResponseSuccess(res, {token: jwt.encodeToken({
                username: username,
                time: new Date().getTime()
            })});
        } catch (err) {
            if (err == "the user not found") {
                super.ResponseNotFound(res, {});
            } else {
                super.ResponseInternalServerError(res, {err});
            }
        }
    }
    
    public async register(req: Request, res: Response): Promise<void>{
        let { username, password } = req.body;  
        
        try {
            await this.authService.register(username, password);

            super.ResponseSuccess(res, {token: jwt.encodeToken({
                username: username,
                time: new Date().getTime()
            })});
        } catch (err) {
            if (err == "the user already exist.") {
                super.ResponseForbidden(res, {});
            } else {
                super.ResponseInternalServerError(res, {err});
            }    
        }
    }

    public async refreshToken(req: Request, res: Response): Promise<void>{
        let { token } = req.body;

        try {
            let refreshedToken: object = await this.authService.refreshToken(jwt.decodeToken(token));
            super.ResponseSuccess(res, {token: jwt.encodeToken(refreshedToken)})
        } catch (err) {
            super.ResponseForbidden(res, {err});
        }        
    }

    public get controllerRouter() {
        return this.router
    }
}


export default new AuthController().controllerRouter;