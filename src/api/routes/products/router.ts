import express from "express"
import { getAllProducts } from "./controllers/all-products"
import { getOneProduct } from "./controllers/one-product"
import { createProduct } from "./controllers/create-product"
import { deleteProduct } from "./controllers/delete-product"
import { updateProduct } from "./controllers/update-product"
const productsRouter = express.Router()

productsRouter.get("/products", getAllProducts)
productsRouter.get("/products/:id", getOneProduct)
productsRouter.post("/products/", createProduct)
productsRouter.delete("/products/:id", deleteProduct)
productsRouter.put("/products/update/:id", updateProduct)

export default productsRouter
