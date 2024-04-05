const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const authRoutes = require('./routes/userAuthRoutes');
const productRoutes = require('./routes/productDataRoutes');

app.use('/auth', authRoutes);
app.use('/product', productRoutes);

// Start the server
app.listen(3000, function() {
    console.log('SipNSnuggles Server listening on port 3000!');
});
