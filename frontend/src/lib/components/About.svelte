<script>
  import aboutMe from "$lib/assets/Aboutme.jpg";
</script>

<link
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap"
  rel="stylesheet"
/>

<h1>About Us</h1>
<h2>Welcome to Happy Hippos Food Blog</h2>

<div class="about-container">
  <div class="about-image">
    <img src={aboutMe} alt="Aboutme" />
  </div>
  <div class="about-content">
    <h2>Where healthy meets delicious!</h2>
    <p>
      Hi, my name is Hippo, and I am a professional chef, former restaurant owner, and wedding
      caterer. I have been in the food industry for over 30 years!
    </p>
    <p>
      I started the Feasting at Home blog in 2011, and it has blossomed into a global food site with
      millions of delighted visitors each month and over 1,000 restaurant-quality recipes!
      Literally, most of the recipes you’ll find here come straight from our restaurant and catering
      business.
    </p>
    <p>
      It is my hope that through these recipes, you’ll learn my simple techniques to elevate your
      cooking and develop (or rekindle) a love of cooking! Because cooking your meals from scratch
      is the one thing you can do today to elevate your health.
    </p>
    <p>
      Over half of our recipes are vegan or vegetarian, with many fish, chicken, and meat dishes, as
      well. Don’t worry, omnivores; we have something for you, too!
    </p>
    <p>
      I realize food, like politics, can be very polarizing. My goal here is to highlight and
      celebrate what we have in common. Whether you are vegan, vegetarian, pescatarian, paleo, keto,
      flexitarian or omnivore – we can all agree on one thing: cooking meals from scratch using
      fresh, wholesome ingredients is one of the most nourishing gifts we can give ourselves and our
      families.
    </p>

    <h1>MY Food Philosophy:</h1>
    <h2>I try to eat organic, locally grown, whole foods that are high in nutrition.</h2>

    <p>
      Overly processed foods are kept to a minimum, while quality and nutrition are paramount to me.
      If I am going to consume fish or seafood, I look for wild. I realize this is cost-prohibitive
      for many, but I rationalize this by only having it occasionally.
    </p>
    <p>
      I don’t judge or label food groups as “good” or “bad,” and I don’t believe that our diet needs
      to be black and white, political, or become a religion or an identity.
    </p>
    <p>
      My best advice is to buy the highest quality ingredients (nutritious, organic, homegrown, or
      farmers market) you can afford, starting with what you eat the most. Then, as you use things
      up, trade them up for organic.
    </p>
    <p>
      Even though I had a vegetarian restaurant for 10 years and often eat plant-based during the
      week, as a chef I want to taste and experience everything! I love fish and grew up eating
      lamb.
    </p>
  </div>
</div>

<style>
  /* Apply the fancy font to h1 */
  h1 {
    font-family: "Playfair Display", serif;
    text-align: center;
    font-size: 2.5rem;
    color: #6a7688;
  }

  .about-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 20px;
    max-width: 1200px;
    margin: auto;
  }

  .about-image img {
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
  }

  .about-content {
    background-color: #9aabc437;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: left;
  }

  h2 {
    color: #d89a9a;
    text-align: center;
  }

  p {
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .about-content h1 {
    margin-top: 0;
  }

  /* Responsive design for smaller screens */
  @media (max-width: 768px) {
    .about-container {
      padding: 10px;
    }

    .about-content {
      padding: 15px;
    }
  }
</style>
