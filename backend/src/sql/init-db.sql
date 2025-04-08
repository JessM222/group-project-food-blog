DROP TABLE IF EXISTS User;

CREATE TABLE User (
    username VARCHAR(20) NOT NULL PRIMARY KEY,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    fName VARCHAR(20) NOT NULL,
    lName VARCHAR(20) NOT NULL,
    date_of_birth DATE NOT NULL,
    bio TEXT,
    avatar TEXT NOT NULL DEFAULT 'Default'
);

DROP TABLE IF EXISTS Article;

CREATE TABLE Article (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    username VARCHAR(20) NOT NULL,
    total_views INTEGER NOT NULL DEFAULT 0,
    category_id INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES Category(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Category;

CREATE TABLE Category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT
);

DROP TABLE IF EXISTS Comment;

CREATE TABLE Comment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    article_id INTEGER NOT NULL,
    username VARCHAR(20) NOT NULL,
    FOREIGN KEY (article_id) REFERENCES Article(id) ON DELETE CASCADE,
    FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Interaction;

CREATE TABLE Interaction (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    article_id INTEGER NOT NULL,
    username VARCHAR(20) NOT NULL,
    FOREIGN KEY (article_id) REFERENCES Article(id) ON DELETE CASCADE,
    FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Share;

CREATE TABLE Share (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    post TEXT,
    share_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    platform TEXT,
    article_id INTEGER NOT NULL,
    username VARCHAR(20) NOT NULL,
    FOREIGN KEY (article_id) REFERENCES Article(id) ON DELETE CASCADE,
    FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE
);

CREATE TABLE Image (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    URL TEXT NOT NULL,
    upload_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    article_id INTEGER NOT NULL,
    FOREIGN KEY (article_id) REFERENCES Article(id) ON DELETE CASCADE
);

--adding a user

INSERT INTO User (username, password, email, fName, lName, date_of_birth, bio) VALUES 
('MasterChef', '$2b$10$we16UoQemY8xYgr8vZz9uu4q01..2XDSKlDRKkj.JV7VgbcKRDXOO', 'masterChef@happyHippos.com', 'Happy', 'Hippos', '2000-01-01',"");

--adding a category
INSERT INTO Category (description) VALUES ('Dinner');
INSERT INTO Category (description) VALUES ('Breakfast');
INSERT INTO Category (description) VALUES ('Dessert');
INSERT INTO Category (description) VALUES ('Starters');
INSERT INTO Category (description) VALUES ('Main Course');
INSERT INTO Category (description) VALUES ('Street Food');
INSERT INTO Category (description) VALUES ('Asian');
INSERT INTO Category (description) VALUES ('MIddle East');
INSERT INTO Category (description) VALUES ('American');
INSERT INTO Category (description) VALUES ('African');
INSERT INTO Category (description) VALUES ('European');
INSERT INTO Category (description) VALUES ('Scandinavian');
INSERT INTO Category (description) VALUES ('30-min Recipes');
INSERT INTO Category (description) VALUES ('Holiday Recipes');

--adding articles

INSERT INTO Article (username, title, content, total_views, category_id) VALUES 
('MasterChef','Soft Sugar Cookie Bars', 

'Hi hi! Just popping in to share the recipe for these super easy sugar cookie bars! These soft and chewy frosted sugar cookie bars are made a cookie bar version of my classic vanilla cookies.

I love making bar cookies - I have a bunch of cookie bar recipes on my site. They have all the taste of a classic vanilla drop cookie, but pressed into a pan, it makes the whole process super easy. Cookie bars work great with chocolate chip cookie recipes too (my chocolate chip cookie bars are some of my faves).

These super simple sugar cookie bars are finished with a super simple buttercream frosting and sprinkles, to make them perfect to suit any occasion.
Baking a cookie bar into a pan not only saves you time but gives you a whole different textural experience - the middle pieces stay soft and chewy, while the outside edges get nice and crinkly, so you can choose what piece you get.

I often convert my homemade cookie recipes into cookie bar recipes - usually the only tweak I need to make is reducing the leavening agent a little to stop them being as puffy, and deciding what pan to use. Here is how I typically decide pan size (for my recipes at least)

If it is a larger cookie recipe such as my vanilla cookies, I will choose a 9x13"" pan. I tried this sized batch in a 9"" square pan and it did not go well.
If it is a smaller batch recipe like my brown butter chocolate chip cookies or my M&M cookies, I will put it either into a 9"" pan or an 8"" pan (see my chocolate chip cookie bars and my M&M cookie bars). I tend to go for 8"" for recipes like this as I like them slightly thicker, but if you want them thinner and a little crispier, go for a 9"" pan.', 0, 3);

INSERT INTO Article (username, title, content, total_views, category_id) VALUES 
('MasterChef','Creamy Vegan Chocolate Milkshake', 

'Nothing hits the spot quite like a chocolate milkshake. For us, the ultimate chocolate shake is one that’s thick, creamy, and chocolaty, but just subtly chocolaty…like drive-thru shakes. An equally rich and satisfying vegan version had to happen!Just 7 simple ingredients required for this nostalgic treat, friends. Let’s make milkshakes! 
This homemade vegan chocolate milkshake isn’t your average blend-up-milk-and-ice-cream situation. It’s made from scratch with simple, plant-based ingredients.
We blend coconut milk with cocoa powder, cashew butter, maple syrup, vanilla extract, and sea salt. That means you can adjust to your preferred level of chocolaty-ness and sweetness!
Once blended, the mixture becomes super creamy and is ready to pour into an ice cube tray to turn it into “ice cream.” No ice cream maker or store-bought ice cream needed here!
Then, the next time you find yourself with a chocolate shake craving, you can say hello to chocolate shakes on demand! All you’ll need to do is blend the chocolate ice cubes with dairy-free milk (we like almond), and it’s shake time.
Enjoy as is, or top with dairy-free whipped cream, sprinkles, berries, shaved chocolate, or your favorite shake toppings!', 0, 4);

INSERT INTO Article (username, title, content, total_views, category_id) VALUES 
('MasterChef','No-Bake Vegan Cheesecake Cups (5 Minutes!)', 

'Cheesecake can feel like an undertaking, but not anymore! These 5-minute, no-bake vegan cheesecake cups solve your cheesecake challenges – all of the flavor, none of the waiting!

Layered with crushed granola, a creamy cashew cheesecake filling, and fresh berries, these parfaits are not only adorable, but perfectly sweet and oh-so delicious! Swap in your favorite seasonal fruit to enjoy this naturally sweetened dessert year round! Just 7 ingredients and 1 blender required. Let’s make cheesecake cups!

First things first: our cheesecake cups need a “crust”! To keep things quick and easy (a.k.a. the best way!) the first layer is a base of granola optionally blended up into a crumb texture. Nearly any kind of granola will do, or you can use crushed graham crackers for a more indulgent result!

Then it’s time for the star of the show: the “cheese”cake filling! A base of raw cashews combine with maple syrup, coconut yogurt, lemon juice, and salt for a creamy, tangy, perfectly sweet result. Just blend ’em up and vegan cheesecake cup dreams will come true. Cheesy peasy!

Lastly, the sweet-tart “cheese” tops the granola “crust” followed by fresh fruit in what critics are calling “the most delightful dessert of 2023 (so far)”. You heard it here first, friends. You can chill the cups before serving, or jump right in!', 0, 4);

INSERT INTO Article (username, title, content, total_views, category_id) VALUES 
('MasterChef','Vegetarian Vietnamese Spring Rolls (Goi Cuon Chay)', 

'These vegetarian Vietnamese spring rolls (goi cuon chay) are the vegetarian version of the beloved Vietnamese spring rolls. Filled with addictive lemongrass tofu and fresh herbs, these spring rolls are just as good as their meat filled counterparts. Included in this blog post are tips on how to perfectly boil vermicelli noodles for spring rolls and 3 options for dipping sauces!
Ingredients, Substitutions & Adjustments:
1. Lemongrass Tofu:
Firm tofu – It is important that you use firm tofu for this recipe because firm tofu holds its shape the best when frying. If you try to use soft, silky or medium tofu, it will fall apart as you fry it.
Garlic – Adds flavor to the dish. Garlic can be substituted with 1/2 tsp of garlic powder.
Shallot – Adds sweetness to the tofu. 1 shallot can be substituted with 1/4 sweet yellow onion.
Lemongrass – Lemongrass adds a slight lime-y flavor to the tofu and balances out the other savory ingredients. Substitute with 1 tbsp of lime juice.
Soy sauce – Adds umami flavor to the dish. The soy sauce also gives the tofu a nice color. I used low sodium soy sauce. Substitute with tamari for a gluten free alternative.
Vegan oyster sauce – Vegan oyster sauce is a new favorite ingredient of mine. It is made of mushrooms and some brands are even gluten free. The brand I use is Lee Kum Kee, and their vegan oyster sauce is also gluten free. If you don’t care if this dish is vegetarian, substitute with regular oyster sauce.
Honey – Adds sweetness to the tofu and balances out the savory ingredients.
Light brown sugar – Adds more sweetness to the tofu. Light brown sugar can be substituted with dark brown sugar. I would add a little less dark brown sugar because it is sweeter than light brown sugar.
Water – The first time I tested this recipe, it was way too salty. I found that adding water helps give the tofu more balance.
Vegetable oil (for frying the tofu) – I would recommend using some kind of oil with a high smoke point. This means it doesn’t burn easily. I use vegetable oil, but another good option is avocado oil.
2. Spring Roll
Rice paper – All spring rolls are made with rice paper. These can be found at most Asian grocery stores and even some Western stores.
Lettuce – Use any kind lettuce you want.
Carrots – I buy pre-shredded carrots from the store, but you can also make them at home with a box grater.
Cucumbers – I personally use Persian cucumbers for my spring rolls. I find they have better flavor than regular cucumbers. You can use whichever cucumbers you want.
Mint – Use any kind of mint you want. Some great substitutes are Vietnamese coriander, Thai basil, and perilla leaves.
Vermicelli noodles – I love the Three Ladies Brand vermicelli noodles.
Vegetarian Vietnamese Dipping Sauce – I make my own vegetarian Vietnamese dipping sauce. It substitutes soy sauce for fish sauce.', 0, 5);

INSERT INTO Article (username, title, content, total_views, category_id) VALUES 
('MasterChef','Mushroom-Stuffed Chicken Breast', 

'Mushroom-Stuffed Chicken Breast is one of those recipes where you take just a few ingredients and deploy them in a way that makes chicken breast so much more interesting than it usually is! Chicken breast, spinach, mushrooms, garlic and cheese are the only base ingredients here. Vary the type of cheese and swap the spinach for other leafy veg to spin this dish to suit your tastes or what you have on hand!
All these ingredients are pretty straightforward, so I don’t think I need to run through them like I usually do. Just a few points:

Chicken – It needs to be breast to be large enough to cut deep pockets. Boneless thigh won’t work;

Baby spinach – Chopped or sliced ordinary spinach, silverbeet (Swiss chard), kale or cabbage will work fine too;

Cheese – Anything that melts will work great. Mozzarella is ideal because it melts well but isn’t as runny as, say, cheddar or tasty cheese. This is worth bearing in mind since we don’t fully seal the chicken like with Chicken Kiev since it’s a quick recipe, so some cheese is likely to escape!;

Thyme – Fresh thyme and mushroom are such a classic combination, I can’t help but use it often! Dried thyme can be used as an alternative, else dried oregano, marjoram or rosemary. Fresh versions of any of the aforementioned will also be perfect, as would parsley or tarragon. Most herbs, really!

The nice thing about this chicken breast recipe is that there’s already a decent amount of vegetables in it, making it virtually a meal-in-one. While our mums would beam approvingly if they knew we’d made the effort make an extra vegetable side dish, the truth is I wouldn’t go too far out of my way for it! For the photo above all I did was take the leftover baby spinach and drizzled it with some Balsamic Dressing. Totally simple and lazy, but hey it does the trick!

If you feel like making your mum proud though, have a browse of Vegetable and Side Salads. It’s organised by vegetable to make it easy to use something you’ve got!', 0, 5);

INSERT INTO Article (username, title, content, total_views, category_id) VALUES 
('MasterChef','Classic Spaghetti Carbonara', 

'Just finished making this classic spaghetti carbonara, and let me tell you—it’s comfort food at its best. I cooked up some spaghetti and tossed it with crispy pancetta, a mix of eggs and parmesan, and the heat from the pasta made the creamiest sauce ever! It’s one of those dishes that seems fancy but is actually super easy to whip up. A bit of black pepper on top, and it’s perfect. Definitely adding this to my weekly rotation!

Recipe:
- 200g spaghetti
- 100g pancetta (diced)
- 2 large eggs
- 50g grated parmesan cheese
- Freshly ground black pepper

Instructions:
- Cook the spaghetti according to package instructions.
- Meanwhile, cook the pancetta in a pan over medium heat until crispy.
- In a bowl, whisk together the eggs and grated parmesan.
- Drain the spaghetti and add it to the pan with the pancetta. Remove from heat.
- Pour the egg mixture over the hot pasta, tossing to coat. The residual heat will create a creamy sauce.
- Season with black pepper and serve immediately.', 0, 1);

INSERT INTO Article (username, title, content, total_views, category_id) VALUES 
('MasterChef','Quick and Easy Avocado Toast', 

'Hey everyone! I just made the most amazing avocado toast, and I had to share it. It’s so simple but so satisfying. All I did was mash up an avocado with a bit of salt and lemon juice, then spread it on some toasted bread. I sprinkled some chili flakes on top for a little kick, and wow—it totally made my morning! If you want a bit more protein, adding a fried egg on top makes it even better. Quick, easy, and so good!

Recipe:
- 1 ripe avocado
- Juice of 1/4 lemon
- Salt, to taste
- 2 slices of bread (toasted)
- Chili flakes (optional)
- 1 fried egg (optional)

Instructions:
- Mash the avocado in a bowl with lemon juice and salt.
- Spread the mashed avocado over the toasted bread.
- Top with chili flakes and a fried egg, if desired. Enjoy!', 0, 2);

INSERT INTO Article (username, title, content, total_views, category_id) VALUES 
('MasterChef','One-Pot Chicken Curry', 

'I was in the mood for something warm and comforting tonight, so I made this easy one-pot chicken curry. It’s seriously so good! I started by sautéing onions, garlic, and ginger until everything smelled amazing, then added in chicken and let it brown a bit. Stirred in some curry paste and coconut milk, and let it all simmer until the chicken was tender. Served it over some fluffy rice, and voilà—comfort in a bowl! Plus, only one pot to wash, which is a huge win.

Recipe:
- 1 tablespoon vegetable oil
- 1 onion (chopped)
- 2 garlic cloves (minced)
- 1 teaspoon grated ginger
- 500g chicken breast (diced)
- 2 tablespoons curry paste
- 400ml coconut milk
- Salt (to taste)
- Cooked rice (for serving)

Instructions:
- Heat the oil in a large pot over medium heat. Add the onion, garlic, and ginger, and sauté until fragrant.
- Add the diced chicken and cook until browned.
- Stir in the curry paste and coconut milk, and let it simmer for 15-20 minutes, until the chicken is cooked through.
- Season with salt and serve over rice.', 0, 7);

INSERT INTO Article (username, title, content, total_views, category_id) VALUES 
('MasterChef','Refreshing Watermelon Salad', 

'I’ve been obsessed with this watermelon salad lately—it’s the perfect refresher, especially on hot days. It’s just watermelon chunks, crumbled feta, and some mint, but the combination is out of this world! I also like adding a drizzle of balsamic glaze or a squeeze of lime juice to give it a bit more depth. It’s light, sweet, salty, and just really fresh. Trust me, if you’re looking for something quick and easy, this is it!

Recipe:
- 4 cups watermelon (cubed)
- 1/2 cup crumbled feta cheese
- 1/4 cup fresh mint leaves
- 1 tablespoon balsamic glaze or juice of 1/2 lime

Instructions:
- In a large bowl, combine the watermelon cubes, crumbled feta, and mint leaves.
- Drizzle with balsamic glaze or lime juice, and toss gently.
- Serve immediately for a refreshing treat!', 0, 13);

INSERT INTO Article (username, title, content, total_views, category_id) VALUES 
('MasterChef','Baked Chocolate Chip Oatmeal Bars', 

'Made these chocolate chip oatmeal bars today, and they’re such a hit! They’re really simple—just mix oats, peanut butter, honey, and lots of chocolate chips, then bake until they’re golden. They’re chewy, sweet, and perfect for when you need a quick snack. I love having them around for breakfast on busy mornings or as a treat after dinner. Plus, they’re way better than anything store-bought!

Recipe:
- 2 cups rolled oats
- 1/2 cup peanut butter
- 1/3 cup honey
- 1/2 cup chocolate chips

Instructions:
- Preheat the oven to 180°C (350°F).
- In a bowl, mix together the rolled oats, peanut butter, and honey until well combined.
- Stir in the chocolate chips.
- Press the mixture into a greased 8x8-inch baking dish.
- Bake for 15-20 minutes, until golden.
- Let cool before cutting into bars.', 0, 3);

INSERT INTO Article (username, title, content, total_views, category_id) VALUES 
('MasterChef','Garlic Butter Shrimp Pasta', 

'Just made this garlic butter shrimp pasta, and it’s quickly become a favorite. It’s super simple but tastes like something you’d get at a restaurant! All you need is some shrimp, garlic, butter, and spaghetti. Cook the shrimp in butter and garlic until they’re pink, then toss with pasta. Add a squeeze of lemon, and you’re good to go. Perfect for a quick weeknight dinner!

Recipe:
- 200g spaghetti
- 250g shrimp (peeled and deveined)
- 3 tablespoons butter
- 3 garlic cloves (minced)
- Juice of 1/2 lemon
- Salt and pepper (to taste)

Instructions:
- Cook spaghetti according to the package instructions.
- In a large skillet, melt the butter over medium heat.
- Add garlic and sauté for 1 minute.
- Add the shrimp and cook until pink, about 3-4 minutes.
- Toss the cooked pasta with the shrimp, adding lemon juice, salt, and pepper.
- Serve hot.', 0, 1);

INSERT INTO Article (username, title, content, total_views, category_id) VALUES 
('MasterChef','Simple Indian Gujarati Thali', 

'Gujarati Thali is a spectacular treat and fusion of sweet, salty, and spicy flavors all combined in a classic Indian Regional thali. A completely balanced meal from the state of Gujarat with rice, rotli, dal, farsan, sweets, chutney etc

Recipe:
- 1 cup beans chopped
- 1 potato chopped
- 250 gms cabbage grated
- 2 green chillies, chopped
- 1 tsp green chilli garlic ginger paste

Instructions:
- Take a pan, add oil and add mustard seed, jeera and when sputter add hing and add green chilli then add grated cabbage and mix it properly and cook for some time.
- Take a pan add oil, add mustard seeds and when sputter add hing, potatoes and mix properly. Cover the lid and cook on a low flame.
- Add half table spoon turmeric poweder, cumin powder, coriander powder, red chilli and garam masala.
- Serve both sabji (curry) with roti, raita, salad and pickle', 0, 1);

INSERT INTO "main"."Image" ("id", "URL", "upload_time", "article_id") VALUES ('1', 'images/Vegetarian-Vietnamese-Spring-Rolls-19-768x1152-1730599717341.jpg', '2024-11-03 02:08:37', '4');
INSERT INTO "main"."Image" ("id", "URL", "upload_time", "article_id") VALUES ('3', 'images/Mushroom-Stuffed-Chicken-Breast_14-1730600880482.jpg', '2024-11-03 02:28:00', '5');
INSERT INTO "main"."Image" ("id", "URL", "upload_time", "article_id") VALUES ('4', 'images/No-Bake-Vegan-Cheesecake-Cups-9-1730600880483.jpg', '2024-11-03 02:28:00', '3');
INSERT INTO "main"."Image" ("id", "URL", "upload_time", "article_id") VALUES ('5', 'images/One-Pot Chicken Curry-1730600880487.jpg', '2024-11-03 02:28:00', '8');
INSERT INTO "main"."Image" ("id", "URL", "upload_time", "article_id") VALUES ('6', 'images/Quick and Easy Avocado Toast-1730600880488.jpg', '2024-11-03 02:28:00', '7');
INSERT INTO "main"."Image" ("id", "URL", "upload_time", "article_id") VALUES ('7', 'images/Refreshing Watermelon Salad-1730600880491.jpg', '2024-11-03 02:28:00', '9');
INSERT INTO "main"."Image" ("id", "URL", "upload_time", "article_id") VALUES ('9', 'images/Garlic Butter Shrimp Pasta-1730600880479.jpg', '2024-11-03 02:28:00', '11');
INSERT INTO "main"."Image" ("id", "URL", "upload_time", "article_id") VALUES ('10', 'images/Classic Spaghetti Carbonara-1730600880463.jpg', '2024-11-03 02:28:00', '6');
INSERT INTO "main"."Image" ("id", "URL", "upload_time", "article_id") VALUES ('11', 'images/Creamy-Vegan-Chocolate-Milkshake-17-1730600880464.jpg', '2024-11-03 02:28:00', '2');
INSERT INTO "main"."Image" ("id", "URL", "upload_time", "article_id") VALUES ('14', 'images/Baked Chocolate Chip Oatmeal Bars-1730609282544.jpg', '2024-11-03 04:48:02', '10');
INSERT INTO "main"."Image" ("id", "URL", "upload_time", "article_id") VALUES ('15', 'images/Gujarati-thali-4-1730609313960.jpg', '2024-11-03 04:48:33', '12');
INSERT INTO "main"."Image" ("id", "URL", "upload_time", "article_id") VALUES ('18', 'images/sugar-cookie-bars-with-frosting-and-sprinkles-1025x1536-1730623411583.jpg', '2024-11-03 08:43:31', '1');
