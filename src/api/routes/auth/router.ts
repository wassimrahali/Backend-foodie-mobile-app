import express from "express"
import { registerCustomer } from "./customer/controllers/register"
import { loginCustomer } from "./customer/controllers/login"
import { loginadmin } from "./admin/controllers/login"
import { registerDileveryMan } from "./DileveryMan/controllers/register"
import { loginDileveryMan } from "./DileveryMan/controllers/login"
import { getAllcustomers } from "./customer/controllers/all-customer"
import { getOneCustomer } from "./customer/controllers/one-customer"
import { getAllDileveryMans } from "./DileveryMan/controllers/all-DileveryMans"
import { getOneDileveryMan } from "./DileveryMan/controllers/one-DileveryMan"
import { updateCustomer } from "./customer/controllers/update-cutomer"
import { deleteCustomer } from "./customer/controllers/delete-customer"
import { updateDeliveryMan } from "./DileveryMan/controllers/update-DileveryMan"
import { deleteDeliveryMan } from "./DileveryMan/controllers/delete-DileveryMan"
import { sendEmail } from "./customer/controllers/forgotPassword"
import { resetPassword } from "./customer/controllers/resetPassword"
import { changePassword} from "./customer/controllers/update-password"
import { signOut } from "./customer/controllers/LogoutCustomer"
import { signOutDileveryMan } from "./DileveryMan/controllers/signOutDileveryMan"
import { getOrdersCount, getOrdersSummary } from './DileveryMan/controllers/statics-DeliveryMan';
const UsersRouter = express.Router()

UsersRouter.post("/auth/register", registerCustomer)
UsersRouter.post("/auth/registerDileveryMan", registerDileveryMan)
UsersRouter.post("/auth/login",loginCustomer)
UsersRouter.post("/auth/loginAdmin",loginadmin)
UsersRouter.post("/auth/loginDileveryMan",loginDileveryMan)
UsersRouter.get("/auth/customers",getAllcustomers)
UsersRouter.get("/auth/customer/:id",getOneCustomer)
UsersRouter.put("/auth/customer/:id",updateCustomer)
UsersRouter.post("/auth/signout",signOut)

UsersRouter.delete("/auth/customer/:id",deleteCustomer)
UsersRouter.get("/auth/DileveryMan",getAllDileveryMans)
UsersRouter.get("/auth/DileveryMan/:id",getOneDileveryMan)
UsersRouter.put("/auth/DileveryMan/:id",updateDeliveryMan)
UsersRouter.delete("/auth/DileveryMan/:id",deleteDeliveryMan)
UsersRouter.post("/auth/signout-DileveryMan",signOutDileveryMan)


UsersRouter.post("/auth/sendVerificationCode",sendEmail)
UsersRouter.post("/auth/resetPassword",resetPassword)
UsersRouter.post("/auth/updatePasswordByEmail",changePassword)

UsersRouter.get('/orders-count/:id', getOrdersCount);
UsersRouter.get('/orders-summary/:id', getOrdersSummary);
export default UsersRouter