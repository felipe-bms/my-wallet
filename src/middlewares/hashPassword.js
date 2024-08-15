import bcrypt from "bcrypt";

export async function hashPassword(req, res, next) {
  try {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    next();
  } catch (error) {
    return res.status(500).json({ message: "Error hashing password" });
  }
}
