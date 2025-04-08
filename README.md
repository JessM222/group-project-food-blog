HAPPY HIPPOS 
Team members:
Jess Miao (Yimeng Miao), Neha Prakash, Rahul Nayak, Sapna Sapna, Xyla Trinh

A brief introduction to your webapp
In this project, we created a website for a food blog by using interactive frontends using technologies like javascript/svelte/css and fast well structured backends using node.js. We have connected our frontends and backends using fetch() requests to our database using SQLite.
We have different pages on our blog website including, home, about us, recipes, login, logout and manage account. 

A description of the extent to which your team has completed the compulsory Features

All of the compulsory features have been delivered. 
Users can create, update and delete accounts.
Users can browse a list of articles without logging in and they can additionally browse a list of articles created by them after logging in.
Once logged in, users can create and post new recipes on the website.
QuillJS has been used as a WYSIWYG editor for creating recipes along with uploading multiple images and Multer as a middleware to handle and process images from the backend.
Bcrypt has been used for hashing user account passwords.

A description of the extra features your team has implemented

A custom middleware for logging all requests to the server has been added. This middleware will create a file in the directory and save all requests to it.
Responsive design for the website. 
Animated pop up notification after login and logout.
Recipe Article Views: Only registered users that aren’t the author of a recipe can have their view counted. Views can’t be undone and won’t be deleted if a user deletes his account.
Interactions (Like and Bookmark): similar to View, interactions can only be made by registered non-author users. They, however, can be undone and will be deleted if a user deletes his account.
Comments: all registered users can comment. Comments will be deleted if a user deletes his account.
Categories filter and search bar (by keywords).
Recent activity page on the Home page: 2 latest posted recipes, 3 latest Interactions (Like and Bookmark).

Instructions on what the database file (*.db file) should be named
The naming of the db file remains the same as the one in the project template i.e. project-database.db


Does the marker need to do anything prior to running your webapp, other than npm install?
No they don’t. Npm install should be sufficient to run our web app.


Does the marker need to do anything special to run your webapp, other than
running npm start?
No they don’t. Npm run dev should be sufficient to run our web app.


At least one username / password combination for an existing user in your system with some already-published articles
Username: MasterChef
Password: password123


Any other instructions / comments you wish to make to your markers.


![](./backend/public/images/Happy%20Hippos.webp)
