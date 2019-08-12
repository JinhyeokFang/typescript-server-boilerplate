import { Response } from 'express';

var ResponseSuccess = function (res: Response, body: object) {
    res.json({
        status: "Success",
        body
    });
}

var ResponseForbidden = function (res: Response, body: object) {
    res.status(403).json({
        status: "Forbidden",
        body
    });
}

var ResponseNotFound = function (res: Response, body: object) {
    res.status(404).json({
        status: "Not Found",
        body
    });
}

var ResponseInternalServerError = function (res: Response, body: object) {
    res.status(500).json({
        status: "Internal Server Error",
        body
    });
}

export { ResponseSuccess, ResponseForbidden, ResponseNotFound, ResponseInternalServerError };