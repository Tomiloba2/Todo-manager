import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync({
            body: req.body,
            params: req.params,
            query: req.query
        })
        next()
    } catch (error) {
        next(error)
        console.log(error);

    }
}

export default validate;