import express from "express";
import apiAuth from "./api-auth.js";
import apiUsers from "./api-users.js";
import apiArticles from "./api-articles.js";
import commentsRoutes from "./api-comments.js";
import interactionRoutes from "./api-interactions.js";
import categoriesRoutes from "./api-categories.js";

const router = express.Router();

router.use("/auth", apiAuth);
router.use("/users", apiUsers);
router.use("/articles", apiArticles);
router.use("/comments", commentsRoutes);
router.use("/interactions", interactionRoutes);
router.use("/categories", categoriesRoutes);

export default router;
