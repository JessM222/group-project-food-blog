import express from "express";
import { 
    getAllCategories 
  } from "../../data/categories-dao.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const categories = await getAllCategories();
    return res.status(200).status(categories.length === 0 ? 204 : 200).json({ categories });
  } catch (error) {
    return res.sendStatus(422);
  }  
});

export default router;