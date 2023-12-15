import prisma from "../libs/prisma.js"
import bcrypt from 'bcrypt'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import 'dotenv/config.js'
import { LoginType, changePasswordType, forgotPasswordType, signUpType } from "../libs/schema.js"
import crypto from 'crypto'
import transporter from "../libs/transporter.js"



interface JwtRequest extends Request {
    id?: string;
    name?: string;
    email?: string;
}
const secretKey: Secret = process.env.JWT_SECRET || "skckndkcdkcejdoedo mm kazklcd"

export const Register = async (req: Request<{}, {}, signUpType>, res: Response, next: NextFunction) => {
    const salt = await bcrypt.genSalt(10)
    prisma.$connect
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
    } catch (error) {
        console.log(error);
        next(error)
    } finally {
        prisma.$disconnect
    }
}

export const Login = async (req: Request<{}, {}, LoginType>, res: Response, next: NextFunction) => {
    prisma.$connect
    try {
        const data = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        })
        if (!data) {
            return res.status(404).send(`account not found please sign up to create an account`)
        } else if (!await bcrypt.compare(req.body.password, data.password)) {
            res.status(401)
            throw new Error("password is incorrect");
        }
        const {
            password, createdAt,
            ...rest
        } = data
        const token = jwt.sign(rest, secretKey, { expiresIn: '1d' })
        return res.cookie("token", token, {
            httpOnly: true
        }).json({
            message: 'success',
            rest
        })
    } catch (error) {
        console.log(error);
        next(error)
    } finally {
        prisma.$disconnect
    }
}

export const forgoPassword = async (req: Request<{}, {}, forgotPasswordType>, res: Response, next: NextFunction) => {
    prisma.$connect
    try {
        const token = crypto.randomBytes(64).toString(`hex`)
        const expiresIn = new Date()
        expiresIn.setHours(expiresIn.getHours() + 1)
        const existingUser = await prisma.user.findUniqueOrThrow({
            where: {
                email: req.body.email
            }
        })
        if (existingUser) {

            const reset = await prisma.user.update({
                data: {
                    token, expiresIn
                },
                where: {
                    email: req.body.email
                }
            })
            const frontendLink = process.env.FRONTENDLINK
            const resetLink = `${frontendLink}/change-password/${token}`
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: reset.email,
                subject: `Replacement of Login information of ${reset.name} at blog.vercel.app`,
                html: `<html>

                <body>
                    <p>
                        hello ${reset.name} <br />
                
                        A request to reset the password for your account at todo-manager-client.vercel.app has been made
                        <br />
                
                        You were sent this email to reset your password on ${frontendLink}
                        click on the link or copy and paste in your browser
                        ${resetLink}.
                        This link expires in one hour
                        <br>
                        Note: If this is not you please ignore this email
                    </p>
                </body>
                
                </html>`

            }
            const info = await transporter.sendMail(mailOptions)
            return res.status(200).json(`feedback has been sent successfully`)

        }
    } catch (error) {
        console.log(error);
        next(error)
    } finally {
        prisma.$disconnect
    }
}

export const ResetPassword = async (req: Request<{}, {}, changePasswordType>, res: Response, next: NextFunction) => {
    prisma.$connect
    try {
        const body = req.body
        const user = await prisma.user.findFirst({
            where: { token: body.token },
        })
        const expiresIn = user?.expiresIn?.getTime()
        const time = new Date().getTime()
        if (expiresIn && expiresIn < time) {
            res.status(403)
            throw new Error("token has expired");
        }
        const updated = await prisma.user.update({
            where: {
                token: body.token
            },
            data: {
                password: await bcrypt.hash(body.password, 10),
                token: null,
                expiresIn: null
            }
        })
        const { password, ...rest } = updated
        return res.status(200).json({
            message: "sucessful",
            data: rest
        })
    } catch (error) {
        console.log(error);
        next(error)
    } finally {
        prisma.$disconnect
    }
}

export const LogOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('token')
        return res.status(204).json({ message: "logout successful" })
    } catch (error) {
        console.log(error);
        next(error)
    }
}
export const getSession = (req: JwtRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token
        if (!token) {
            res.status(401)
            throw new Error("not authenticated");
        } else {
            const session = jwt.verify(token, secretKey) as JwtPayload
            return res.status(200).json(session)
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const verifyJwt = (req: JwtRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token
        if (!token) {
            res.status(401)
            throw new Error("not authenticated");
        }
        const { id } = jwt.verify(token, secretKey) as JwtPayload
        req.id = id
        next()
    } catch (error) {
        console.error(`${error}, ${req.originalUrl}`);
        next(error)
    }
}