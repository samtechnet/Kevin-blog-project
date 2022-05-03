import Comment from "../models/comment";
import express, { Request, Response } from "express";

const addOne = async (req: Request, res: Response) => {
  try {
    const newRecord = new Comment({
      ...req.body,
      createdBy: req.user.id,
    });
    await newRecord.save();
    return res.status(201).json({
      message: "Item successfully created",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const removeOne = async (req: Request, res: Response) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        message: "Item not found",
        success: false,
      });
    }
    return res.status(204).json({
      message: "Item successfully deleted",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};






export {
  addOne,
  removeOne,
};
