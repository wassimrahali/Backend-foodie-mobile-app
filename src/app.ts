import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import api from "./api/index"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(morgan("dev"))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        message: "hello world !",
    })
})

app.use("/api/", api)

// middlewares
import errorHandler from "./middleware/errorHandler"
app.use(errorHandler)

import notFound from "./middleware/notFound"
app.use(notFound)

export default app
