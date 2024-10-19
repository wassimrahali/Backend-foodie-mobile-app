import express from "express"
import { getAllCategories } from "./controllers/all-categories"
import { getOneCategory } from "./controllers/one-category"
import { createCategory } from "./controllers/create-category"
import { deleteCategory } from "./controllers/delete-category"
import { updateCategory } from "./controllers/update-category"

const categoriesRouter = express.Router()

categoriesRouter.get("/categories", getAllCategories)
categoriesRouter.get("/categories/:id", getOneCategory)
categoriesRouter.post("/categories", createCategory)
categoriesRouter.delete("/categories/:id", deleteCategory)
categoriesRouter.put("/categories/update/:id", updateCategory)

export default categoriesRouter
