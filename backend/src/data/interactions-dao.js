/**
 * This file contains a dummy DAO for the "Messages" database. You should
 * create your own DAOs for your project, and get rid of this one.
 */

import { getDatabase } from "./database.js";

export async function getInteractionsByArticle(article_id) {
  const db = await getDatabase();
  const interactions = await db.all("SELECT * FROM Interaction WHERE article_id = ? GROUP BY Interaction.article_id, Interaction.type", article_id);
  return interactions;
}

export async function getInteractionsByUser(username) {
  const db = await getDatabase();
  const interactions = 
  await db.all(
    "SELECT Interaction.id, Interaction.type,\
      Interaction.creation_time,\
      Interaction.article_id,\
      Interaction.username,\
      Article.title,\
      Article.category_id \
    FROM Interaction LEFT JOIN Article ON Interaction.article_id = Article.id \
    WHERE Interaction.username = ? \
    GROUP BY Interaction.article_id, Interaction.type", username);
  return interactions;
}

export async function addInteraction(article_id, type, username) {  
  const db = await getDatabase();
  const existingInteraction = await db.get( "SELECT * FROM Interaction WHERE article_id = ? AND type = ? AND username = ?",
    article_id, type, username
  );

  if(existingInteraction){
    await deleteInteraction(existingInteraction.id);
  } else {
    await db.run("INSERT INTO Interaction (article_id, type, username) VALUES (?, ?, ?)", article_id, type, username);
  }

  const countResult = await db.get( "SELECT COUNT(*) as count FROM Interaction WHERE article_id = ? AND type = ?", article_id, type
  );

  return { count: countResult.count, toggled: !existingInteraction };
}

export async function deleteInteraction(interaction_id) {
  const db = await getDatabase();
  const response = await db.run("DELETE FROM Interaction WHERE id = ?" , interaction_id); 
}