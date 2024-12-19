// library functions
import Joi from "joi";
import slug from "slug";

// user-components
import { Category } from "../model/CategoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    // validation from server-side
    let schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().allow(''),
    });

    let { error } = schema.validate(req.body);

    if (error)
      return res.status(400).json({
        status: 400,
        message: error.details[0].message,
      });

    // any error does not occur than; process for adding category
    let { title, description } = req.body;
    let slugs = slug(title);

    let value = await Category.create({
      title,
      slugs,
      description: description ?? "",
    });

    // display success message
    return res.status(201).json({
      status: 201,
      message: "Item has been created",
      value,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `Error: ${error}`,
    });
  }
};
