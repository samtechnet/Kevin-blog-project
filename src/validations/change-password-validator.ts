import { check, validationResult } from "express-validator";
import express, { NextFunction, Request, Response } from "express";

const validationRules = () => {
    return [
        check("newPassword")
            .trim()
            .notEmpty().withMessage('Password can not be empty')
            .isLength({ min: 6, max: 16 })
            .withMessage
            ("Password must be between 6 and 16 characters")
            
    ]
};

const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next;
    };

    const resultErrors = [];
    errors.array().map((err) => resultErrors.push({ [err.param]: err.msg }));

    resultErrors.push({ message: "Action unsuccessful" });
    resultErrors.push({ success: false });

    const errorObject = Object.assign({}, ...resultErrors)
    return res.status(422).json(errorObject);
};


export {validationRules, validate}