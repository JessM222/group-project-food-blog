<script>
    import UserActivity from '../../lib/components/UserActivity.svelte';
    import CarouselHome from '../../lib/components/CarouselHome.svelte';
    import { onMount } from 'svelte';

    let topRecipes = [];
    let userActivity = [];

</script>


<div class="logo">
<a href="/" class="navLogo">Food Blog</a>
<p> where you'll find hea-ppos of recipes!</p>
</div>

<!-- <nav class="navbar">
    <div class="navbarContainer">
        <ul class="navLinks">
            <li><a href="/" class="navLinkLogin">LOGIN</a></li>
            <li><a href="/recipes" class="navLink">Recipe Blog Posts</a></li>
            <li><a href="/about" class="navLink">About Us</a></li>
            <li><a href="/contact" class="navLink">Sign Up</a></li>
        </ul>
    </div>
</nav> -->



<div class="pageLayout">
    <div class="carouselContainer">
        <CarouselHome  {topRecipes} />
    </div>
    <div class="userActivityContainer">
        <UserActivity {userActivity} />
    </div>
</div> 



 <style>

    .pageLayout{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 20px;
        gap: 50px;
        max-width: 1500px; 
        margin: 0 auto;
        width: 100%;
    }

    .carouselContainer{
        flex: 3; 
        flex-basis: 70%;
        width: 100%;
    }

    .userActivityContainer{
        flex: 1;
        flex-basis: 30%;
        width: 100%;
        max-width: 100%;
    }


    /*nav bar styling */ 

    /* .navbar {
        background-color: #9aabc47d; 
        color: white;
        padding: 25px 20px;
        box-shadow: 0 3px 5px #9aabc4;
    }

    .navbarContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
    } */

    .navLogo {
        color: rgb(0, 0, 0);
        text-decoration: none;
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
    }

    /* .navLinks {
        list-style: none;
        display: flex;
        gap: 50px;
        padding: 0;
        margin: 0;
    } */

    /* .navLink {
        color: rgb(0, 0, 0);
        text-decoration: none;
        font-size: 1rem;
        transition: color 0.3s ease;
        padding: 10px 15px;
        border: 1px solid black;
    }

    .navLink:hover {
        color: #849899; 
    }

    .navLinkLogin{
        color: white;
        text-decoration: none;
        font-size: 1rem;
        transition: color 0.3s ease;
        background-color: #302b2b;
        padding: 10px 15px;
        border: 1px solid black;
    }

    .navLinkLogin:hover {
        background-color: #849899; 
    } */

    .logo{
        text-align: center;
    }

  
</style> 