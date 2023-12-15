import { z } from 'zod'

export const SignUpSchema = z.object({
    name: z.string({ required_error: "username is required" }).min(3,`username should be a minimum of 3 characters`),
    email: z.string({ required_error: "email is required" }).email(),
    password: z.string({ required_error: "password is required" })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
         'password should be a minimum of 8 characters including special characters as well as lower and upper case letters')
})
export const LoginSchema = z.object({
    email: z.string({ required_error: "email is required" }).email(),
    password: z.string({ required_error: "password is required" })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'password should be a minimum of 8 characters including special characters as well as lower and upper case letters')
})
export const forgotPasswordSchema = z.object({
    email: z.string({ required_error: "email is required" }).email(),
})
export const changePasswordSchema = z.object({
    password: z.string({ required_error: "password is required" })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,'password should be a minimum of 8 characters including special characters as well as lower and upper case letters')
})
export const boardSchema=z.object({
    boardTitle:z.string().min(3,`board title must contain at least 3 charcters`)
})
export const todoSchema=z.object({
    content:z.string().min(3,`content must contain at least 3 charcters`)
})


export type signUpType=z.infer<typeof SignUpSchema>
export type LoginType=z.infer<typeof LoginSchema>
export type forgotPasswordType=z.infer<typeof forgotPasswordSchema>
export type changePasswordType=z.infer<typeof changePasswordSchema>
export type boardType=z.infer<typeof boardSchema>
export type TodoType=z.infer<typeof todoSchema>