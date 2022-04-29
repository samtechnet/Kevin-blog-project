import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import User from "../models/user";
import express, { Request, Response } from "express";
import crypto from "node:crypto";

const saltRounds = Number(process.env.SALT_ROUNDS);
const pepper = String(process.env.BCRYPT_PASSWORD);
const jwsToken = String(process.env.JWT_SECRET);

const register = async (data: any , role: any , res: Response) => {
    try {
        const userTaken = await validateEmail(data.email);
        if (userTaken) {
            return res.status(400).json({
                email: "Email is already taken",
                message: "Registration failure",
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(data.password + pepper, saltRounds);
        const code = crypto.randomInt(100000, 1000000);
        const newUser = new User({
            ...data,
            password: hashedPassword,
            verificationCode: code,
            role
        });
        await newUser.save();
        return res.status(201).json({
            message: "Account successfully created",
            sucess: true,
        })
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            success: false,
        })
    }
};

const login = async (data: any, res: Response) => {
    try {
        let { email, password } = data;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({
                message: "Email login attempt",
                email: "Incorrect email",
                success: false,
            })
        }
        let isMatch = await bcrypt.compare(password, user.passord);
        if (isMatch) {
            let token = Jwt.sign({
                user_id: user._id,
                role: user.role,
                email: user.email,
                name: user.name,
            },
            jwsToken,
                {
                    expiresIn: "7 days",
                });
            let profile = {
                email: user.email,
                role: user.role,
                name: user.name,
            };
            let result = {
                user: profile,
                token: token,
                expiresIn: 168,
            };
            return res.status(200).json({
                ...result,
                message: "Login success",
                success: true
            });
        } else {
            return res.status(403).json({
                message: "Failed login attempt",
                email: "Incorrect password",
                success: false,
            })
        }
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            success: false,
        })
    }
    
};

const verify =async (data:any, res: Response) => {
    try {
        let { code } = data;
        const user = await User.findOne({ verificationCode: code });
        if (!user) {
            return res.status(404).json({
                message: "Invalid code",
                success: false
            });
        } else if (user.isEmailVerified) {
            return res.status(404).json({
                message: "Email already verified",
                success: false
            });
        }
        await user.update({ isEmailVerified: true });
        return res.status(201).json({
            message: "Email verification success",
            success: true
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};

const forgotPassword =async (data:any, res: Response) => {
    try {
        let { email } = data;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                message: "Invalid email",
                success: false
            });
        }
        const code = crypto.randomInt(100000, 1000000);
        const passwordResetCode = await bcrypt.hash(code.toString(), saltRounds);
        await user.update({ passwordResetCode: passwordResetCode });
        return res.status(404).json({
            message: "Verification code sent to your email",
            success: true,
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            success: false,
        })
    }
};

const resetPassword =async (data:any, res: Response) => {
    try {
        let { email, code, newPassword } = data;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                message: "Invalid email",
                success: false
            });
        }
        let isMatch = await bcrypt.compare(code.toString(), user.resetPassword);
        if (isMatch) {
            const hashedPassword = await bcrypt.hash(newPassword + pepper, saltRounds);
            await user.update({ password: hashedPassword }, { passwordResetCode: "" });
            return res.status(201).json({
                message: "your password  has been successfully reset",
                success: true
            });
        } else {
            return res.status(404).json({
                message: "Invalid code",
                success: false
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            success: false,
        })
    }
};

const changePassword =async (data:any, req: Request, res: Response) => {
    try {
        let { oldPassword, newPassword } = data;
        const user = await User.findById(req.user._id);
        let isMatch = await bcrypt.compare(oldPassword, user.password);
        if (isMatch) {
            const hashedPassword = await bcrypt.hash(newPassword + pepper, saltRounds);
            await user.update({ password: hashedPassword });
            return res.status(201).json({
                message: "Your password has been successfully reset",
                success: true
            });
        }else {
            return res.status(404).json({
                message: "Your old password is incorrect",
                success: false
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            success: false,
        })
    }
};

const validateEmail = async (email: String) => {
    let user = await User.findOne({ email });
    if (user) {
        return true;
    } else {
        return false
    }
};

export default {
    login,
    register,
    verify,
    forgotPassword,
    resetPassword,
    changePassword
};