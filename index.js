import express from 'express';
import itemsRoutes from './routes/items.js';

const app = express();
const PORT = 5000;

// Parse JSON request bodies
app.use(express.json());

// Handle malformed JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON format' });
  }
  next(err);
});

// Root route
app.get('/', (req, res) => res.send("Hello World!"));

// Routes
app.use('/', itemsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Page not found' });
});

// Global error handler
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong, please try again later'
  });
});

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
