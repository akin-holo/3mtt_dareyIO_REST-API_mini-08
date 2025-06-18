import express from "express";
import ItemsRoutes from './routes/items.js';
import itemsRoutes from "./routes/items.js";

const app = express();  
const PORT = 5000;

   //middleware
app.use(express.json()); 
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON format' });
  }
  next(err);
});


  //root URL
app.get('/', (req, res) => res.send(`
      <h1 style='color: #ff0000; text-align: center'>
         Hello World!
      </h>
   `));

app.use('/', ItemsRoutes);
app.use('/', itemsRoutes);

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