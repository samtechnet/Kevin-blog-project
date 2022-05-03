import express, { Router } from "express";
import { ensureAuthenticated, ensureAuthorized } from "../middleware/auth-middleware";
import { getAll, getOne } from "../controllers/admin-controller";
import { register } from "../controllers/auth-controller";
const routes = express.Router();

routes.get("/users", ensureAuthenticated, ensureAuthorized(["admin"]),
    async (req, res) => {
        await getAll(req, res);
});

routes.get("/users/:id", ensureAuthenticated, ensureAuthorized(["admin"]), async (req, res) => {
    await getOne(req, res);
});

routes.get("/seed", async (req, res) => {
    const admin = {
        name: "Administrator",
        email: "samuel@samtechnet.com.ng",
        passworde: "password1234#"
    };
    await register(admin, "admin", res);
});

export default routes;