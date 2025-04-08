import { getDatabase } from "./database.js";

export async function createArticle(articleData, imageFiles = []) {
  const db = await getDatabase();
  const result = await db.run(
    `INSERT INTO Article (title, content, username, category_id) VALUES (?, ?, ?, ?)`,
    [articleData.title, articleData.content, articleData.username, articleData.category_id]
  );
  const articleId = result.lastID;

  if (imageFiles.length > 0) {
    const imageUploadPromises = imageFiles.map(file => {
      const normalizedPath = `${file.path.replace(/\\/g, '/')}`;
      return addImageToArticle({ url: normalizedPath, articleId: articleId });
    });
    await Promise.all(imageUploadPromises);
  }
}

export async function getAllArticles() {
const db = await getDatabase();
return await db.all(`SELECT Article.*, GROUP_CONCAT(Image.URL, '||') AS images FROM Article LEFT JOIN Image ON Article.id = Image.article_id GROUP BY Article.id;`);
} 

export async function getUserArticles(username) { // get articles for a specific user
  const db = await getDatabase();
  //return await db.all(`SELECT * FROM Article WHERE username = ?`, [username]); 
  return await db.all(`SELECT Article.*, GROUP_CONCAT(Image.URL, '||') AS images FROM Article LEFT JOIN Image ON Article.id = Image.article_id WHERE username = ? GROUP BY Article.id`, [username]);
}

export async function updateArticle(id, updates) {
  const db = await getDatabase();

  await db.run(
    `UPDATE Article SET title = ?, content = ?, category_id = ? WHERE id = ?`,
    [updates.title, updates.content, updates.category_id || null, id]
  );

  if (updates.images && updates.images.length > 0) {
    await db.run(`DELETE FROM Image WHERE article_id = ?`, [id]);

    const imageUploadPromises = updates.images.map(file => {
      const normalizedPath = `${file.path.replace(/\\/g, '/')}`;
      return addImageToArticle({ url: normalizedPath, articleId: id });
    });
    await Promise.all(imageUploadPromises);
  }
}

export async function getArticleById(id) {
  const db = await getDatabase();
  return await db.get(`
    SELECT Article.id AS article_id, Article.title, Article.content, Article.username, Article.total_views, Article.category_id, GROUP_CONCAT(Image.URL, '||') AS images 
    FROM Article 
    LEFT JOIN Image ON Article.id = Image.article_id 
    WHERE Article.id = ? 
    GROUP BY Article.id`, [id]);
}

export async function deleteArticle(id) {
  const db = await getDatabase();
  await db.run(`DELETE FROM Article WHERE id = ?`, [id]);
}

export async function increaseTotalViews(id) {
  const db = await getDatabase();
  await db.run(`UPDATE Article SET total_views = total_views + 1 WHERE id = ?`, [id]);
}

export async function getArticlesByKeyWord(keyWord) {
  const db = await getDatabase();
  const searchKeyword = `%${keyWord}%`;
  //return await db.all(`SELECT * FROM Article WHERE content LIKE ? OR title LIKE ?`, [searchKeyword, searchKeyword]); 
  return await db.all(`SELECT Article.*, GROUP_CONCAT(Image.URL, '||') AS images FROM Article LEFT JOIN Image ON Article.id = Image.article_id WHERE content LIKE ? OR title LIKE ? GROUP BY Article.id`, [searchKeyword, searchKeyword]); 
}

export async function getArticlesByCategory(categoryId) {
  const db = await getDatabase();  
  //return await db.all(`SELECT * FROM Article WHERE category_id = ?`, [categoryId]); 
  return await db.all(`SELECT Article.*, GROUP_CONCAT(Image.URL, '||') AS images FROM Article LEFT JOIN Image ON Article.id = Image.article_id WHERE category_id = ? GROUP BY Article.id`, [categoryId]); 
}

export async function addImageToArticle(data) {
  const db = await getDatabase();

  return await db.all(`INSERT INTO IMAGE (URL, article_id) VALUES (?, ?)`, [data.url, data.articleId]); 
}

export async function getImagesFromArticle(data) {
  const db = await getDatabase();
  return await db.all(`SELECT * FROM IMAGE WHERE article_id = ?`, [data.article_id]); 
}
