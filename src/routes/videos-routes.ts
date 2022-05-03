import express, { Router } from "express";
import { ensureAuthenticated, ensureAuthorized } from "../middleware/auth-middleware";
import {addOne,removeOne,updateOne,getAll,getOne,getTopVideos, } from "../controllers/videos-controller";

const routes = express.Router();

routes.get("/videos", async (req, res) => {
        await getAll(req, res);
});

routes.get("/videos/top", async (req, res) => {
    await getTopVideos(req, res);
});
routes.post("/videos", ensureAuthenticated, ensureAuthorized(["admin"]), async (req, res) => {
    await addOne(req, res);
});

routes.put("/videos/:id", ensureAuthenticated, ensureAuthorized(["admin"]), async (req, res) => {
    await updateOne(req, res);
});


routes.delete("/videos/:id", ensureAuthenticated, ensureAuthorized(["admin"]), async (req, res) => {
    await removeOne(req, res);
})

routes.get("/vidoes/:id", ensureAuthenticated,async (req, res) => {
    await getOne(req, res);
})


export default routes;