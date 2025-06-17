# Express.js application

A basic express.js application with a defined root URL that return `Hello World!`, error handling for invalid `routes` along with messages.

## Features
- CRUD performance

## Example 
`
index.js

```js
   import express from "express";
   import usersRoutes from './routes/users.js';

   const app = express();  
   const PORT = 5000;

   //middleware
   app.use(express.json()); 

  //root URL
   app.get('/', (req, res) => res.send(`
         <h1 style='color: #ff0000; text-align: center'>
            Hello World!
         </h>
      `));
```

routes/users.js
```js
   import express from "express";
   import { getUsers, createUser, getUser, deleteUser, updateUser } from "../controllers/users.js";

const router = express.Router();
   //GET/items - Retrieve all items
router.get('/users', getUsers);
   //GET/items/:id - Retrieve a single item by ID
 router.get('/users/:id', getUser);
```
`
## Getting Started

1. unzip the folder  
2. Install dependencies:  
   `npm install`  
3. Start the server:  
   `npm start`  
4. Open browser at:  
   `http://localhost:5000`

## Tech Stack
- Express
- Postman

## Author
Akinseloyin Holo
Fellow ID
FE/23/55210926
Cohort 3
