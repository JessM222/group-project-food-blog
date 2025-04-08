/**
 * This file contains a dummy DAO for the "Messages" database. You should
 * create your own DAOs for your project, and get rid of this one.
 */

import { getDatabase } from "./database.js";

export async function getCommentsByArticle(article_id) {
  const db = await getDatabase();
  const comments = await db.all("SELECT * FROM Comment WHERE article_id = ?", article_id);
  return comments;
}

export async function getCommentsByUser(username) {
  const db = await getDatabase();
  const comments = await db.all("SELECT * FROM Comment WHERE username = ?", username);
  return comments;
}


export async function addComment(article_id, content, username) {
  const db = await getDatabase();
  const response = await db.run("INSERT INTO Comment (article_id, content, username) VALUES (?, ?, ?)", article_id, content, username);
  /*
  return {
    id: response.lastID,
    message: content
  }
*/
}

export async function editComment(comment_id, content) {
  const db = await getDatabase();
  const response = await db.run("UPDATE Comment SET content = ? WHERE id = ?", content, comment_id);
/*
  return {
    id: response.lastID,
    message: content
  }
*/
}

export async function deleteComment(comment_id) {
  const db = await getDatabase();
  const response = await db.run("DELETE FROM Comment WHERE id = ?" , comment_id); 
}