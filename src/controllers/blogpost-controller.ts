import Blogpost from "../models/blogpost";
import paginate from "express-paginate";
import { Request, Response } from "express";
import Comment from "../models/comment";

const addOne = async (req: Request, res: Response) => {
  const newRecord = new Blogpost({
    ...req.body,
    createdBy: req.user.id,
  }); 
  try {
    
    if(!newRecord.slug) {
      newRecord.slug = generateSlug(newRecord.title);
  }
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
    const deleted = await Blogpost.findByIdAndDelete(req.params.id);
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
    await Blogpost.findByIdAndUpdate(req.params.id, req.body);
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
  let limit: number = 10
  if (req.params.limit){
    limit = parseFloat(req.params.limit);
  }
  try {
    const [results, itemCount] = await Promise.all([
      Blogpost.find({})
        .populate("category", "title")
        .sort({ createdAt: -1 })
        .limit(req.query.limit as unknown as number)
        .skip(req.skip as number)
        .lean()
        .exec(),
      Blogpost.count({}),
    ]);
    const pageCount= Math.ceil(itemCount / limit);
    return res.status(201).json({
      object: "List",
      has_more: paginate.hasNextPages(req)(pageCount),
      data: results,
      pageCount,
      itemCount,
      currentPage: req.query.page,
      pages: paginate.getArrayPages(req)(3, pageCount, req.query.page as unknown as number),
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
    let item = await Blogpost.findByIdAndUpdate(req.params.id, {
      $inc: { viewsCount: 1 },
    }).populate("category", "title");
    if (item) {
      item.comments = await Comment.find({ blogPost: item._id });
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

const getOneBySlug = async (req: Request, res: Response) => {
  try {
    let item = await Blogpost.findByIdAndUpdate(req.params.slug, {
      $inc: { viewsCount: 1 },
    }).populate("category", "title");
    if (item) {
      item.comments = await Comment.find({ blogPost: item._id });
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

const getTopStories = async (req: Request, res: Response) => {
  //let itemCount: Number;
  try {
    let result = await Blogpost.find({})
      .populate("category", "title")
      .sort({ viewsCount: -1 })
      .limit(3)
      .lean()
      .exec();

    return res.status(201).json({
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const generateSlug = (title: { toString: () => string; }) => {
  const slugText = title.toString()
  .trim()
  .toLowerCase()
  .replace(/\s+/g, "-")
  .replace(/[^\w\-]+/g, "")
  .replace(/\-\-+/g, "-")
  .replace(/^-+/, "")
  .replace(/-+$/, "");

  return slugText;
}

export {
  addOne,
  removeOne,
  updateOne,
  getAll,
  getOne,
  getTopStories,
  getOneBySlug,
};
