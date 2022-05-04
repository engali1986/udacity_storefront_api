# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index  http://localhost:3000/api/products/           [get request]  list all products
- Show    http://localhost:3000/api/products/find/:id   [get request]  find product by ID
- Create [token required]  http://localhost:3000/api/products/create     [post request] create product
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]  http://localhost:3000/api/users/           [get request]  list all users
- Show [token required]    http://localhost:3000/api/users/finduser/:id   [get request]  find user by ID
- Create N[token required] http://localhost:3000/api/users/create     [post request] create user
- Create Admin user        http://localhost:3000/api/users/create/admin    [post request] create user

#### Orders
- Current Order by user (args: user id)[token required] http://localhost:3000/api/orderd/find/:id  [get request]  find orderd products by user ID
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id SERIAL PRIMARY KEY
- name VARCHAR (250)
- price INTEGER
- [OPTIONAL] category

#### User
- id SERIAL PRIMARY KEY
- firstName VARCHAR(250)
- lastName VARCHAR(250)
- password VARCHAR(250)

#### Orders
id SERIAL PRIMARY KEY,
    p_id INTEGER ,
    FOREIGN KEY (p_id) REFERENCES products(id),
    qty INTEGER NOT NULL,
    u_id INTEGER ,
    FOREIGN KEY (u_id) REFERENCES users(id),
    o_status VARCHAR(100) NOT NULL

#### order_products 

 id SERIAL PRIMARY KEY,
    u_id INTEGER,
    p_id INTEGER,
    qty INTEGER,
    FOREIGN KEY (p_id) REFERENCES products(id),
    FOREIGN KEY (u_id) REFERENCES users(id)