import User from "../models/user";
import paginate from "express-paginate";
import express, { Request, Response } from "express";

const getAll = async (req: Request, res: Response) => {
  //let itemCount: Number;
  
  let limit: number = 10
  if (req.params.limit){
    limit = parseFloat(req.params.limit);
  }
  let skip: unknown
  if (req.params.skip) {
    skip = (req.params.limit)
  }
  
  //const skip:String = (req.params.skip)
  try {
    const [results, itemCount] = await Promise.all([
      User.find({})
        .sort({ createdAt: -1 })
        .limit(limit)

        .skip(skip as number)
        .lean()
        .exec(),
      User.count({}),
    ]);
    const pageCount = Math.ceil(itemCount / limit);
    return res.status(201).json({
      object: "List",
      has_more: paginate.hasNextPages(req)(pageCount),
      data: results,
      pageCount,
      itemCount,
      currentPage: req.query.page,
      pages: paginate.getArrayPages(req)(3, pageCount, req.params.page as unknown as number),
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
    const item = await User.findById(req.params.id);
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

export  {
  getAll,
  getOne,
};
