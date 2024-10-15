import express from "express"
import { registerCustomer } from "./customer/controllers/register"
import { loginCustomer } from "./customer/controllers/login"
import { loginadmin } from "./admin/controllers/login"
import { registerDileveryMan } from "./DileveryMan/controllers/register"
import { loginDileveryMan } from "./DileveryMan/controllers/login"
import { getAllcustomers } from "./customer/controllers/all-customer"
import { getOneCustomer } from "./customer/controllers/one-customer"


const customerRouter = express.Router()

customerRouter.post("/auth/register", registerCustomer)
customerRouter.post("/auth/registerDileveryMan", registerDileveryMan)
customerRouter.post("/auth/login",loginCustomer)
customerRouter.post("/auth/loginAdmin",loginadmin)
customerRouter.post("/auth/loginDileveryMan",loginDileveryMan)
customerRouter.get("/auth/customers",getAllcustomers)
customerRouter.get("/auth/customer/:id",getOneCustomer)
export default customerRouter