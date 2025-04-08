<script>
  import { onMount } from "svelte";
  import { authStore } from "../store/authStore";
  import { userDataStore } from "../store/userDataStore";
  import QuillTextEditor from "$lib/components/QuillTextEditor.svelte";
  import "quill/dist/quill.snow.css";
  import { goto } from "$app/navigation";
  import { PUBLIC_API_BASE_URL } from "$env/static/public";

  export let userArticlesActivity = [];
  export let userInteractionsActivity = [];
  let showEditor = false;
  let quillEditor;
  let isLoggedIn = false;
  let username = "";

  // Reactive statements for store subscriptions
  $: isLoggedIn = $authStore;
  $: username = $userDataStore.username;

  // Fetch user interactions
  async function fetchUserInteractions() {
    if (!username) return;
    try {
      const response = await fetch(`http://localhost:3000/api/interactions/byuser`, {
        method: "GET",
        credentials: "include",
        username: $userDataStore.username
      });
      if (response.ok) {
        const data = await response.json();
        userInteractionsActivity = data.interactions.sort((a, b) => b.id - a.id).slice(0, 3);
        console.log("interactions " + userInteractionsActivity);
      }
    } catch (error) {
      console.error("Error fetching interactions:", error);
    }
  }

  async function fetchArticlesUser() {
    try {
      const response = await fetch(`${PUBLIC_API_BASE_URL}/articles/`, {
        method: "GET",
        credentials: "include",
        username: $userDataStore.username
      });
      let articlesJSON = await response.json();
      articlesJSON = articlesJSON.sort((a, b) => b.id - a.id).slice(0, 2);
      userArticlesActivity = articlesJSON;
    } catch (error) {
      console.error("Failed to fetch articles by user:", error);
    }
  }

  onMount(() => {
    if (isLoggedIn) {
      fetchUserInteractions();
      fetchArticlesUser();
    }
  });

  $: if (isLoggedIn && username) {
    fetchUserInteractions();
    fetchArticlesUser();
  } else {
    userArticlesActivity = [];
    userInteractionsActivity = [];
  }

  function createPost() {
    // newRecipe = { title: "", content: "", article_id: null };
    showEditor = true;
  }

  function closeEditor() {
    showEditor = false;
    fetchArticlesUser();
  }
</script>

<div class="usersActivity">
  <h2>Your activity</h2>

  {#if isLoggedIn}
    {#if userArticlesActivity.length > 0}
      {#each userArticlesActivity as article}
        <div class="activityItem">
          <a href="/recipes/{article.id}" class="recipeLink">
            <img
              src={article.imageURL || "/Default_image.jpg"}
              alt="User Activity"
              class="activityImage"
            />
          </a>
          <div class="activityContent">
            <a href="/recipes/{article.id}" class="recipeLink">
              <h3>{article.title}</h3>
            </a>
          </div>
        </div>
      {/each}
    {:else}
      <p>No recent articles to show. Make a new post!</p>
    {/if}

    {#if userInteractionsActivity.length > 0}
      {#each userInteractionsActivity as interaction}
        <div class="activityItem">
          <a href="/recipes/{interaction.article_id}" class="recipeLink">
            <img
              src={interaction.imageURL || "/Default_image.jpg"}
              alt="User Interaction"
              class="activityImage"
            />
          </a>
          <div class="activityContent">
            <a href="/recipes/{interaction.article_id}" class="recipeLink">
              <h3>{interaction.title}</h3>
              {#if interaction.type === "Like"}
                <h4>You Liked this recipe</h4>
              {:else}
                <h4>You Bookmarked this recipe</h4>
              {/if}
            </a>
          </div>
        </div>
      {/each}
    {:else}
      <p>No recent interactions to show. Why not exploring around ?</p>
    {/if}

    <button class="createPost" on:click={createPost}>Post your recipe!</button>
  {:else}
    <p>Please log in to view your activities.</p>
  {/if}

  {#if showEditor}
    <div class="editorWrapper">
      <QuillTextEditor
        id="quill-editor"
        bind:this={quillEditor}
        isUserEditing={false}
        on:submissionComplete={closeEditor}
      />
      <button class="button submit" on:click={() => quillEditor.submitForm()}> Post! </button>
      <button class="button cancel" on:click={closeEditor}>Cancel</button>
    </div>
  {/if}
</div>

<style>
  /* General container styling */
  .usersActivity {
    background-color: #9aabc47d;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 3px 5px #9aabc4;
    max-width: 100%;
  }
  .usersActivity h2 {
    text-align: center;
  }

  /* Activity item styling */
  .activityItem {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
    width: 100%;
    flex-wrap: wrap;
  }

  .activityImage {
    width: 60px;
    height: 60px;
    border-radius: 20%;
    margin-right: 10px;
    object-fit: cover;
    transition:
      transform 0.3s ease,
      filter 0.3s ease;
  }
  .activityImage:hover {
    transform: scale(1.1);
    filter: brightness(1.2);
  }

  .activityContent {
    flex: 1;
    width: calc(100% - 80px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  /* Recipe link styling */
  .recipeLink {
    text-decoration: none;
    color: inherit;
    transition: color 0.3s ease;
  }
  .recipeLink:hover {
    color: #6b6a6a;
  }

  /* Editor wrapper styling */
  .editorWrapper {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  /* Button styling */
  .button {
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    color: white;
    border: none;
    transition:
      background-color 0.3s ease,
      transform 0.3s ease;
  }
  .button.submit {
    background-color: #0a9396;
  }
  .button.cancel {
    background-color: #ae2012;
  }
  .button:hover {
    transform: scale(1.05);
  }

  /* Create post button with original styling */
  .createPost {
    background-color: #302b2b;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    width: 100%;
    box-sizing: border-box;
    transition:
      background-color 0.3s ease,
      transform 0.3s ease;
  }
  .createPost:hover {
    background-color: #5f708c;
    transform: scale(1.05);
    color: #151f18;
  }

  /* Media query for responsiveness */
  @media (max-width: 600px) {
    .activityItem {
      flex-direction: column;
      align-items: center;
    }
    .activityImage {
      width: 80px;
      height: 80px;
      margin-bottom: 10px;
    }
    .activityContent {
      width: 100%;
      text-align: center;
    }
  }
</style>
