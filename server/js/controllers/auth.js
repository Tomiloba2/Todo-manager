var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import prisma from "../libs/prisma.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config.js';
const secretKey = process.env.JWT_SECRET || "skckndkcdkcejdoedo mm kazklcd";
//@desc create a auth
//@path /auth/register
export const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = 20;
    try {
        const data = yield prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: yield bcrypt.hash(req.body.password, salt)
            }
        });
        const { password } = data, rest = __rest(data, ["password"]);
        return res.status(201).json({
            message: "success",
            rest
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
});
//@desc authenticate a user
//@path /auth/login
export const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        });
        if (!data) {
            return res.status(404).send(`account not found please sign up to create an account`);
        }
        if (data && (yield bcrypt.compare(req.body.password, data.password))) {
            const { password } = data, rest = __rest(data, ["password"]);
            const id = data.id;
            const token = jwt.sign({ id }, secretKey, { expiresIn: '1d' });
            return res.cookie("token", token, {
                httpOnly: true
            }).json({
                message: 'success',
                rest
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.response.data });
    }
});
//@desc authenticate a user
//@path /auth/login
export const LogOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('token');
        return res.status(204).json({ message: "logout successful" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.response.data });
    }
});
export const verifyJwt = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "not authenticated" });
    }
    const { id } = jwt.verify(token, secretKey);
    req.id = id;
    next();
};
