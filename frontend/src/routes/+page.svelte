<script>
  import UserActivity from "$lib/components/UserActivity.svelte";
  import CarouselHome from "$lib/components/CarouselHome.svelte";

  let topRecipes = [];
  let userActivity = [];
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div class="logo">
  <a href="/" class="navLogo">Food Blog</a>
  <p>where you'll find hea-ppos of recipes!</p>
</div>

<div class="pageLayout">
  <div class="carouselContainer">
    <CarouselHome {topRecipes} />
  </div>
  <div class="userActivityContainer">
    <UserActivity {userActivity} />
  </div>
</div>

<style>
  .pageLayout {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px;
    gap: 50px;
    max-width: 1700px;
    margin: 0 auto;
    width: 100%;
  }

  .carouselContainer {
    flex: 3;
    flex-basis: 70%;
    width: 100%;
  }

  .userActivityContainer {
    flex: 1;
    flex-basis: 30%;
    width: 100%;
    max-width: 100%;
  }

  .navLogo {
    color: rgb(0, 0, 0);
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
  }

  .logo {
    text-align: center;
  }
</style>
