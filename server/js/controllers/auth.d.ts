import { Request, Response, NextFunction } from 'express';
interface JwtRequest extends Request {
    id?: any;
}
export declare const Register: (req: JwtRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const Login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const LogOut: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const verifyJwt: (req: JwtRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
