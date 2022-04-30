import Category from "../models/category";
import paginate from "express-paginate";
import express, { Request, Response } from "express";

const addOne = async (req: Request, res: Response) => {
  try {
    const newRecord = new Category({
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
    const deleted = await Category.findByIdAndDelete(req.params.id);
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

const updateOne = async (req: Request, res: Response) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, req.body);
    return res.status(201).json({
      message: "Item successfully updated",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getAll = async (req: Request, res: Response) => {
  //let itemCount: Number;
  try {
    const [results, itemCount] = await Promise.all([
      Category.find({})
        .sort({ createdAt: -1 })
        .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      Category.count({}),
    ]);
    const pageCount = Math.ceil(itemCount / req.query.limit);
    return res.status(201).json({
      object: "List",
      has_more: paginate.hasNextPages(req)(pageCount),
      data: results,
      pageCount,
      itemCount,
      currentPage: req.query.page,
      pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getOne = async (req: Request, res: Response) => {
  try {
    const item = await Category.findById(req.params.id);
    if (item) {
      return res.status(200).json(item);
    }
    return res.status(404).json({
      message: "Item not found",
      success: false,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export default {
  addOne,
  removeOne,
  updateOne,
  getAll,
  getOne,
};
