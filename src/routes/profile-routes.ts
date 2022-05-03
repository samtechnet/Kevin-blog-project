import express, { Router } from "express";
import { ensureAuthenticated, ensureAuthorized } from "../middleware/auth-middleware";
import { updateOne,getOne, } from "../controllers/profile-controller";

const routes = express.Router();



routes.put("/profile", ensureAuthenticated, async (req, res) => {
    await updateOne(req, res);
});

routes.get("/profile", ensureAuthenticated,async (req, res) => {
    await getOne(req, res);
});





export default routes;