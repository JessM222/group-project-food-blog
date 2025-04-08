import { getDatabase } from "./database.js";

export async function getAllCategories() {
  const db = await getDatabase();
  const categories = await db.all("SELECT * FROM Category");
  return categories;
}