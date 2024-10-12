import express from "express"
import { getAllProducts } from "./controllers/all-products"
import { getOneProduct } from "./controllers/one-product"
import { createProduct } from "./controllers/create-product"
const productsRouter = express.Router()

productsRouter.get("/products", getAllProducts)

productsRouter.get("/product/:id", getOneProduct)

productsRouter.post("/products/", createProduct)

export default productsRouter
