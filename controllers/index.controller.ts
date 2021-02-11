import { Router, Request, Response } from 'express';
import { Controller } from './controller';

export class IndexController extends Controller {
    protected router: Router = Router();

    public constructor() {
        super();
        this.router.get('/', this.index);
        this.router.get('/login/google', this.googleLogin);
    }

    private index(req: Request, res: Response): void {
        res.render('index');
    }

    private googleLogin(req: Request, res: Response): void {
        res.render('googleLogin');
    }

    public get controllerRouter(): Router {
        return this.router
    }
}

export default new IndexController().controllerRouter;