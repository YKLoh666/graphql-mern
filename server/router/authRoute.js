import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { genToken } from "../utils/utilities.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const token = req.cookies.token;

  if (token) {
    const content = jwt.verify(token, process.env.JWT_SECRET_KEY, {
      complete: true,
    });
    const user = await User.findOne({ _id: content.payload.id });
    if (user) {
      return res.json({ verified: true });
    }
    return res.json({ verified: false });
  } else {
    return res.json({ verified: false });
  }
});

router.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.json({ failed: true });
  }
  const user = await User.findOne({ email: req.body.email });

  try {
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const token = genToken(user.id);
      res.cookie("token", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
      });
      return res.json({ email: user.email });
    } else {
      return res.json({ failed: true });
    }
  } catch (error) {
    return res.json({ failed: true });
  }
});

export default router;
