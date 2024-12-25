import mongoose from "mongoose";
import slug from "slug";

import { Tag } from "../model/TagModel.js";

export const updateTagController = async (req, res) => {
  try {
    let { tagId } = req.query.tag_id;
    let { title } = req.body;
    let { id, role } = req.user;

    let tag = await Tag.findById(tagId);

    // check user id found and display message if not found
    if (!tag) {
      return res.status(404).json({
        status: 404,
        message: "Tag not found",
      });
    }

    if (id !== tag.author || role.includes("admin")) {
      return res.status(403).json({
        status: 403,
        message: "You are not authorized to delete this user",
      });
    }

    let slugs = slug(title);

    // check the user id and update the value
    await User.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(tagId),
      },
      {
        title,
        slugs,
      },
      { new: true }
    );

    // user profile updated
    return res.status(200).json({
      status: 200,
      message: "User updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `Error: ${error}`,
    });
  }
};
