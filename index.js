import express from "express";
import usersRoutes from './routes/users.js';

const app = express();  
const PORT = 5000;

   //middleware
app.use(express.json()); 

  //root URL
app.get('/', (req, res) => res.send(`
      <h1 style='color: #ff0000; text-align: center'>
         Hello World!
      </h>
   `));

app.use('/', usersRoutes);

// handling invalid routes
app.use((req, res) => {
    res.status(404).json({
      message: "Page not found"
    }); 
});

app.use((err, reg, res, next) => {
   console.error(err.stack);
   res.status(err.status || 500).json({
      message: err.message || 'Something went wrong, please try again later'
   });
});

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))