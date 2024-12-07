import { Router } from "express";
import * as userServices from "./user.services.js";


const router = Router();

router.post("/signup", userServices.signUp);

router.put("/:id?", userServices.createOrUpdateUser);

router.get("/by-email?", userServices.getUserByEmail);

router.get("/:id", userServices.getUserById);

export default router;