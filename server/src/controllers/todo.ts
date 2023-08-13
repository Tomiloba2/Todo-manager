import prisma from '../libs/prisma.js'
import { Request, Response } from 'express'


//@desc create a todo
//@path /todo
export const createTodo = async (req: Request, res: Response) => {
    try {
        const data = await prisma.todoList.create({
            data: {
                content: req.body.content,
                authorId: req.body.authorId,
            }
        })
        return res.status(201).json({
            message: "success",
            rest: data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}

//@desc get all todo
//@path /todo
export const getTodo = async (req: Request, res: Response) => {
    try {
        const data = await prisma.todoList.findMany({
            where: {
                authorId: req.params.id
            },
            orderBy:{
                createdAt:"asc"
            }
        })
        return res.status(200).json({
            message: "success",
            rest: data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}
//@desc delete a todo
//@path /todo
export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const data = await prisma.todoList.delete({
            where: {
                id: req.params.id
            }
        })
        return res.status(204).json({
            message: "success",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}