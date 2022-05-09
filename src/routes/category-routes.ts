import express, { Router } from "express";
import { ensureAuthenticated, ensureAuthorized } from "../middleware/auth-middleware";
import { addOne,removeOne,updateOne,getAll,getOne, } from "../controllers/categories-controller";

const routes = express.Router();

routes.get("/categories", async (req, res) => {
        await getAll(req, res);
});

routes.post("/categories", ensureAuthenticated, ensureAuthorized(["admin"]), async (req, res) => {
    await addOne(req, res);
});

routes.put("/categories/:id", ensureAuthenticated, ensureAuthorized(["admin"]), async (req, res) => {
    await updateOne(req, res);
});

routes.get("/categories/:id", async (req, res) => {
    await getOne(req, res);
});

routes.delete("/categories/:id", ensureAuthenticated, ensureAuthorized(["admin"]), async (req, res) => {
    await removeOne(req, res);
})



export default routes;