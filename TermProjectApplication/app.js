const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const passport = require('passport');
const session = require('express-session');

app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true
  }));

app.use(passport.initialize());
app.use(passport.session());


app.use(cors());
app.use(bodyParser.json());

const authRoutes = require('./routes/userAuthRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

app.use('/auth', authRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);

app.get('/login', async (req, res) => {
    res.redirect('http://127.0.0.1:3000/public/login.html');
 });
 
// Start the server
app.listen(3000, function() {
    console.log('SipNSnuggles Server listening on port 3000!');
});
