import express, {Router} from "express";

import {login, register} from "../controllers/auth.controller";
import {loginValidator, registerValidator} from "../validators/auth.validator";

const router: Router = express.Router();

router.route("/register").get(registerValidator, register)
router.route("/login").get(loginValidator, login)

export default router;