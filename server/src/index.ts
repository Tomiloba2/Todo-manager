import express, { Request, Response } from 'express'
import cookieParser from "cookie-parser"
import cors, { CorsOptions } from "cors"
import "dotenv/config.js"
import {
    router
} from './routes/route.js'
import errorHandler from './middleware/errorHandler.js'
import morgan from 'morgan'

const Port = process.env.PORT
const corsOpt: CorsOptions = {
    origin: ["https://todo-manager-client.vercel.app/", "http://localhost:5173/"],
    methods: ["GET", 'POST', "PUT", 'DELETE', "PATCH"],
    credentials: true
}

const app = express()
app.use(cors(corsOpt))
app.use(express.json())
app.use(cookieParser())
app.use(morgan(`dev`))

app.use(`/api`, router)
app.get(`/`, ( req: Request,res: Response) => {
    console.log();
    res.status(200).send(`hello welcome to do list`)
})

app.use(errorHandler)
app.listen(Port, () => {
    console.log(`server is running on Port ${Port} `);
})

export default app