import { Router, Request, Response } from 'express';

class IndexController {
    private router: Router = Router();

    public constructor() {
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