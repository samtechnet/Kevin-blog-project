import express, { Router } from "express";
import { ensureAuthenticated } from "../middleware/auth-middleware";
import { login,
    register,
    verify,
    forgotPassword,
    resetPassword,
    changePassword,} from "../controllers/auth-controller";
const routes = express.Router();

routes.post("/login",async (req, res) => {
    await login(req.body, res);
});

routes.post("/register",async (req, res) => {
    await register(req.body, "user", res);
});

routes.post("/verify",async (req, res) => {
    await verify(req.body, res);
});

routes.post("/forgotPassword",async (req, res) => {
    await forgotPassword(req.body, res);
});

routes.post("/resetPassword",async (req, res) => {
    await resetPassword(req.body, res);
});

routes.post("/changePassword", ensureAuthenticated, async (req, res) => {
    await changePassword(req.body, res);
});

export default routes; 