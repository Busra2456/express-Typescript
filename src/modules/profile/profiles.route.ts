import { Router } from "express";
import { profileController } from "./profile.controller";

const routes = Router()

routes.post('/',profileController.createProfile)

export const profileRouter = routes;