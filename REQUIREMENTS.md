# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### mythical_weapons endpoints

 a INDEX method: '/mythical_weapons' [GET]
 a SHOW method: '/mythical_weapons/:id' [GET]
 a CREATE method: '/mythical_weapons' [POST]
 a EDIT method: '/mythical_weapons/:id' [PUT]
 a DELETE method: '/mythical_weapons/:id' [DELETE]

### users endpoints

 a INDEX method: '/users' [GET]
 a AUTHENTICATE method: '/users/authentication' [POST]
 a CREATE method: '/users' [POST]
 a UPDATE method: '/users/:id' [PUT]
 a DELETE method: '/users/:id' [DELETE]

### orders endpoints

 a INDEX method: '/orders' [GET]
 a SHOW method: '/orders/:id' [GET]
 a CREATE method: '/orders' [POST]
 a ADD WEAPON method: '/orders/:id/weapons' [POST]

### Dashboard endpoints

 a WEAPONINORDERS method: '/weapons_in_orders' [GET]
 a USERSWHOORDERS method: '/users_who_orders' [GET]
 a FIVEEXPENSIVEWEAPONS method: '/five_expensive_weapons' [GET]

#### mythical_weapons

- Index
- Show
- Create [token required]
- delete [token required]
- edit [token required]

#### Users

- Index 
- authenticate [token required]
- Create [token required]
- update [token required]
- delete [token required] 

#### Orders

- Index
- Show
- Create 
- delete
- edit
- add weapon 

## Data Shapes

#### mythical_weapons

- id 
- name
- type
- weight
-price 


#### User

- id
- username
- password

#### Orders

- id
- user_id (foreign key to users table id)
- status of order (open or close)

#### orders_weapons

- id
- order_id (foreign key to orders id) of each order
- weapon_id  (foreign key to mythical_weapons id)of each weapon in the order
- quantity of each weapon in the order

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