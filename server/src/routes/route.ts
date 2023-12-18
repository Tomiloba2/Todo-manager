import express, { NextFunction, Request, Response } from "express";
import {
    createBoard,
    deleteBoard,
    getBoards,
    getOneBoard
} from "../controllers/board.js";
import {
    LogOut,
    Login,
    Register,
    ResetPassword,
    forgoPassword,
    getSession,
    verifyJwt
} from "../controllers/auth.js";
import validate from "../middleware/validate.js";
import {
    LoginSchema,
    SignUpSchema,
    TodoSchema,
    boardSchema,
    changePasswordSchema,
    completedTodoSchema,
    forgotPasswordSchema
} from "../libs/schema.js";
import { completedTodo, createTodo, deleteTodo, getTodo } from "../controllers/todo.js";

export const router = express.Router()
//authentication
router.route("/register").post(validate(SignUpSchema), Register)
router.route(`/login`).post(validate(LoginSchema), Login)
router.route(`/sessionData`).get(verifyJwt, getSession)
router.route(`/logout`).get(LogOut)
router.route(`/reset-password`).patch(validate(changePasswordSchema), ResetPassword)
router.route(`/forgot-password`).post(validate(forgotPasswordSchema), forgoPassword)

//Board
router.post('/board', verifyJwt, validate(boardSchema), createBoard)
router.get(`/board/:id`, verifyJwt, getBoards)
router.get(`/a-board/:id`, verifyJwt, getOneBoard)
router.delete('/board/:id', verifyJwt, deleteBoard)

//todolist
router.post('/todo', verifyJwt, validate(TodoSchema), createTodo)
router.route(`/todo/:id`)
    .get(verifyJwt, getTodo)
    .delete(verifyJwt, deleteTodo)
    .patch(verifyJwt, validate(completedTodoSchema), completedTodo)

//404 routes
router.all(`*`, (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(404)
        throw new Error(`route ${req.originalUrl} does not exist`);
    } catch (error) {
        next(error)
    }

})