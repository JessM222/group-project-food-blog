import express from "express";
import bcrypt from "bcrypt";
import { createUser, getUserWithUsername } from "../../data/users-dao.js";
import { createUserJWT } from "../../utils/jwt-utils.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    await createUser(req.body);
    res.status(201).json({ message: `Account created successfully for username: ${req.body.username}` }); // return created username
  } catch (error) {
    res.status(400).json({ error: error.errors }); // return validation errors
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await getUserWithUsername(username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: `Invalid credentials. Cannot proceed further` });
  }

  const jwtToken = createUserJWT(user.username);
  res.cookie("authToken", jwtToken, { httpOnly: true, expires: new Date(Date.now() + 86400000) });
  res.status(200).json({ message: `Login successful for ${user.username}` });
});

router.delete("/logout", (req, res) => {
  res.cookie("authToken", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: `Logout successful` });
});

export default router;

