import { Tag } from "../model/TagModel.js";

export const getTagController = async (req, res) => {
  try {
    let items = await Tag.find().populate("author", "firstName lastName");

    return res.status(200).json({
      status: 200,
      message: "Items successfully",
      items,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `Error: ${error}`,
    });
  }
};
