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
import { v2 as cloudinary } from "cloudinary"
import multer from "multer"
require("express-async-errors")

dotenv.config()

const app = express()

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Configure Multer
const upload = multer({ dest: "public/" })

async function main() {
    app.use(morgan("dev"))
    app.use(helmet())
    app.use(cors())
    app.use(express.json())

    app.post("/api/upload", upload.single("image"), async (req: any, res) => {
        try {
            console.log("uplodaing image....")
            const result = await cloudinary.uploader.upload(req?.file?.path)
            res.json(result)
        } catch (error) {
            console.log("image was not uploaded")
            console.error(error)
            res.status(500).json({
                error: "An error occurred during the upload",
            })
        }
    })
    app.get("/", async (req, res) => {
        res.redirect("/api-docs")
    })

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.use("/api/", api)

    // middlewares
    app.use(errorHandler)

    app.use(notFound)
}
main()
export default app
