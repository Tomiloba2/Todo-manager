import prisma from "../libs/prisma.js"
import bcrypt from 'bcrypt'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import  'dotenv/config.js'

const secretKey: Secret = process.env.JWT_SECRET ||"skckndkcdkcejdoedo mm kazklcd" 
interface JwtRequest extends Request {
    id?: any
}
//@desc create a auth
//@path /auth/register
export const Register = async (req: JwtRequest, res: Response) => {
    const salt = 20
    try {
        const data = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, salt)
            }
        })
        const {
            password,
            ...rest
        } = data
        return res.status(201).json({
            message: "success",
            rest
        })
    } catch (error: any) {
        console.log(error);
        return res.status(500).json(error.message)
    }
}

//@desc authenticate a user
//@path /auth/login
export const Login = async (req: Request, res: Response) => {
    try {
        const data = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        })
        if (!data) {
            return res.status(404).send(`account not found please sign up to create an account`)
        }
        if (data && await bcrypt.compare(req.body.password, data.password)) {
            const {
                password,
                ...rest
            } = data
            const id = data.id
            const token = jwt.sign({ id }, secretKey, { expiresIn: '1d' })
            return res.cookie("token", token, {
                httpOnly: true
            }).json({
                message: 'success',
                rest
            })
        }
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: error.response.data })
    }
}

//@desc authenticate a user
//@path /auth/login
export const LogOut = async (req: Request, res: Response) => {
    try {
        res.clearCookie('token')
        return res.status(204).json({ message: "logout successful" })
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: error.response.data })
    }
}

export const verifyJwt = (req: JwtRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "not authenticated" })
    }
    const { id } = jwt.verify(token, secretKey) as JwtPayload
    req.id = id
    next()
}