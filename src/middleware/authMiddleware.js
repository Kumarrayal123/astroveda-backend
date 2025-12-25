import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    console.log("verifyToken: No token provided");
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const verified = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET || "default_secret"
    );
    console.log("verifyToken: Token verified, payload:", verified);
    req.user = verified;
    next();
  } catch (err) {
    console.log("verifyToken: Invalid token", err.message);
    res.status(400).json({ message: "Invalid Token" });
  }
};

export const isAdmin = (req, res, next) => {
  console.log("isAdmin: Checking role for user:", req.user);
  if (req.user.role !== "admin") {
    console.log("isAdmin: Access denied. Role is:", req.user.role);
    return res.status(403).json({ message: "Access Denied: Admins Only" });
  }
  next();
};
