import { v4 as uuidv4 } from "uuid";

// simple in-memory data store
let users = [];

export const getUsers = (req, res) => {
   res.send(users);
}

export const createUser = (req, res) => {
   const user = req.body;
   users.push({ ...user, id: uuidv4() });
   res.send(`User with the name ${user.firstName} is addes to the database`);
}

export const getUser = (req, res) => {
   const { id } = req.params;
   const foundUser = users.find((user) => user.id === id);

   if (!foundUser) {
      return res.status(404).json({
         message: `User with ID ${id} not found`
      });
   }
   res.send(foundUser);
}

export const updateUser = (req, res) => {
   const { id } = req.params;
   const {firstName, lastName, age} = req.body;
   const user = users.find((user) => user.id === id);

   if (!user) {
         return res.status(404).json({ message: `User with ID ${id} not found` });
   }

   if(firstName)user.firstName = firstName;
   if(lastName) user.lastName = lastName
   if(age) user.age = age;

   res.send(`User ${id} data updated`);
}

export const deleteUser = (req, res) => {
   const { id } = req.params;
   users = users.filter((user) => user.id !== id);

   if (!users) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
   }
   res.send(`User with the id ${id} has been deleted`);
}