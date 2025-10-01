import { Router } from "express";
import { Login, Register } from "../Controller/userController.js";
const UserRouter=Router();

UserRouter.post("/Register",Register)
UserRouter.post("/Login",Login)


export default UserRouter


