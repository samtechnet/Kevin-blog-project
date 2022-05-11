import { check, validationResult } from "express-validator";
import express, { NextFunction, Request, Response } from "express";

const validationRules = (req: Request) => {
    return [
        check("title")
            .trim()
            .notEmpty().withMessage('Body can not be empty')
            .isLength({ min: 2, max: 256})
            .withMessage
            ("Comment  must be between 2 and 256 characters long"),
        check("videoId")
            .trim()
            .notEmpty().withMessage('Id can not be empty')
            .isLength({ min: 11, max: 11 })
            .withMessage
            ("YouTube video Id  must be 11 characters long")
            
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