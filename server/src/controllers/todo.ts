import prisma from '../libs/prisma.js'
import { NextFunction, Request, Response } from 'express'
import { TodoType, completedTodoTYpe } from '../libs/schema.js'


//@desc create a todo
//@path /todo
export const createTodo = async (req: Request<{}, {}, TodoType>, res: Response, next: NextFunction) => {
    prisma.$connect
    try {
        const data = await prisma.todolist.create({
            data: {
                content: req.body.content,
                boardId: req.body.boardId,
            }
        })
        return res.status(201).json({
            message: "success",
            rest: data
        })
    } catch (error) {
        console.log(error);
        next(error)
    } finally {
        prisma.$disconnect
    }
}

//@desc get all todo
//@path /todo
export const getTodo = async (req: Request, res: Response, next: NextFunction) => {
    prisma.$connect
    try {
        const data = await prisma.todolist.findMany({
            where: {
                boardId: req.params.id
            },
            orderBy: {
                createdAt: "asc"
            }
        })
        return res.status(200).json({
            message: "success",
            rest: data
        })
    } catch (error) {
        console.log(error);
        next(error)
    } finally {
        prisma.$disconnect
    }
}
//@desc delete a todo
//@path /todo
export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    prisma.$connect
    try {
        const data = await prisma.todolist.delete({
            where: {
                id: req.params.id
            }
        })
        return res.status(204).json({
            message: "success",
        })
    } catch (error) {
        console.log(error);
        next(error)
    } finally {
        prisma.$disconnect
    }
}

//@desc completed todo
//@path /todo/completed

export const completedTodo = async (req: Request<{id:string},{},completedTodoTYpe>, res: Response, next: NextFunction) => {
    prisma.$connect
    try {
        const { id } = req.params
        const body = req.body
        const data = await prisma.todolist.update({
            where: {
                id
            },
            data: {
                isComplete: body.isComplete === true ? false : true
            }
        })
        return res.status(200).json({
            message:`successfully completed`
        })
    } catch (error) {
        console.log(error);
        next(error)
    } finally {
        prisma.$disconnect
    }
}