import { Response, Router } from 'express';

export abstract class Controller {
    protected abstract router: Router;

    protected ResponseSuccess(res: Response, body: Record<string, unknown>): void {
        res.json({
            status: "Success",
            body
        });
    }
    
    protected ResponseBadRequest(res: Response, body: Record<string, unknown>): void {
        res.status(400).json({
            status: "Bad Request",
            body
        });
    }
    
    protected ResponseUnauthorized(res: Response, body: Record<string, unknown>): void {
        res.status(401).json({
            status: "Unauthorized",
            body
        });
    }
    
    protected ResponseForbidden(res: Response, body: Record<string, unknown>): void {
        res.status(403).json({
            status: "Forbidden",
            body
        });
    }
    
    protected ResponseNotFound(res: Response, body: Record<string, unknown>): void {
        res.status(404).json({
            status: "Not Found",
            body
        });
    }
    
    protected ResponseInternalServerError(res: Response, body: Record<string, unknown>): void {
        res.status(500).json({
            status: "Internal Server Error",
            body
        });
    }
}