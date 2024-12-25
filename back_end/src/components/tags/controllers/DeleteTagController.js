import slug from "slug";

import { Tag } from "../model/TagModel.js";

export const deleteTagController = async (req, res) => {
  try {
    let tagId = req.query.tag_id;
    let { id, role } = req.user;

    const tag = await Tag.findById(tagId);

    if (!tag) {
      return res.status(404).json({
        status: 404,
        message: "Tag not found",
      });
    }

    if (id !== tag.author || !role.includes("admin")) {
      return res.status(403).json({
        status: 403,
        message: "You are not authorized to delete this tag",
      });
    }

    await Tag.findOneAndDelete({
      _id: tagId,
    });

    return res.status(200).json({
      status: 200,
      message: "Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `Error: ${error}`,
    });
  }
};
