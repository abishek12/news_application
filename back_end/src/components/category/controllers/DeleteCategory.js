import { Category } from "../model/CategoryModel.js";

export const deleteCategoryController = async (req, res) => {
    try {
        let category_id = req.query.category_id;
        let items = await Category.findOneAndDelete({
            _id: category_id,
        });

        if (!items) {
            return res.status(404).json({
                status: 404,
                message: "Category not found",
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