import { Post } from "../model/PostModel.js";

export const createPost = async (req, res) => {
  try {
    const item = new Post(req.body);
    const savedPost = await item.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
