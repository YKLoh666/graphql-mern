import jwt from "jsonwebtoken";

export const genToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: 6 * 60 * 60,
  });

  return token;
};
