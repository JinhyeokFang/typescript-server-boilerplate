import { Router, Request, Response } from 'express';
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';

import { AuthService, AuthServiceError } from '../services/auth.service'
import { Controller } from './controller';
import { JWT, TokenStatus } from '../utils/jwt';

export class AuthController extends Controller {
    protected router: Router = Router();

    public constructor () {
        super();
        this.router.post('/login', this.login);
        this.router.post('/register', this.register);
        this.router.post('/relogin', this.relogin);
        this.router.post('/tokenCheck', this.tokenData);
        this.router.post('/google', this.google);
    }
    
    private async login(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;
        
        try {
            await new AuthService().login(username, password);
            
            super.ResponseSuccess(res, {accessToken: JWT.createAccessToken({username}), refreshToken: JWT.createRefreshToken({username})});
        } catch (error) {
            if (error.errorType == AuthServiceError.UserNotFound) {
                super.ResponseNotFound(res, { error: "User Not Found" });
            } else {
                super.ResponseInternalServerError(res, { error: "DB Error", meesage: error.message });
            }
        }
    }
    
    private async register(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;

        try {
            await new AuthService().register(username, password);

            super.ResponseSuccess(res, {});
        } catch (error) {
            if (error.errorType == AuthServiceError.UserAlreadyExist) {
                super.ResponseForbidden(res, { error: "User Already Exist" });
            } else {
                super.ResponseInternalServerError(res, { error: "DB Error", meesage: error.message });
            }    
        }
    }

    private async relogin(req: Request, res: Response): Promise<void> {
        const { refreshToken } = req.body;  

        const result = JWT.checkRefreshToken(refreshToken);
        if (result.status == TokenStatus.OK) {
            super.ResponseSuccess(res, {accessToken: JWT.createAccessToken(result.userData ? result.userData : {}), refreshToken: JWT.createRefreshToken(result.userData ? result.userData : {})});
        } else if (result.status == TokenStatus.Expired) {
            super.ResponseForbidden(res, {error: "Token Is Expired" });
        } else {
            super.ResponseBadRequest(res, {error: "Token Is Wrong" });
        }
    }

    private async tokenData(req: Request, res: Response): Promise<void> {
        const { token } = req.body;  

        const tokenObject = JWT.decodeToken(token);
        const checkAccessToken = JWT.checkAccessToken(token);
        const checkRefreshToken = JWT.checkRefreshToken(token);
        super.ResponseSuccess(res, { tokenObject, accessTokenOK: checkAccessToken.status == TokenStatus.OK, refreshTokenOK: checkRefreshToken.status == TokenStatus.OK });
    }

    private async google(req: Request, res: Response): Promise<void> {
        const { token } = req.body; 
        const client = new OAuth2Client("546712292410-8q584dg9sfv8e54fmuu3a1hq1b1vo4us");

        const ticket: LoginTicket = await client.verifyIdToken({
            idToken: token
        });
        const payload: TokenPayload | undefined = ticket.getPayload();
        const userid = payload == undefined ? "error" : payload['sub'];

        super.ResponseSuccess(res, { userid });
    }

    public get controllerRouter(): Router {
        return this.router
    }
}


export default new AuthController().controllerRouter;