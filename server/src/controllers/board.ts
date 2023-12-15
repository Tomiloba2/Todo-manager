import prisma from '../libs/prisma.js'
import { NextFunction, Request, Response } from 'express'
import { boardType } from '../libs/schema.js'




export const createBoard = async (req: Request<{}, {}, boardType>, res: Response, next: NextFunction) => {
    prisma.$connect
    try {
        const data = await prisma.board.create({
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
        next(error)
    } finally {
        prisma.$disconnect
    }
}

//@desc get all todo
//@path /todo
export const getBoards = async (req: Request, res: Response, next: NextFunction) => {
    prisma.$connect
    try {
        const data = await prisma.board.findMany({
            where: {
                authorId: req.params.id
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
//@desc get all todo
//@path /todo
export const getOneBoard = async (req: Request, res: Response, next: NextFunction) => {
    prisma.$connect
    try {
        const data = await prisma.board.findFirstOrThrow({
            where: {
                id: req.params.id
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
export const deleteBoard = async (req: Request, res: Response, next: NextFunction) => {
    prisma.$connect
    try {

        const dependecies = await prisma.todolist.deleteMany({
            where: {
                boardId: req.params.id
            }
        })
        const data = await prisma.board.delete({
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