import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    let { token } = req.headers;
    if (!token)
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });

    let tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Authorized Login Again",
      });
    }
    next();
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
};

export default adminAuth;
