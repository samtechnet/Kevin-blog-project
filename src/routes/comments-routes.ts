import express, { Router } from "express";
import { ensureAuthenticated, ensureAuthorized } from "../middleware/auth-middleware";
import { addOne, removeOne, } from "../controllers/comments-controller";

const routes = express.Router();


routes.post("/comments", ensureAuthenticated, async (req, res) => {
    await addOne(req, res);
});

routes.delete("/categories/:id", ensureAuthenticated, async (req, res) => {
    await removeOne(req, res);
})



export default routes;