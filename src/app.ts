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
import multiparty from "multiparty"
require("express-async-errors")

dotenv.config()

const app = express()

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function main() {
    app.use(morgan("dev"))
    app.use(helmet())
    app.use(cors())
    app.use(express.json())

    app.post("/api/upload", async (req, res) => {
        const form = new multiparty.Form()

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error("Error parsing form data:", err)
                return res
                    .status(500)
                    .json({ error: "Error parsing form data" })
            }

            try {
                console.log("Uploading image...")

                const file = files.image?.[0]
                if (!file) {
                    return res.status(400).json({ error: "No file uploaded" })
                }

                // Upload the file to Cloudinary
                const result = await cloudinary.uploader.upload(file.path)

                console.log("Image uploaded successfully:", result)
                res.json(result)
            } catch (error) {
                console.error("Image upload failed:", error)
                res.status(500).send(error)
            }
        })
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
