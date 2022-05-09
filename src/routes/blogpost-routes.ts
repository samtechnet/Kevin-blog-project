import express, { Router } from "express";
import { ensureAuthenticated, ensureAuthorized } from "../middleware/auth-middleware";
import {addOne,removeOne,updateOne,getAll,getOne,getTopStories,getOneBySlug, } from "../controllers/blogpost-controller";

const routes = express.Router();

routes.get("/stories", async (req, res) => {
        await getAll(req, res);
});

routes.get("/stories/top", async (req, res) => {
    await getTopStories(req, res);
});
routes.post("/stories", ensureAuthenticated, ensureAuthorized(["admin"]), async (req, res) => {
    await addOne(req, res);
});

routes.put("/stories/:id", ensureAuthenticated, ensureAuthorized(["admin"]), async (req, res) => {
    await updateOne(req, res);
});

routes.get("/stories/slug/:slug", async (req, res) => {
    await getOneBySlug(req, res);
});

routes.delete("/stories/:id", ensureAuthenticated, ensureAuthorized(["admin"]), async (req, res) => {
    await removeOne(req, res);
})

routes.get("/stories/:id", ensureAuthenticated,async (req, res) => {
    await getOne(req, res);
})


export default routes;