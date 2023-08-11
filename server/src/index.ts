import express from 'express'
import cookieParser from "cookie-parser"
import cors from "cors"
//import jwt from "jsonwebtoken"
import {
    router
} from './routes/route.js'

const Port = 2000

const app = express()
app.use(express.json())
const corsOpt = {
    origin: ['http://localhost:5173'],
    method: ["GET", 'POST', "PUT", 'DELETE'],
    credentials: true
}
app.use(cors(corsOpt))
app.use(cookieParser())

app.use(`/api`, router)

app.listen(Port, () => {
    console.log(`server is running on Port ${Port} `);
})