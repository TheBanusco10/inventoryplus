const express = require('express');
const app = express();

const cors = require('cors');

// Connecting MongoDB
const connectMongoDB = require('./mongodb/connection');
connectMongoDB();

const PORT = 3000;

// General config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Routes
const productsRoute = require('./routes/products');
app.use('/api', productsRoute);

app.get('/', (req, res) => {
    res.send('Connected');
});

app.listen(PORT, () => {
    console.log('Server started on', PORT);
});