import express from "express";
import { createArticle, getAllArticles, getUserArticles, updateArticle, deleteArticle, 
  getArticleById, increaseTotalViews, getArticlesByKeyWord, getArticlesByCategory, getImagesFromArticle} from "../../data/articles-dao.js";
import { uploadImages } from "../../middleware/image-storage-middleware.js";
import { requiresAuthentication } from "../../middleware/auth-middleware.js";

const router = express.Router();

router.post("/", requiresAuthentication, uploadImages, async (req, res) => { // create an article
  const articleData = {
      title: req.body.title, content: req.body.content, username: req.user.username, category_id: req.body.category_id,
  };
  try {
      await createArticle(articleData, req.files);
      res.status(201).json({ message: `Article: ${req.body.title} created successfully` });
  } catch (error) {
      console.error('Error creating article:', error);
      res.status(500).json({ error: 'Failed to create article' });
  }
});

router.get("/user", requiresAuthentication, async (req, res) => { // get articles by a user
  try {
    const { username } = req.user; 
    const articles = await getUserArticles(username); 
    
    const processedUserArticles = articles.map(article => ({
      ...article,
      images: splitImages(article.images), 
    }));
    
    res.json(processedUserArticles); 
  } catch (error) {
    console.error("Error fetching user articles:", error);
    res.status(500).json({ error: "An error occurred while retrieving articles." });
  }
});


router.get("/", async (req, res) => { // get all articles
  try {
    let allArticles = await getAllArticles(); // get all articles   
    
    allArticles = allArticles.map(article => ({
      ...article,
      images: splitImages(article.images) 
    }));
    return res.json(allArticles);
  } catch (error) {
    console.error("Error retrieving articles:", error);
    return res.status(500).json({ error: "Unable to retrieve articles" });
  }
});

router.get("/:id", async (req, res) => { 
  try {
    const article = await getArticleById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    return res.json(article);
  } catch (error) {
    console.error("Error retrieving article by ID:", error);
    return res.status(500).json({ error: "Unable to retrieve article" });
  }
});

router.patch("/:id", requiresAuthentication, uploadImages, async (req, res) => {
  const article = await getArticleById(req.params.id); 
  if (!article) return res.status(404).json({ error: "Article does not exist" });

  if (article.username !== req.user.username) {
    return res.status(403).json({ error: "You do not have permission to update this article." });
  }

  const updates = {
    title: req.body.title !== undefined ? req.body.title : article.title,
    content: req.body.content !== undefined ? req.body.content : article.content,
    category_id: req.body.category_id !== undefined ? req.body.category_id : article.category_id,
    images: req.files,
  };

  try {
    await updateArticle(req.params.id, updates);
    res.status(200).json({ message: `Article updated successfully` });
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ error: "Failed to update article" });
  }
});

router.delete("/:id", requiresAuthentication, async (req, res) => {
  const article = await getArticleById(req.params.id);
  if (!article) return res.status(404).json({ error: "Article does not exist" });

  if (article.username !== req.user.username) {
    return res.status(403).json({ error: "You do not have permission to delete this article." });
  }

  await deleteArticle(req.params.id);
  res.status(200).json({ message: `Article: ${article.title} deleted successfully` });
});

router.patch("/increaseViews/:id", async (req, res) => {
  await increaseTotalViews(req.params.id);
  res.sendStatus(200);
});

router.get("/searchByKeyWord/:keyWord", async (req, res) => {
  try {
    const keyWord = req.params.keyWord;
    const relatedArticles = await getArticlesByKeyWord(keyWord);
    const processedUserArticles = relatedArticles.map(article => ({
      ...article,
      images: splitImages(article.images)
    }));
    return res.json(processedUserArticles);
  } catch (error) {
    console.error("Error retrieving articles by keyword:", error);
    return res.status(500).json({ error: "Unable to retrieve articles by keyword." });
  }
});

router.get("/searchByCategory/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const relatedArticles = await getArticlesByCategory(categoryId);
    const processedUserArticles = relatedArticles.map(article => ({
      ...article,
      images: splitImages(article.images)
    }));
    return res.json(processedUserArticles);
  } catch (error) {
    console.error("Error retrieving articles by category:", error);
    return res.status(500).json({ error: "Unable to retrieve articles by category." });
  }
});

router.get("/getImages/:articleId", async (req, res) => {
  try {
    const articleId = req.params.articleId; 
    const relatedImages = await getImagesFromArticle({ article_id: articleId });
    return res.json(relatedImages);
  } catch (error) {
    console.error("Error retrieving images by article_id:", error);
    return res.status(500).json({ error: "Unable to retrieve images by article ID." });
  }
});

const splitImages = (imageString) => {
  return imageString ? imageString.split('||') : [];
};

export default router;
