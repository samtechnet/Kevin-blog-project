//import express, { Router } from "express";
import express, {Router, Request, Response } from "express";
import { ensureAuthenticated } from "../middleware/auth-middleware";
import { login,
    register,
    verify,
    forgotPassword,
    resetPassword,
    changePassword,} from "../controllers/auth-controller";
const routes = express.Router();
import { validationRules, validate } from "../validations/user-validator";
import { changePasswordValidationRules, changePasswordValidate } from "../validations/change-password-validator";


routes.post("/login",async (req, res) => {
      /*
            #swagger.tags = ['Auth]
            #swagger.parameters['obj'] = {
                in: 'body',
                required: true,
                scheme: {$ref: '#/definition/LoginModel'}
            }
        */
    await login(req.body, res);
});

routes.post("/register", validationRules(), validate, async (req: Request, res: Response) => {
     /*  #swagger.tags = ['Auth']
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/RegisterModel" }
    } */
    await register(req.body, "user", res);
});

routes.post("/verify",async (req, res) => {
     /*  #swagger.tags = ['Auth']
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/VerifyEmailModel" }
    } */
    await verify(req.body, res);
});

routes.post("/forgotPassword",async (req, res) => {
    /*  #swagger.tags = ['Auth']
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/ForgotPassWordModel" }
    } */
    await forgotPassword(req.body, res);
});

routes.post("/resetPassword",async (req, res) => {
    /*  #swagger.tags = ['Auth']
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/ResetPasswordModel" }
    } */
    await resetPassword(req.body, res);
});

routes.post("/changePassword", ensureAuthenticated, async (req, res) => {
    /*  #swagger.tags = ['Auth']
        #swagger.security = [{
        "Authorization": []
        }]
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/ChangePasswordModel" }
    } */  
    await changePassword(req.body, res);
});

export default routes; 