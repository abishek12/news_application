import { Post } from "../model/PostModel.js";
import slug from "slug";

export const createPost = async (req, res) => {
  try {
    let {
      title,
      category,
      tags,
      author,
      images,
      description,
      content,
      status,
      visibility,
    } = req.body;
    let slugs = slug(title);
    let item = Post({
      title,
      slugs,
      category,
      tags,
      author,
      images,
      description,
      content,
      status,
      visibility,
    });
    const savedPost = await item.save();
    return res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
