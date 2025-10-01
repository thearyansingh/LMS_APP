import jwt from "jsonwebtoken";

const genToken = (userId) => {
  try {
    const token = jwt.sign(
      { userId },
      process.env.JWT_SECRET || "defaultSecret", // fallback if not set
      { expiresIn: "7d" }
    );

    return token;
  } catch (error) {
    console.error("JWT generation error:", error);
    return null;
  }
};

export default genToken;
