import users from '../data/users.js';
import { v4 as uuidv4 } from 'uuid';

export const getUsers = (req, res) => {
  res.json(users);
};

export const createUser = (req, res) => {
  const { firstName, lastName, description } = req.body;
  const newUser = { id: uuidv4(), firstName, lastName, description };
  users.push(newUser);
  res.status(201).json({ message: 'User added successfully', newUser });
};

export const getUser = (req, res) => {
  const { id } = req.params;
  const foundUser = users.find(user => user.id === id);

  if (!foundUser) {
    return res.status(404).json({ message: `User with ID ${id} not found` });
  }

  res.json(foundUser);
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, description } = req.body;
  const user = users.find(user => user.id === id);

  if (!user) {
    return res.status(404).json({ message: `User with ID ${id} not found` });
  }

  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (description) user.description = description;

  res.json({ message: `User ${id} updated`, user });
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(user => user.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `User with ID ${id} not found` });
  }

  const deletedUser = users.splice(index, 1);
  res.json({ message: `User with ID ${id} deleted`, deletedUser });
};
