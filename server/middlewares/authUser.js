import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  let token = null;

  // Try to get token from cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // Try to get token from Authorization header
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

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
