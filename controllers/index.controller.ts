import { Request, Response } from 'express';

class indexController {
    constructor() {
        
    }

    public index(req: Request, res: Response): void {
        res.render('index');
    }
}

export default new indexController();