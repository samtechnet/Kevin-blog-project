import express, { Router, Request, Response } from "express";
import {
  ensureAuthenticated,
  ensureAuthorized,
} from "../middleware/auth-middleware";
import {
  addOne,
  removeOne,
  updateOne,
  getAll,
  getOne,
  getTopStories,
  getOneBySlug,
} from "../controllers/blogpost-controller";
import path from "path";
import { validationRules, validate } from "../validations/blogpost-validator";
import multer from "multer";

const routes = express.Router();
const PATH = "../public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, PATH));
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    req.body.imageUrl = fileName;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
});

routes.get("/stories", async (req, res) => {
  // #swagger.tags = ['Posts']
  await getAll(req, res);
});

routes.get("/stories/top", async (req, res) => {
  // #swagger.tags = ['Posts']
  await getTopStories(req, res);
});

routes.post("/stories", ensureAuthenticated, ensureAuthorized(["admin"]), 
  upload.any("files")
);

routes.post(
  "/stories",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  validationRules(),
  validate,
  async (req: Request, res: Response) => {
    /*  #swagger.tags = ['Posts']
        #swagger.consumes = ['multipart/form-data']
        #swagger.security = [{
        "Authorization": []
        }]
        #swagger.parameters['file'] = {
            in: 'formData',
            required: true,
            type: 'file'
        }
      
    	#swagger.parameters['category'] = {
            in: 'formData',
            required: true,
            type: 'string',
      } 
      #swagger.parameters['title'] = {
            in: 'formData',
            required: true,
            type: 'string',
      } 
      #swagger.parameters['body'] = {
            in: 'formData',
            required: true,
            type: 'string',
      } 
    
    */
    await addOne(req, res);
  }
);

routes.put(
  "/stories/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  validationRules(),
  validate,
  async (req: Request, res: Response) => {
    /*  #swagger.tags = ['Posts']
        #swagger.security = [{
        "Authorization": []
        }]
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/StoryModel" }
    } */
    await updateOne(req, res);
  }
);

routes.get("/stories/slug/:slug", async (req, res) => {
  // #swagger.tags = ['Posts']
  await getOneBySlug(req, res);
});

routes.delete(
  "/stories/:id",
  ensureAuthenticated,
  ensureAuthorized(["admin"]),
  async (req, res) => {
    /*  #swagger.tags = ['Posts']
        #swagger.security = [{
        "Authorization": []
        }]
    */
    await removeOne(req, res);
  }
);

routes.get("/stories/:id", ensureAuthenticated, async (req, res) => {
  // #swagger.tags = ['Posts']
  await getOne(req, res);
});

export default routes;
