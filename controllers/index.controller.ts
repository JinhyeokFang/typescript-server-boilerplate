import { Router, Request, Response } from 'express';
import { Controller } from './controller';

export class IndexController extends Controller {
    protected router: Router = Router();

    public constructor() {
        super();
        this.router.get('/', this.index);
    }

    public index(req: Request, res: Response): void {
        res.render('index');
    }

    public get controllerRouter() {
        return this.router
    }
}

export default new IndexController().controllerRouter;