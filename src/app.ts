import "module-alias/register"
import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import api from "./api/index"
import dotenv from "dotenv"
import errorHandler from "./api/middleware/errorHandler"
import notFound from "./api/middleware/notFound"
import { swaggerSpec, swaggerUi } from "./swagger"
dotenv.config()

const app = express()

async function main() {
    app.use(morgan("dev"))
    app.use(helmet())
    app.use(cors())
    app.use(express.json())

    app.get("/", (req, res) => {
        res.send("nothing here try /api/products")
    })
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use("/api/", api)

    // middlewares
    app.use(errorHandler)

    app.use(notFound)
}
main()
export default app
