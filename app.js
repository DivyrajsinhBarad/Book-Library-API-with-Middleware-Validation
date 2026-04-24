const express = require('express');
const app = express();

const logger = require('./middleware/logger');
const auth = require('./middleware/auth');

app.use(express.json());

// middleware order
app.use(logger);
app.use(auth);

const bookRoutes = require('./routes/books');
app.use('/books', bookRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
