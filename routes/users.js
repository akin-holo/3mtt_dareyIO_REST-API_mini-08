import express from "express";
import { getUsers, createUser, getUser, deleteUser, updateUser } from "../controllers/users.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);

//  PUT with validation middleware
router.post(
  '/',
  [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('description').notEmpty().withMessage('Description is required')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If errors, respond with 400 and the details
      return res.status(400).json({ errors: errors.array() });
    }
    createUser(req, res);
  }
);

router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
