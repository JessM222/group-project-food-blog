<script>
  export let article;

  function getImagePath(image) {
    return image ? `http://localhost:3000/${image.replace(/\\/g, "/")}` : "";
    //return image ? PUBLIC_IMAGES_URL : "";
  }
</script>

<div class="summ_recipe">
  {#if article.images.length > 0}
    <img src={getImagePath(article.images[0])} alt="articleImage" style="width: 220px" />
  {:else}
    <img src="../../Default_image.jpg" alt="articleImage" style="width: 220px" />
  {/if}
  <h3>{article.title}</h3>
</div>

<style>
  .summ_recipe {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: space-evenly;
  }

  .summ_recipe h3 {
    font-family: "Cormorant Garamond", serif;
    color: #5a3d2b;
    font-size: 20px;
    text-align: center;
    margin: 0;
  }
</style>
