# capstone2
Link to live https://bloominspring.onrender.com/

Capstone 2
Tech stack 

React will be used for the front-end development of my project and  NodeJS for the backend. This app is designed to be a web-based application. 
Project Focus:
The goal is to focus on full-stack development of both the front-end and back-end. 
Project type
This app will be web-based which is for both website and mobile app.
Project goal
This e-commerce is to allow users to shop, and view the ingredients of each product. Its features include user authentication,  shopping cart functionality, and secure online payment processing. 
User Demographics
The target users will be people who have sensitive or people who passionate about skincare
Data usage 
Product data, user data, and transaction data. The product data will be fetched data from internal  APIs (which is hardcoding)into the database system, while user data will be collected from the user register and login form. Transaction data will be created when purchases are made. 

Project Approach 
There will be three tables for the database: users, products, and transactions. The users’ table consists of the users’ id, username email, and password. The products table consists of the id, brand, name, image, and ingredients. 
Schema 
Product table:

id
Brand 
name
image
ingredients


Users table:

id
username
email
password


Transaction table:

id
user_id
product_id
qty
total_price


Potential API issues:
		There’s a possibility to run into handling RESTful
Secure information:
Users’ passwords will be hashed and stored in salted format. 
App functionality:
register/login/logout, add items to your favorite list, and check out
The individual product can be viewed and added to a cart; checkout and proceed securely online payments 
User flow:
Users need to register/log in to their account; then they can access browsing products, and add products to the cart (the cart will show the current total rice)

