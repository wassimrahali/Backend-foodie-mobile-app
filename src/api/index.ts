import express from "express"
import productsRouter from "./routes/products/router"
import categoriesRouter from "./routes/categories/router"
import UsersRouter from "./routes/auth/router"
import orderRouter from "./routes/orders/router"
const router = express.Router()

router.use(productsRouter)
router.use(categoriesRouter)
router.use(UsersRouter)
router.use(orderRouter)
export default router
