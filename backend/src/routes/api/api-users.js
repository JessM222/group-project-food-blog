import express from "express";
import { updateUser, deleteUser, getUserWithUsername } from "../../data/users-dao.js";
import { requiresAuthentication } from "../../middleware/auth-middleware.js";

const router = express.Router();


router.get("/", requiresAuthentication, async (req, res) => { // get authenticated user's data
  const { username } = req.user;

  try {
    const user = await getUserWithUsername(username); // retrieve authenticated user's data
    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(404).json({ message: `User with username: ${username} not found.` });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Unable to fetch user data." });
  }
});


router.get("/:username", async (req, res) => { // check username endpoint
  const { username } = req.params;
  try {
    const user = await getUserWithUsername(username);
    if (user) {
      return res.status(200).json({ message: `Username:${username} is not available`, isUsernameAvailable: false }); // not available
    } else {
      return res.status(200).json({ message: `Username:${username} is available`, isUsernameAvailable: true }); // available
    }
  } catch (error) {
    console.error("Error checking username:", error);
    return res.status(500).json({ error: "Unable to check username" });
  }
});

router.patch("/", requiresAuthentication, async (req, res) => { // update user info endpoint
  const { username } = req.user;
  try {
    await updateUser(username, req.body); // update user with the request body data
    res.status(200).json({ message: `User account information updated successfully` });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ error: "Unable to update user" });
  }
});

router.delete("/", requiresAuthentication, async (req, res) => { // delete user account endpoint
  const { username } = req.user;
  try {
    await deleteUser(username); // Delete user
    res.status(200).json({ message: "User account deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Unable to delete user" });
  }
});

export default router;
