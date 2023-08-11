import express from "express";
import {
    createTodo,
    deleteTodo,
    getTodo
} from "../controllers/todo.js";
import {
    LogOut,
    Login,
    Register,
    verifyJwt
} from "../controllers/auth.js";

export const router = express.Router()
//authentication
router.route("/register").post(Register)
router.route(`/login`).post(Login)
router.route(`/logout`).post(LogOut)
//todo
router.post('/todo', verifyJwt, createTodo)
router.get(`/todo/:id`, verifyJwt, getTodo)
router.delete('/todo/:id', verifyJwt, deleteTodo)