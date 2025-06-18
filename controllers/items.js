import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const dataPath = path.resolve('data/itemsData.json');

// Load data from file
const loadItems = () => {
  try {
    const rawData = fs.readFileSync(dataPath);
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Failed to load items:', error);
    return [];
  }
};

// Save updated data to file
const saveItems = (items) => {
  fs.writeFileSync(dataPath, JSON.stringify(items, null, 2), 'utf-8');
};

export const getItems = (req, res) => {
  const { firstName, lastName, description } = req.query;
  let items = loadItems();

  if (firstName) {
    items = items.filter(item =>
      item.firstName.toLowerCase().includes(firstName.toLowerCase())
    );
  }

  if (lastName) {
    items = items.filter(item =>
      item.lastName.toLowerCase().includes(lastName.toLowerCase())
    );
  }

  if (description) {
    items = items.filter(item =>
      item.description.toLowerCase().includes(description.toLowerCase())
    );
  }

  res.json(items);
};

export const createItem = (req, res) => {
  const items = loadItems();
  const { firstName, lastName, description } = req.body;
  const newItem = { id: uuidv4(), firstName, lastName, description };

  items.push(newItem);
  saveItems(items);

  res.status(201).json({ message: 'Item added successfully', newItem });
  console.log(`Item ${newItem.firstName} added successfully`);
};

export const getItem = (req, res) => {
  const items = loadItems();
  const { id } = req.params;
  const foundItem = items.find(item => item.id === id);

  if (!foundItem) {
    return res.status(404).json({ message: `Item with ID ${id} not found` });
  }

  res.json(foundItem);
};

export const putItem = (req, res) => {
  const items = loadItems();
  const { id } = req.params;
  const { firstName, lastName, description } = req.body;
  const item = items.find(item => item.id === id);

  if (!item) {
    return res.status(404).json({ message: `Item with ID ${id} not found` });
  }

  if (firstName) item.firstName = firstName;
  if (lastName) item.lastName = lastName;
  if (description) item.description = description;

  saveItems(items);
  res.json({ message: `Item ${id} updated`, item });
};

export const deleteItem = (req, res) => {
  let items = loadItems();
  const { id } = req.params;
  const index = items.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `Item with ID ${id} not found` });
  }

  const deletedItem = items.splice(index, 1);
  saveItems(items);

  res.json({ message: `Item with ID ${id} deleted`, deletedItem });
};
