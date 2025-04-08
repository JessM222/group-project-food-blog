<script>
  import SummaryRecipe from "../../lib/components/SummaryRecipe.svelte";
  import FullRecipe from "../../lib/components/FullRecipe.svelte";
  import { userDataStore } from "../../lib/store/userDataStore.js";
  import { goto } from "$app/navigation";

  import { PUBLIC_IMAGES_URL } from "$env/static/public";
  import { PUBLIC_API_BASE_URL } from "$env/static/public";

  //PUBLIC_IMAGES_URL=http://localhost:3000/images
  import MessageView from "$lib/components/MessageView.svelte";
  import { onMount } from "svelte";
  import MyRecipesAllRecipesRadioButton from "../../lib/components/MyRecipesAllRecipesRadioButton.svelte";

  export let data;
  export let { articles } = data; // Extract articles from the data object

  let categories = [];
  let selectedCategoryId = null;
  let articlesByUser = [];

  const myRecipesTextButton = "My Recipes";
  const allRecipesTextButton = "All Recipes";
  let textButton = myRecipesTextButton;

  let selectedArticle = null;
  let myRecipesAllRecipes = false;
  $: onlyOwnRecipes = myRecipesAllRecipes;

  let keyWord = "";

  async function performSearch() {
    let articlesByKeyword = [];
    if (keyWord === "") {
      articlesByKeyword = await fetch(`${PUBLIC_API_BASE_URL}/articles`);
    } else {
      articlesByKeyword = await fetch(`${PUBLIC_API_BASE_URL}/articles/searchByKeyWord/${keyWord}`);
    }
    articles = await articlesByKeyword.json();
  }

  function selectArticle(article) {
    selectedArticle = article;
    const articleId = article.id;
    goto(`/recipes/${articleId}`);
  }

  function getImagePath(image) {
    return image ? `http://localhost:3000/${image.replace(/\\/g, "/")}` : "";
    //return image ? PUBLIC_IMAGES_URL : "";
  }

  async function fetchCategories() {
    try {
      const response = await fetch(`${PUBLIC_API_BASE_URL}/categories`);
      const categoriesJSON = await response.json();
      categories = [
        { id: 99, description: " - All - " },
        ...categoriesJSON.categories.map((category) => ({
          id: category.id,
          description: category.description
        }))
      ];
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  async function getOwnRecipes() {
    onlyOwnRecipes = !onlyOwnRecipes;
    if (onlyOwnRecipes) {
      textButton = allRecipesTextButton;
      try {
        const response = await fetch(`${PUBLIC_API_BASE_URL}/articles/user`, {
          method: "GET",
          credentials: "include",
          username: $userDataStore.username
        });
        const articlesJSON = await response.json();
        articles = articlesJSON;
      } catch (error) {
        console.error("Failed to fetch articles by user:", error);
      }
      return;
    }
    textButton = myRecipesTextButton;
    try {
      const response = await fetch(`${PUBLIC_API_BASE_URL}/articles/`, {
        method: "GET",
        credentials: "include",
        username: $userDataStore.username
      });
      const articlesJSON = await response.json();
      articles = articlesJSON;
    } catch (error) {
      console.error("Failed to fetch articles by user:", error);
    }
  }

  async function handleCategoryChange(event) {
    selectedCategoryId = event.target.value === "null" ? null : parseInt(event.target.value, 10);
    if (selectedCategoryId === 99) {
      const response = await fetch(`${PUBLIC_API_BASE_URL}/articles`);
      articles = await response.json();
    } else {
      const articlesByCategory = await fetch(
        `${PUBLIC_API_BASE_URL}/articles/searchByCategory/${selectedCategoryId}`
      );
      articles = await articlesByCategory.json();
    }
  }

  onMount(fetchCategories);
</script>

<svelte:head>
  <title>Recipes</title>
</svelte:head>

<div class="search-container">
  <input
    bind:value={keyWord}
    type="text"
    placeholder="Find a recipe: dessert, salad, soup..."
    name="search"
  />
  <button on:click={performSearch} class="searchButton" type="submit">Search</button>
</div>

<div class="recipes_container {selectedArticle ? 'full-view' : 'grid-view'}">
  <div class="filter">
    <div id="categoryFilter">
      <h3>Recipe Categories</h3>
      {#if categories && categories.length > 0}
        <ul>
          {#each categories as { id, description } (id)}
            <li>
              <label>
                <input
                  type="radio"
                  name="category"
                  value={id}
                  bind:group={selectedCategoryId}
                  on:change={handleCategoryChange}
                />
                {description}
              </label>
            </li>
          {/each}
        </ul>
      {:else}
        <p>Loading categories...</p>
      {/if}
    </div>
  </div>
  <div>
    <div class="myRecipesAllRecipes">
      {#if $userDataStore.username !== ""}
        <MyRecipesAllRecipesRadioButton bind:group={myRecipesAllRecipes} onChange={getOwnRecipes} />
      {/if}
    </div>
    <div class="main_content">
      {#if selectedArticle}
        <div class="full_recipe">
          <!-- <FullRecipe fullArticle={selectedArticle} /> -->
        </div>
      {:else if articles.length > 0}
        {#each articles as articleItem (articleItem.id)}
          <div on:click={() => selectArticle(articleItem)} class="article-link">
            <SummaryRecipe article={articleItem} />
          </div>
        {/each}
      {:else}
        <p>No articles found.</p>
      {/if}
    </div>
  </div>
</div>

<style>
  .recipes_container {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 20px;
  }
  .filter {
    display: flex;
    flex-flow: column wrap;
    padding-left: 50px;
    min-width: 250px;
  }

  #userFilter {
    font-size: 20px;
    font-family: Arial, Helvetica, sans-serif;
    background-color: color(srgb rgb(13, 27, 107) green blue);
    color: white;
  }
  .recipes_container.grid-view .main_content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .recipes_container.full-view {
    grid-template-columns: 1fr 4fr;
  }
  .recipes_container.full-view .main_content {
    display: block;
    padding: 10px;
  }
  .full_recipe {
    max-width: 100%;
  }
  .article-link {
    cursor: pointer;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    border-radius: 8px;
    overflow: hidden;
  }
  .article-link:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background-color: rgba(255, 255, 255, 0.1);
  }
  .search-container {
    display: flex;
    justify-content: start;
    margin-top: 20px;
    margin-left: 30px;
  }
  .search-container input[type="text"] {
    width: 40%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #9aabc47d;
    outline: none;
    font-size: 16px;
    transition: width 0.3s ease;
  }
  .search-container button {
    margin-left: 10px;
    padding: 10px 15px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    background-color: #9aabc47d;
    color: rgb(30, 28, 28);
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .search-container button:hover {
    background-color: #d89a9a;
  }
  @media (max-width: 955px) {
    .recipes_container {
      grid-template-columns: 1fr; /* Single column layout */
      gap: 15px;
    }
    .main_content {
      grid-template-columns: repeat(2, 1fr); /* Adjust the number of columns */
    }
    .filter {
      padding-left: 20px;
      min-width: auto; /* Adjust width */
    }
  }
  @media (max-width: 480px) {
    .recipes_container {
      grid-template-columns: 1fr;
      gap: 10px;
    }
    .main_content {
      grid-template-columns: 1fr; /* Single column */
      gap: 10px;
    }
    .filter {
      padding-left: 10px;
    }
    #userFilter {
      font-size: 16px;
      padding: 8px;
    }
    .article-link {
      transform: none;
    }
  }

  .filter {
    margin-left: 20px;
    background-color: #ffffff;
    border-radius: 15px;
    padding: 25px;
    border: 2px solid #0d1b6b83;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    font-family: "Poppins", "Cursive", sans-serif; /* Adding cursive for a French touch */
  }

  #categoryFilter h3 {
    font-size: 40px;
    color: #0d1b6b;
    margin-bottom: 20px;
    text-transform: capitalize;
    letter-spacing: 1px;
    text-align: center;
    font-family: "Great Vibes", "Caveat", cursive;
    position: relative;
  }

  #categoryFilter h3::after {
    content: "";
    width: 80%;
    height: 3px;
    background-color: #0d1b6b;
    display: block;
    margin: 8px auto 0;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(13, 27, 107, 0.2);
  }

  #categoryFilter ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  #categoryFilter li {
    margin-bottom: 10px;
  }

  #categoryFilter label {
    display: flex;
    align-items: center;
    background-color: #f0f4ff;
    border-radius: 12px;
    padding: 12px 18px;
    cursor: pointer;
    font-size: 18px;
    transition: all 0.3s ease;
    box-shadow: 0 3px 10px rgba(13, 27, 107, 0.15);
    border: 1px solid #dbe3ff;
  }

  #categoryFilter label:hover {
    background-color: #dbe3ff;
    box-shadow: 0 4px 12px rgba(13, 27, 107, 0.2);
  }

  #categoryFilter input[type="radio"] {
    margin-right: 15px;
    accent-color: #0d1b6b;
  }

  @media (max-width: 768px) {
    .filter {
      padding: 20px;
    }

    #categoryFilter h3 {
      font-size: 26px;
    }

    #categoryFilter label {
      font-size: 16px;
      padding: 10px 15px;
    }
  }

  @media (max-width: 480px) {
    .filter {
      padding: 15px;
    }

    #categoryFilter h3 {
      font-size: 22px;
    }

    #categoryFilter label {
      font-size: 14px;
      padding: 8px 12px;
    }
  }

  .myRecipesAllRecipes {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }
</style>
