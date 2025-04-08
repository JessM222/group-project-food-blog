<script>
    import { onMount } from "svelte";
    import { PUBLIC_API_BASE_URL } from "$env/static/public";

    let topRecipes = [];
    let currentRecipeIndex = 0;
    let showFullContent = false;

    // Function to construct the image path
    function getImagePath(image) {
        return image ? `http://localhost:3000/${image.replace(/\\/g, "/")}` : "/Default_image.jpg";
    }

    // Fetch top recipes on mount
    onMount(async () => {
        try {
            const response = await fetch(`${PUBLIC_API_BASE_URL}/articles`);
            if (response.ok) {
                const data = await response.json();
                topRecipes = getRandomArticles(data, 5);
            } else {
                console.error("Failed to fetch articles:", response.status);
            }
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    });

    // Shuffle and select a fixed number of articles
    function getRandomArticles(data, num) {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    function showPrevious() {
        if (topRecipes.length > 0) {
            currentRecipeIndex = (currentRecipeIndex - 1 + topRecipes.length) % topRecipes.length;
        }
    }

    function showNext() {
        if (topRecipes.length > 0) {
            currentRecipeIndex = (currentRecipeIndex + 1) % topRecipes.length;
        }
    }

    function toggleContent() {
        showFullContent = !showFullContent;
    }
</script>

<div class="carousel">
    <h2>Current Recipes!</h2>
    {#if topRecipes.length > 0}
        <div class="carouselItem">
            <button on:click={showPrevious} class="prev" type="button">&#8249;</button> 
            <div class="imageWrapper">
                <a href="/recipes/{topRecipes[currentRecipeIndex].id}" class="recipeLink">
                    <!-- Display the first image or a default image if none is provided -->
                    <img src={getImagePath(topRecipes[currentRecipeIndex].images?.[0])} 
                         alt={topRecipes[currentRecipeIndex].title} 
                         class="carouselImage" 
                         style="width: 220px">
                </a>
            </div>
            <button on:click={showNext} class="next" type="button">&#8250;</button> 
            <div class="carouselContent">
                <a href="/recipes/{topRecipes[currentRecipeIndex].id}" class="recipeLink">
                    <h3>{topRecipes[currentRecipeIndex].title}</h3>
                </a>
                <p class="contentWrapper">
                    {#if showFullContent}
                        {topRecipes[currentRecipeIndex].content}
                        <a href="/recipes/{topRecipes[currentRecipeIndex].id}" class="readMoreLink">Show less</a>
                    {:else}
                        {topRecipes[currentRecipeIndex].content.slice(0, 100)}...
                        <a href="/recipes/{topRecipes[currentRecipeIndex].id}" class="readMoreLink">Read more</a>
                    {/if}
                </p>
            </div>
        </div>
    {:else}
        <p>Loading recipes...</p>
    {/if}
</div>


<style>
.carousel {
    text-align: center;
    margin: 20px auto;
    width: 90%;
    max-width: 1200px;
    box-sizing: border-box;
    z-index: 1;
}

.carouselItem {
    width: 100%;
    max-width: 100%;
    margin: 0 auto; 
    box-sizing: border-box;
    position: relative;
}

.imageWrapper {
    background-color: #9aabc47d; 
    border-radius: 25px; 
    padding: 20px; 
    box-sizing: border-box;
    overflow: hidden; 
    box-shadow: 0 3px 5px #9aabc4;
}

.contentWrapper {
    font-size: 0.9rem;
    color: black;
    max-width: 90%;         
    position: relative;
    padding-right: 60px;  
    margin-bottom: 5px;  
}

.carouselImage {
    width: 100%;
    height: 400px;
    border-radius: 15px; 
    object-fit: cover;
    transition: transform 0.3s ease;
}

.carouselImage:hover {
    filter: brightness(1.05);
}

.carouselContent {
    text-align: left;
    width: 100%;
    padding-bottom: 15px;
    max-width: 100%;
    margin: 0 auto;
}

.carouselContent p.contentWrapper {
    font-size: 0.9rem;
    color: black;                  
    white-space: nowrap;             
    max-width: 100%;         
    position: relative;
    padding-right: 60px;  
    margin-bottom: 5px;     
}

.readMoreLink {
    color: #ffffff;                
    background-color: #302b2b;     
    text-decoration: none;
    font-weight: bold;
    padding: 5px 10px;             
    border-radius: 5px;           
    cursor: pointer;               
    margin-top: 10px;              
    display: inline-block;
}

.recipeLink {
    text-decoration: none;
    color: inherit;
    transition: background-color 0.3s ease, color 0.3s ease;
    padding: 0px;
    border-radius: 5px;
}

.recipeLink:hover {
    color: #6b6a6a;
}

.carouselContent h3 {
    font-size: 1.2rem;
    margin-bottom: 5px;
}

.carouselContent p { 
    font-size: 0.9rem;
    color: black;
}

.prev,
.next {
    cursor: pointer;
    position: absolute;
    top: 40%;
    width: auto;
    padding: 16px;
    color: rgb(0, 0, 0);
    font-weight: bold;
    font-size: 40px;
    user-select: none;
    -webkit-user-select: none;
    z-index: 3;
}

.prev {
    left: 0;
}

.next {
    right: 0;
}

.prev,
.next {
    background-color: rgba(97, 115, 134, 0);  
    border: none;                                                                                  
}

@media (max-width: 800px) {
    .carousel {
        width: 100%;
        margin: 0 auto;
    }
}
</style>