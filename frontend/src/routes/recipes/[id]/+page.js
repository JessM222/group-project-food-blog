import { PUBLIC_API_BASE_URL } from "$env/static/public";

export async function load({ params, fetch }) {
    const { id } = params;

    const response = await fetch(`${PUBLIC_API_BASE_URL}/articles/${id}`);
    if (!response.ok) {
        throw new Error(`Article with ID ${id} not found`);
    }

    const article = await response.json();
    console.log("article article_id " + article.article_id);
    console.log("article title " + article.title);
    console.log("article username " + article.username);
    console.log("article total_views " + article.total_views);
    console.log("article category_id " + article.category_id);
    console.log("article images " + article.images);

    article.images = [];
    return {
        article
    };
}
