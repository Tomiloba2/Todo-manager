import { z } from 'zod'

export const SignUpSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "username is required" }).min(3, `username should be a minimum of 3 characters`),
        email: z.string({ required_error: "email is required" }).email(),
        password: z.string({ required_error: "password is required" })
            .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                'password should be a minimum of 8 characters including special characters as well as lower and upper case letters')
    })
})
export const LoginSchema = z.object({
    body: z.object({
        email: z.string({ required_error: "email is required" }).email(),
        password: z.string({ required_error: "password is required" })
            .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'password should be a minimum of 8 characters including special characters as well as lower and upper case letters')
    })
})
export const forgotPasswordSchema = z.object({
    body: z.object({
        email: z.string({ required_error: "email is required" }).email(),
    })
})
export const changePasswordSchema = z.object({
    body: z.object({
        token: z.string(),
        password: z.string({ required_error: "password is required" })
            .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'password should be a minimum of 8 characters including special characters as well as lower and upper case letters')
    })
})
export const boardSchema = z.object({
    body: z.object({
        content: z.string().min(3, `board title must contain at least 3 charcters`),
        authorId: z.string()
    })
})
export const TodoSchema = z.object({
    body: z.object({
        content: z.string().min(3, `board title must contain at least 3 charcters`),
        boardId: z.string()
    })
})
export const completedTodoSchema = z.object({
    body: z.object({
        isComplete: z.boolean()
    })
})


export type signUpType = z.infer<typeof SignUpSchema>[`body`]
export type LoginType = z.infer<typeof LoginSchema>[`body`]
export type forgotPasswordType = z.infer<typeof forgotPasswordSchema>[`body`]
export type changePasswordType = z.infer<typeof changePasswordSchema>[`body`]

export type boardType = z.infer<typeof boardSchema>[`body`]
export type TodoType = z.infer<typeof TodoSchema>[`body`]
export type completedTodoTYpe=z.infer<typeof completedTodoSchema>[`body`]