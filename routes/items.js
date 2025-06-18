import express from 'express';
import { getItems, createItem, getItem, deleteItem, putItem } from '../controllers/items.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.get('/items', getItems);
router.get('/items/:id', getItem);

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
    createItem(req, res);
  }
);

router.patch('/items/:id', putItem);
router.delete('/items/:id', deleteItem);

export default router;
