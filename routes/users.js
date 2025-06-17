import express from "express";
import { getUsers, createUser, getUser, deleteUser, updateUser } from "../controllers/users.js";

const router = express.Router();


router.get('/users', getUsers);

router.post('/', createUser);

router.get('/users:id', getUser);

router.delete('/users:id', deleteUser);

router.patch('/users:id', updateUser);
 

export default router;