<script>

    let data;
    const handleClick = async () => {
      data = await fetch ('http://localhost:3000/api/articles').then((x) => x.json());
    };
    
    </script>
    
    <button on:click={handleClick}>Click to view recipes</button>
       <pre>{JSON.stringify(data, null, 2)}</pre> 
       <h1>Popular Categories</h1>
       <ul>
       <li>Dinner</li>
       <li>Breakfast</li>
       <li>Dessert</li>
       <li>Starters</li>
       <li>Main Course</li>
       <li>Street Food</li>
       <li>Asian</li>
       <li>Middle East</li>
       <li>American</li>
       <li>African</li>
       <li>European</li>
       <li>Scandinavian</li>
       <li>30-min Recipes</li>
       <li>Holiday Recipes</li>
       </ul>  