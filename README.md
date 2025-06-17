# Express.js Application

A basic Express.js application that includes:
 - A root URL that returns a custom-styled `"Hello World!"` message
 - A `/users` API with full CRUD functionality
 - Middleware for parsing JSON
 - Proper error handling for unknown routes and bad requests
 - Input validation using `express-validator`

## Features
- Create, Read, Update, Delete (CRUD) operations for user records
- Input validation for new user creation
- In-memory data store with UUID for unique user IDs
- JSON parsing middleware
- Clean error responses (400, 404, 500)

## Project Structure
.
├── controllers/
│   └── users.js
├── data/
│   └── users.js
├── routes/
│   └── users.js
├── index.js
├── assets/
│   ├── Hello-World!.png
│   └── example-postman-API-request.png
└── README.md

## Example Usage
`
<!-- index.js -->
```js
   // index.js
import express from "express";
import usersRoutes from './routes/users.js';

const app = express();  
const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => res.send(`
   <h1 style='color: #ff0000; text-align: center'>
      Hello World!
   </h1>
`));

app.use('/', usersRoutes);
```

<!-- routes/users.js -->
```js
   // routes/users.js
import express from "express";
import { getUsers, createUser, getUser, deleteUser, updateUser } from "../controllers/users.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);

// POST /users with validation
router.post(
  '/',
  [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('description').notEmpty().withMessage('Description is required')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    createUser(req, res);
  }
);
```
`
## screenshot
![root url responding with "Hello World!"](./assets/Hello-World!.png)
![Example of API request using Postman tool](./assets/example-postman-API-request.png)


## Tech Stack
- Node.js
- Express.js
- Postman (for testing)
- UUID
- express-validator

## Author
Akinseloyin Holo
Fellow ID
FE/23/55210926
Cohort 3

