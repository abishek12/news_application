import { Post } from "../model/PostModel.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("tags author");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    let slugs = req.params.slugs;
    const post = await Post.findOne({ slugs }).populate(
      "category tags author",
      "name"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
