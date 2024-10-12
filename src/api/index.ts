import express from "express"
import productsRouter from "./routes/products/router"
import categoriesRouter from "./routes/categories/router"
const router = express.Router()

router.use(productsRouter)
router.use(categoriesRouter)

export default router
