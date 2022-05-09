import express, { Router } from "express";
import authRoutes from "./auth-routes";
import adminRoutes from "./admin-routes";
import categoriesRoutes from "./category-routes";
import commentsRoutes from "./comments-routes";
import profileRoutes from "./profile-routes";
import blogpostRoutes from "./blogpost-routes";
import videosRoutes from "./videos-routes";

const routes = express.Router();

routes.use("auth", authRoutes);
routes.use("api", adminRoutes);
routes.use("api", categoriesRoutes);
routes.use("api", commentsRoutes);
routes.use("api", profileRoutes);
routes.use("api", blogpostRoutes);
routes.use("api", videosRoutes);

export default routes;