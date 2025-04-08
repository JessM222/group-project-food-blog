<script>
  import { PUBLIC_API_BASE_URL } from "$env/static/public";
  import { onMount } from "svelte";
  import QuillTextEditor from "./QuillTextEditor.svelte";
  import { userDataStore } from "../store/userDataStore.js";

  export let fullArticle = {
    title: "",
    content: "",
    username: "",
    total_views: 0,
    category_id: 0,
    images: [] // to store the images
  };

  let comments = [];
  let newComment = "";
  let username = $userDataStore.username;
  let editionMode = false;

  let editedTitle = fullArticle.title;
  let editedContent = fullArticle.content;
  let editedCategory = fullArticle.category_id;

  let likeBtnHidden = true;
  let bookmarkBtnHidden = true;
  let editBtnHidden = true;

  let likeCount = 0;
  let bookmarkCount = 0;
  let isLiked = false;
  let isBookmarked = false;
  let viewsCount = 0; //TODO - IMPLEMENT PROPER COUNTER

  export const interactionTypes = {
    like: "Like",
    bookmark: "Bookmark"
  };

  async function adjustInteractionCounters() {
    try {
      const response = await fetch(
        `${PUBLIC_API_BASE_URL}/interactions/byarticle/${fullArticle.article_id}`
      );
      let interactionsJSON = await response.json();
      let interactions = interactionsJSON.interactions;
      likeCount = interactions.filter(
        (interaction) => interaction.type === interactionTypes.like
      ).length;
      bookmarkCount = interactions.filter(
        (interaction) => interaction.type === interactionTypes.bookmark
      ).length;
    } catch (error) {
      console.error("Failed to count interactions:", error);
    }
  }

  function getImagePath(image) {
    return image ? `http://localhost:3000/${image.replace(/\\/g, "/")}` : "";
  }

  async function getComments() {
    try {
      const response = await fetch(`${PUBLIC_API_BASE_URL}/comments/${fullArticle.article_id}`);
      const commentsJSON = await response.json();
      comments = commentsJSON.comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        creation_time: comment.creation_time,
        username: comment.username
      }));
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  }

  async function likeArticle() {
    if (!checkIfUserIsAuthenticated()) return;
    try {
      const response = await fetch(
        `${PUBLIC_API_BASE_URL}/interactions/${fullArticle.article_id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: interactionTypes.like }),
          credentials: "include"
        }
      );
      const result = await response.json();
      if (response.ok) {
        likeCount = result.count;
        isLiked = result.toggled;
      }
    } catch (error) {
      console.error("Failed to like:", error);
    }
  }

  function editArticle() {
    if (editionMode) {
      editedTitle = fullArticle.title;
      editedContent = fullArticle.content;
      editedCategory = fullArticle.category_id;
    }
    editionMode = !editionMode;
  }

  async function handleSaveEditedArticle(event) {
    const { title, content, category_id, images } = event.detail;
    fullArticle = { ...fullArticle, title, content, category_id };
    editionMode = false;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category_id", category_id);
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await fetch(`${PUBLIC_API_BASE_URL}/articles/${fullArticle.article_id}`, {
        method: "PATCH",
        body: formData,
        headers: {},
        credentials: "include"
      });

      if (!response.ok) {
        console.error("Failed to save article:", response.statusText);
        return;
      }

      // Fetch the images after saving the article
      await fetchArticleImages(fullArticle.article_id);
    } catch (error) {
      console.error("Error saving edited article:", error);
    }
  }

  async function fetchArticleImages(articleId) {
    try {
      const response = await fetch(`${PUBLIC_API_BASE_URL}/articles/getImages/${articleId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch images: ${response.statusText}`);
      }
      const imagesData = await response.json();
      fullArticle.images = imagesData.map((image) => image.URL);
    } catch (error) {
      console.error("Error fetching article images:", error);
    }
  }

  async function bookMarkArticle() {
    if (!checkIfUserIsAuthenticated()) return;
    try {
      const response = await fetch(
        `${PUBLIC_API_BASE_URL}/interactions/${fullArticle.article_id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: interactionTypes.bookmark }),
          credentials: "include"
        }
      );
      const result = await response.json();
      if (response.ok) {
        bookmarkCount = result.count;
        isBookmarked = result.toggled;
      }
    } catch (error) {
      console.error("Failed to bookmark:", error);
    }
  }

  async function addComment() {
    if (!checkIfUserIsAuthenticated()) return;
    if (!newComment.trim()) return;

    const tempComment = {
      id: Date.now(),
      content: newComment,
      creation_time: new Date().toISOString(),
      username: $userDataStore.username
    };

    comments.push(tempComment);

    try {
      const response = await sendPostCommentRequest();
      if (response.ok) {
        const addedComment = await response.json();
        updateCommentsInPage(addedComment);
      } else {
        console.error("Failed to add comment:", response.statusText);
        comments = comments.filter((comment) => comment.id !== tempComment.id);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      comments = comments.filter((comment) => comment.id !== tempComment.id);
    } finally {
      newComment = "";
    }
  }

  function updateCommentsInPage(addedComment) {
    comments = comments.map((comment) => {
      if (comment.id === Date.now()) {
        return {
          id: addedComment.id,
          content: addedComment.content,
          creation_time: addedComment.creation_time,
          username: addedComment.username
        };
      }
      return comment;
    });
  }

  async function sendPostCommentRequest() {
    return await fetch(`${PUBLIC_API_BASE_URL}/comments/${fullArticle.article_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: newComment,
        username: $userDataStore.username
      })
    });
  }

  function adjustButtons() {
    if ($userDataStore.username === fullArticle.username) {
      editBtnHidden = false;
      bookmarkBtnHidden = true;
      likeBtnHidden = true;
      return;
    }
    editBtnHidden = true;
    bookmarkBtnHidden = false;
    likeBtnHidden = false;
  }

  function checkIfUserIsAuthenticated() {
    console.log("checkIfUserIsAuthenticated " + $userDataStore.username);
    if ($userDataStore.username === "") {
      alert("Please log in :)");
      return false;
    }
    return true;
  }

  async function increaseViews() {
    if ($userDataStore.username !== fullArticle.username) {
      try {
        const response = await fetch(
          `${PUBLIC_API_BASE_URL}/articles/increaseViews/${fullArticle.article_id}`,
          {
            method: "PATCH"
          }
        );
        console.log("response from server ", response);
        if (!response.ok) {
          console.error("Failed to increase the views:", response.statusText);
          return;
        }
      } catch (error) {
        console.error("Failed to increase the views:", error);
      }
    }
  }

  async function deleteArticle() {
    const confirmDelete = confirm("Are you sure you want to delete this article?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${PUBLIC_API_BASE_URL}/articles/${fullArticle.article_id}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (response.ok) {
        alert("Article deleted successfully.");
        // Redirect to the recipe page
        window.location.href = '/recipes'; // Change this to your actual recipes page URL
      } else {
        console.error("Failed to delete article:", response.statusText);
        alert("Failed to delete the article. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Error occurred while deleting the article.");
    }
  }

  onMount(async () => {
    await adjustInteractionCounters();
    adjustButtons();
    await getComments();
    await increaseViews();
    await fetchArticleImages(fullArticle.article_id);
  });
</script>

<svelte:head>
  <title>{fullArticle?.title || "Recipe"}</title>
</svelte:head>

<div class="full_article">
  <div class="content">
    <h1>{editionMode ? "Editing Article" : fullArticle.title}</h1>
    <h4><strong>Author:</strong>&nbsp;{fullArticle.username}</h4>
    <p><em>views:&nbsp;{fullArticle.total_views}</em></p>

    <button class="edit_button" on:click={editArticle} hidden={editBtnHidden}>
      {editionMode ? "Cancel" : "Edit"}
    </button>

    <button on:click={deleteArticle} class="delete_button" hidden={editBtnHidden}>
      Delete Article
    </button>

    {#if editionMode}
      <QuillTextEditor
        bind:title={editedTitle}
        bind:content={editedContent}
        bind:category_id={editedCategory}
        bind:isUserEditing={editionMode}
        editMode={true}
        on:save={handleSaveEditedArticle}
      />
    {:else}
      <div class="image-gallery">
        {#each fullArticle.images as image}
          <img src={getImagePath(image)} alt="articleImage" class="main-image" />
        {/each}
      </div>
      <p>{@html fullArticle.content}</p>
    {/if}

    <button on:click={bookMarkArticle} class:active={isBookmarked} hidden={bookmarkBtnHidden}>
      {bookmarkBtnHidden ? "Unbookmark" : "Bookmark"} ({bookmarkCount})
    </button>

    <button on:click={likeArticle} class:active={isLiked} hidden={likeBtnHidden}>
      {isLiked ? "Unlike" : "Like"} ({likeCount})
    </button>

    <textarea bind:value={newComment} placeholder="Write your comment here..."></textarea>
    <button on:click={addComment}>Add a comment</button>
  </div>

  <div class="comments-section">
    <h3>Comments</h3>
    {#if comments.length > 0}
      {#each comments as comment (comment.id)}
        <div class="comment">
          <p>
            <strong>{comment.username}</strong>
            <em>&nbsp;Published:&nbsp;{comment.creation_time}</em>
          </p>
          <p>{comment.content}</p>
        </div>
      {/each}
    {:else}
      <p>No comments available.</p>
    {/if}
  </div>

  <div class="bio"></div>
</div>

<style>
  .full_article {
    grid-gap: 20px;
    padding: 20px;
    max-width: 80%;
    margin: auto;
  }

  button {
    padding: 10px 20px;
    margin: 10px 5px;
    font-size: 1em;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background-color: #2a5e99;
    color: white;
    transition: background-color 0.3s ease;
  }

  .edit_button, .delete_button {
    margin-left: auto;
  }

  button:hover {
    background-color: #ff6347;
  }

  textarea {
    width: 100%;
    height: 100px;
    margin: 10px 0;
    padding: 10px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
  }

  .image-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
  }

  .main-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 8px;
    transition: transform 0.2s ease;
  }

  .main-image:hover {
    transform: scale(1.01);
  }

  .content {
    padding: 5px;
    text-align: justify;
  }

  .comments-section {
    text-align: left;
  }

  .comment {
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
  }

  .comment:last-child {
    border-bottom: none;
  }

  .comment p {
    margin: 0;
  }

  .active {
    background-color: #ff5722;
    color: white;
    border: none;
  }
</style>
