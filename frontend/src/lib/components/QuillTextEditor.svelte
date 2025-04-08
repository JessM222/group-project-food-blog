<script>
  import { onMount, createEventDispatcher } from "svelte";
  import Quill from "quill";
  import { page } from "$app/stores"; // Import SvelteKit's page store

  export let title = ""; //Modified
  export let content = ""; //Modified
  export let category_id = "";

  let images = [];
  let categories = [];
  let isLoadingCategories = true;

  const dispatch = createEventDispatcher(); //Added
  export let isUserEditing = false;
  let showPostButton = false;

  onMount(async () => {
    try {
      const response = await fetch("http://localhost:3000/api/categories", {
        method: "GET",
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Failed to load categories");
      }

      const data = await response.json();

      categories = data.categories || [];
      console.log("Fetched categories:", categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("Failed to load categories. Please try again later.");
    } finally {
      isLoadingCategories = false;
    }

    const quill = new Quill("#editor", {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          [{ list: "bullet" }]
        ]
      }
    });

    quill.root.innerHTML = content; //Added

    quill.on("text-change", () => {
      content = quill.root.innerHTML;
    });
  });

  $: if ($page.url.pathname.startsWith("/recipes/")) {
    showPostButton = true;
  } else {
    showPostButton = false;
  }

  export async function submitForm() {
    if (isUserEditing === true) {
      dispatch("save", { title, content, category_id, images });
      return;
    }
    validateDataBeforeSubmition();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category_id", category_id);

    images.forEach((image) => formData.append("images", image));

    try {
      const response = await fetch("http://localhost:3000/api/articles", {
        method: "POST",
        body: formData,
        headers: {},
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Failed to submit article");
      }
      console.log("RESPONSE FROM DB", response);

      alert("Article submitted successfully!");
      resetForm();
      dispatch("submissionComplete");
    } catch (error) {
      console.error("Error submitting article:", error);
      // alert("Failed to submit article. Please try again later.");
    }
  }

  function validateDataBeforeSubmition() {
    if (!title) {
      alert("Title is required.");
      return;
    }
    if (!content) {
      alert("Content is required.");
      return;
    }
    if (!category_id) {
      alert("Category is required.");
      return;
    }
  }

  function handleImageUpload(event) {
    images = Array.from(event.target.files);
  }

  function resetForm() {
    title = "";
    content = "";
    category_id = "";
    images = [];
    const quill = Quill.find(document.querySelector("#editor"));
    quill.setText("");
  }
</script>

<!-- <h1>Create New Article</h1> -->
<form on:submit|preventDefault={submitForm}>
  <label for="title">Title</label>
  <input type="text" id="title" bind:value={title} required />

  <label for="category">Category</label>
  {#if isLoadingCategories}
    <p>Loading categories...</p>
  {:else if categories.length > 0}
    <select id="category" bind:value={category_id} required>
      {#each categories as category}
        <option value={category.id}>{category.description}</option>
      {/each}
    </select>
  {:else}
    <p>No categories available.</p>
  {/if}

  <label for="content">Content</label>
  <div id="editor" class="editor-container"></div>

  <label for="images">Upload Images</label>
  <input type="file" id="images" multiple on:change={handleImageUpload} />
  <div class="image-preview">
    {#each images as image}
      <img src={URL.createObjectURL(image)} alt="Preview" />
    {/each}
  </div>

  <button on:click={submitForm} style:visibility={showPostButton ? "visible" : "hidden"}>
    {isUserEditing ? "Save" : "Post"}
  </button>
</form>

<style>
  .editor-container {
    height: 300px;
  }
  .image-preview {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  .image-preview img {
    max-width: 200px;
    margin-right: 10px;
  }
</style>
