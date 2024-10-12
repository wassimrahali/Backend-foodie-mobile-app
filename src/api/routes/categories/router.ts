import express from "express"
import { getAllCategories } from "./controllers/all-categories"
import { getOneCategory } from "./controllers/one-category"
import { createCategory } from "./controllers/create-category"
const categoriesRouter = express.Router()

categoriesRouter.get("/categories", getAllCategories)

categoriesRouter.get("/categories/:id", getOneCategory)

categoriesRouter.post("/categories/", createCategory)

export default categoriesRouter
