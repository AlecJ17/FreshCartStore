import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized: Token missing",
    });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode && tokenDecode.id) {
      req.userId = tokenDecode.id;
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Not Authorized: Invalid token",
      });
    }
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Not Authorized: " + error.message });
  }
};

export default authUser;
