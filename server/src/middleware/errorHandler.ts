import { Request, Response, NextFunction } from 'express'

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = req.statusCode && req.statusCode !== 200 ? req.statusCode : 500
    return res.status(statusCode).json({
        err: err.name,
        msg: err.message
    })
}

export default errorHandler;