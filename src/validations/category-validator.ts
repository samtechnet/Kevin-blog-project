import { check, validationResult } from "express-validator";
import express, { NextFunction, Request, Response } from "express";

const validationRules = (req: Request) => {
    return [
        check("title")
        
            .trim()
            .not()
            .isLength({ min: 2, max: 56 })
            .withMessage
            ("Title must be between 2 and 56 characters")
            .isEmpty()
    ]
};

const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationRules(req);

    if (!errors.not().isEmpty()) {
        return next;
    };

    const resultErrors = [];
    errors.array().map((err) => resultErrors.push({ [err.params]: err.mss }));

    resultErrors.push({ message: "Action unsuccessful" });
    resultErrors.push({ success: false });

    const errorObject = Object.assign({}, ...resultErrors)
    return res.status(422).json(errorObject);
}


export {validationRules, validate}