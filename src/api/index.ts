import express from "express"
import productsRouter from "./routes/products/router"
import categoriesRouter from "./routes/categories/router"
import customerRouter from "./routes/auth/router"
const router = express.Router()

router.use(productsRouter)
router.use(categoriesRouter)
router.use(customerRouter)
export default router
