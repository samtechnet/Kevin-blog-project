import passport from "passport";
import express, { NextFunction, Request, Response } from "express";


const ensureAuthenticated = passport.authenticate("jwt", { session: false });

const ensureAuthorized = (roles: string | any[]) => (req: express.Request, res: Response, next: NextFunction) => {
    if (roles.includes(req.user.roles)) {
        return next();
    }
    return res.status(401).json({
        message: "Unauthorized",
        success: false,
    })
};

export  {
     ensureAuthenticated, ensureAuthorized
 }