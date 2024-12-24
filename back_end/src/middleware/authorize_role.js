export const authorizeRole = (allowedRoles) => {
    return async (req, res, next) => {
      // Get user information from the request
      const user = req.user;
  
      if (!user || !user.role) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      // Check if user role is included in allowed roles
      if (allowedRoles.includes(user.role)) {
        next();
      } else {
        return res.status(403).json({ message: "Forbidden" });
      }
    };
  };