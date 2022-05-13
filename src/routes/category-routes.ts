import express, { Router, Request, Response } from "express";
import { ensureAuthenticated, ensureAuthorized } from "../middleware/auth-middleware";
import { addOne, removeOne, updateOne, getAll, getOne, } from "../controllers/categories-controller";
import { validationRules, validate } from "../validations/category-validator";

const routes = express.Router();

routes.get("/categories", async (req, res) => {
    // #swagger.tags = ['Posts']    
    await getAll(req, res);
});

routes.post("/categories", ensureAuthenticated, ensureAuthorized(["admin"]), validationRules(), validate, async (req:Request, res:Response) => {
      /*  #swagger.tags = ['Posts']
        #swagger.security = [{
        "Authorization": []
        }]
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/CategoryModel" }
    } */  
    await addOne(req, res);
});

routes.put("/categories/:id", ensureAuthenticated, ensureAuthorized(["admin"]),  validationRules(), validate,async (req:Request, res:Response) => {
    /*  #swagger.tags = ['Posts']
        #swagger.security = [{
        "Authorization": []
        }]
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/CategoryModel" }
    } */
    await updateOne(req, res);
});

routes.get("/categories/:id", async (req, res) => {
    // #swagger.tags = ['Posts'] 
    await getOne(req, res);
});

routes.delete("/categories/:id", ensureAuthenticated, ensureAuthorized(["admin"]), async (req, res) => {
    /*  #swagger.tags = ['Posts']
        #swagger.security = [{
        "Authorization": []
        }]
    */ 
    await removeOne(req, res);
})



export default routes;