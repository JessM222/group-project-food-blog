import express from "express";
import { 
    getCommentsByArticle, 
    addComment, 
    getCommentsByUser, 
    editComment,
    deleteComment 
    } from "../../data/comments-dao.js";

const router = express.Router();

router.get("/:articleId", async (req, res) => {
    try {
        const comments = await getCommentsByArticle(req.params.articleId);
        return res.status(200).status(comments.length === 0 ? 204 : 200).json({ comments });
      } catch {
        return res.sendStatus(422);
      }
});

router.get("/user/:username", async (req, res) => {
    try {
        const comments = await getCommentsByUser(req.params.username);
        return res.status(comments.length === 0 ? 204 : 200).json({ comments });
      } catch {
        return res.sendStatus(422);
      }
});


router.post("/:articleId", async (req, res) => {
    const { articleId } = req.params;
    const { content, username } = req.body;

    try {
        const result = await addComment(articleId, content, username);
        return res.status(201).json({ message: "Comment added", comment: result });
    } catch (error) {
        console.error(error);
        return res.sendStatus(422);
    }
});

router.patch("/:commentId", async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    await editComment(commentId, content);
    return res.status(202).json({ message: `Updating comment with ID ${commentId} to: ${content}` });
});

router.delete("/:commentId", async (req, res) => {
    const { commentId } = req.params;

    await deleteComment(commentId);
    return res.status(200).json({ message: `Comment with ID ${commentId} has been deleted` });
});

export default router;