import express from "express";
import { getItems, createItem, getItem, deleteItem, updateItem } from "../controllers/items.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.get('/Items', getItems);
router.get('/Items/:id', getItem);

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

router.patch('/Items/:id', updateItem);
router.delete('/Items/:id', deleteItem);

export default router;
