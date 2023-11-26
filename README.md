# Definitions of the different folders
1. controllers: contains the business logic of the entire applications - e.g. how do a user add another user
2. routes - contains the different api pathways - e.g. /api/adduser, /api/deleteuser, /api/updateuser
3. .env - contains the environment variables for the application such as the username and password for the databases and other important things that you do not want to be public
4. Repository contains all the functions necessary to interact with the database. If you want something from the database use this.


# Understanding Prisma
prisma client - generated library/ connector to interact with the database without having to write any SQL code. It is a type safe ORM. It is a layer between the database and the application.
generator in the schema.prisma file - generates the library to interact with the database
model - defines how an object looks
migration script (created when running npx) - generate the necessary sql query to update any changes in the database
datasource - defines the database connection and credentials

# Prisma rules
datasource - max 1
generator - infinite
model - infinite
    field - infinite

If you encounter a foreign key constraint you will need to either get the userPreference with the same key and delete
or swap the foreign key to the user model

When updating, it has to be a unique field on findOne operation or else it will throw an error
If you want to get the nested object, you will need to use the 'include' keyword

# Changes in the prisma model object
1. when a field is added and you want to update the DB, Run "npx prisma migrate dev --name init" to generate the migration script and deploy it to make a change



# SQL relationships
1. One to one - one user has one profile
2. One to many - one user has many reviews
3. Many to many - one user has many reviews and one post has many reviews

# Postgres Database
1. Please download postgres, the settings don't matter but the port and password matters alot, keep a record of it. Do not need to download the stack builder
2. Change the value of the DATABASE_URL in the .env file according to the information when you download postgres
3. username if not otherwise state is "postgres" without the quotes
4. password is the password you added when you downloaded postgres
5. port is the port you added when you downloaded postgres
6. Template: "postgresql://postgres:<Password here>@localhost:5432/<name of database here>"

# Mongodb
1. Create a database, the change the value of the MONGODB_URL in the .env file
2. For settings please just use the default settings
3. Template: "mongodb://localhost:27017/<name of database here>"
4. As for the localhost, the port depends on what is shown on mongoDB compass

# How to run the application
1. Run "npm install" first to install all the dependencies (only need to run one time after git clone)
2. Run "npm run dev" to start the application (need to run everytime you want to start the application)
3. The server is running if it says "Server is running on port XXXX" in the terminal & "mongodb is connected"
4. The server is configure for 8080, if you want to change it, change it in the .env file
5. If you want to point the frontend to localhost8080, go to api folder under axios and change the baseURL to localhost8080
6. For the entire application to work, open 2 ides for frontend and backend and run npm run dev for both
