1- install dependencies (npm install bcrypt dotenv express express-rate-limit helmet jsonwebtoken morgan nodemon pg ) and global dependencies (npm install -g db-migrate, npm install -g db-migrate-pg  )
2- install dev dependencies ( npm install --save-dev eslint typescript prettier jasamine jasamine-spec-reporter ts-node supertest @types/node @types/express @types/jasmine @types/bcrypt @types/jsonwebtoken @types/morgan @types/pg @types/supertest)
3- initiate typescript and eslint ( npx tsc --init    npx eslint --init)

4- in src folder create database folder then create index.ts to host database connection pool
   with following connection parameters:
   host: process.env.host,
  database: process.env.postgres_db_dev,
  user: process.env.postgres_user,
  password: process.env.postgres_pass,
  port: parseInt(process.env.postgres_port as string, 10),
  default postgres port is 5432



To create database

1- open new terminal 
2- type psql pstgres postgres
3- type password for default postgres user
4- create new superuser => CREATE ROLE username WITH LOGIN SUPERUSER PASSWORD 'password';
5- create new database => CREATE DATABASE dbname;

install db-migrate ( npm install -g db-migrate), db-migrate-pg( npm install db-migrate-pg)

run npx db-migrate create users --sql-file in terminal to create users migration files up and down use same command to create products and orders 




TO USE THIS API
1- For orders 
   http://localhost:3000/api/orders/create     [post request] create order
   http://localhost:3000/api/orders/           [get request]  list all orders
   http://localhost:3000/api/orders/find/:id   [get request]  find order by ID
   http://localhost:3000/api/orders/delete/:id [post request] delete order by ID
2- For products
   http://localhost:3000/api/products/create     [post request] create product
   http://localhost:3000/api/products/           [get request]  list all products
   http://localhost:3000/api/products/find/:id   [get request]  find product by ID
   http://localhost:3000/api/products/delete/:id [post request] delete product by ID
3- For users
   http://localhost:3000/api/users/create     [post request] create user (
      pass the following parameters in request body as json object 
      {
         "first_name":"",
         "last_name":"",
         "pass":""
      }
   )
   http://localhost:3000/api/users/           [get request]  list all users 
   http://localhost:3000/api/users/finduser/:id   [get request]  find user by ID
   http://localhost:3000/api/users/updateuser [post request]  update user (
      pass the following parameters in request body as json object 
      {
         "first_name":"",
         "last_name":"",
         "pass":""
      }
   http://localhost:3000/api/users/delete/:id [post request] delete user by ID

   4-order_products
   
   http://localhost:3000/api/ordered/           [get request]  list all ordered products
   http://localhost:3000/api/ordered/find/:id   [get request]  find order_products by user ID
   http://localhost:3000/api/ordered/delete/:id [post request] delete order_products by user ID


   all variables for database connection and token secret are in .env file

   database pool connection is in src/database/index file

   to run the api open new terminal then use npm run start command
   to test API open new terminal and type npm run test

   create admin user with token as folllow
   http://localhost/api/users/create/admin post request

   I used the following enviromental variables which i included in .env file
    PORT=3000
    NODE_ENV=dev
    POSTGRES_HOST=localhost
    POSTGRES_PORT=5432
    POSTGRES_DB_DEV=store_dev
    POSTGRES_DB_TEST=store_test
    POSTGRES_USER=ali
    POSTGRES_PASS=123456
    BCRYPT_PASS=admin
    SALT_ROUNDS=10
    TOKEN_SECRET=my_secret

   