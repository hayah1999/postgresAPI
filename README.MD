## API with postgres and express

### Set up

- in your terminal
  > npm install
- Server port is
  > 3000
- create two databases one for development and the other for testing in postgres
- Make sure to change the database.json to make it suit your environment variables
- in your terminal to create the tables
  > db-migrate up
- create .env file and fill the variables mentioned bellow

#### Database port

- 5432

### ENVIRONMENT VARIABLES

ENV
POSTGRES_HOST
POSTGRES_DB
POSTGRES_TEST_DB
POSTGRES_USER
POSTGRES_PASSWORD
BCRYPT_PASSWORD
SALT_ROUNDS
TOKEN_SECRET

### Script to run

-- testing

> npm run test

-- Starting server

> npm run start

### To test enpoints

- use postman with endpoints information in REQUIREMENTS.md
