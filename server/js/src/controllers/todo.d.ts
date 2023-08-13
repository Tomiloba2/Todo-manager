import { Request, Response } from 'express';
export declare const createTodo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getTodo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteTodo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
