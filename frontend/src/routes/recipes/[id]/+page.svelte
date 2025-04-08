<!-- src/routes/recipes/[id]/+page.svelte -->
<script>
  //   import FullRecipe from ".FullRecipe.
  import FullRecipe from "../../../lib/components/FullRecipe.svelte";

  export let data;

  // Destructure data to get the recipe information
  const { article } = data;
</script>

<FullRecipe fullArticle={article} />
