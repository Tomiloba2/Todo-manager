var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from '../libs/prisma.js';
//@desc create a todo
//@path /todo
export const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.todoList.create({
            data: {
                content: req.body.content,
                authorId: req.body.authorId,
            }
        });
        return res.status(201).json({
            message: "success",
            rest: data
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
//@desc get all todo
//@path /todo
export const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.todoList.findMany({
            where: {
                authorId: req.params.id
            },
            orderBy: {
                createdAt: "asc"
            }
        });
        return res.status(200).json({
            message: "success",
            rest: data
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
//@desc delete a todo
//@path /todo
export const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.todoList.delete({
            where: {
                id: req.params.id
            }
        });
        return res.status(204).json({
            message: "success",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
