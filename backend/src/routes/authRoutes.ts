import express from "express";
import { signinController } from "../controllers/auth/signinController";
import { signupController } from "../controllers/auth/signupController";

const router = express.Router();

router.post("/signin", signinController);
router.post("/signup", signupController);

export default router;
