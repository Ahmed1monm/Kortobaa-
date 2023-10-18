import express, {Router} from "express";

import {login, register} from "../controllers/auth.controller";

const router: Router = express.Router();

router.route("/register").get(register)
router.route("/login").get(login)

export default router;