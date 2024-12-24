import slug from "slug";

import { Tag } from "../model/TagModel.js";

export const deleteTagController = async (req, res) => {
    try {
        let tagId = req.query.tag_id;
        let items = await Tag.findOneAndDelete({
            _id: tagId,
        });

        if (!items) {
            return res.status(404).json({
                status: 404,
                message: "Tag not found",
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Deleted Successfully",
        })
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: `Error: ${error}`
        });
    }
}