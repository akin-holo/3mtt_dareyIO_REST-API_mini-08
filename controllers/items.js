import items from '../data/items.js';
import { v4 as uuidv4 } from 'uuid';

export const getItems = (req, res) => {
  res.json(items);
};

export const createItem = (req, res) => {
  const { firstName, lastName, description } = req.body;
  const newItem = { id: uuidv4(), firstName, lastName, description };
  items.push(newItem);
  res.status(201).json({ message: 'User added successfully', newItem });
};

export const getItem = (req, res) => {
  const { id } = req.params;
  const foundItem = items.find(item => item.id === id);

  if (!foundItem) {
    return res.status(404).json({ message: `User with ID ${id} not found` });
  }

  res.json(foundItem);
};

export const updateItem = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, description } = req.body;
  const item = items.find(item => item.id === id);

  if (!item) {
    return res.status(404).json({ message: `User with ID ${id} not found` });
  }

  if (firstName) item.firstName = firstName;
  if (lastName) item.lastName = lastName;
  if (description) item.description = description;

  res.json({ message: `Item ${id} updated`, item });
};

export const deleteItem = (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(user => user.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `User with ID ${id} not found` });
  }

  const deletedItem = items.splice(index, 1);
  res.json({ message: `User with ID ${id} deleted`, deletedItem });
};
