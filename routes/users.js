import express from "express";
import { getUsers, createUser, getUser, deleteUser, updateUser } from "../controllers/users.js";

const router = express.Router();

   //GET/items - Retrieve all items
router.get('/users', getUsers);

   //GET/items/:id - Retrieve a single item by ID
 router.get('/users/:id', getUser);

  //POST/items - Create a new item
router.post('/', createUser);

 //PUT/items/:id - Update an item by ID
router.patch('/users/:id', updateUser);

 //DELETE/items/:id - Retrieve a single item by ID
router.delete('/users/:id', deleteUser);

export default router;