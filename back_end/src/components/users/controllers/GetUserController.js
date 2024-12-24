import { User } from "../model/UserModel.js";

export const getUsersController = async (req, res) => {
  try {
    // Pagination parameters
    let limit = Math.max(Number(req.query.limit) || 10, 1);
    let page = Math.max(Number(req.query.page) || 1, 1);

    // Sorting
    let sort = req.query.sort || "asc";
    sort = { firstName: sort === "asc" ? 1 : -1 };

    // Offset calculation
    let offset = (page - 1) * limit;

    // Fetch total record count
    let totalRecords = await User.countDocuments();

    // Query records
    let items = await User.find().sort(sort).skip(offset).limit(limit);

    // Calculate total pages
    let totalPages = Math.ceil(totalRecords / limit);

    return res.status(200).json({
      status: 200,
      message: "User Items",
      items,
      pagination: {
        currentPage: page,
        totalPages,
        totalRecords,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `Error: ${error.message}`,
    });
  }
};

export const getUserController = async (req, res) => {
  try {
    let userId = req.query.user_id;
    let currentUser = req.user;
    if (userId !== currentUser.id && !currentUser.role.includes("admin")) {
      return res.status(403).json({
        status: 403,
        message: "You are not authorized to view this user",
      });
    }

    let items = await User.findById(userId);

    return res.status(200).json({
      status: 200,
      message: "",
      items,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `Error: ${error}`,
    });
  }
};
