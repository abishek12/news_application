import { Refer } from "../model/ReferModel.js";

export const fetchReferalCode = async (req, res) => {
  try {
    let items = await Refer.find().populate("user");

    return res.status(200).json({
      status: 200,
      message: "Item Success",
      items,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `Error: ${error}`,
    });
  }
};
