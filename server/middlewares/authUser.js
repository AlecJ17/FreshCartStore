import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const token = req.cookies?.token; // Use optional chaining for safety

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized - No token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized - Invalid token structure",
      });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized - " + error.message,
    });
  }
};

export default authUser;
