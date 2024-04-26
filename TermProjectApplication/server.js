// Setting up express and required middleware
const express = require("express");
const fs = require('fs');
const app = express();
const path = require("path");
const session = require('express-session');
const passport = require('passport');

// Configuring session middleware
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true
}));

// Initializing passport
app.use(passport.initialize());
app.use(passport.session());
// Parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Parsing JSON bodies
app.use(express.json());

// Configuring view engine and static files directory
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Using multer for handling multipart/form-data
const multer = require("multer");
const upload = multer({dest: 'uploads/'});

// app.use(multer().none());

const model = require("./models/admin.model");

app.post('/upload', upload.single('file'), (req, res) => {
  //res.json(req.file);
  const file = req.file;
  fs.readFile(file.path, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading the uploaded file.');
    }

    try {
      // Parse the JSON data
      const items = JSON.parse(data);
      // Now you can process each item
      items.forEach(item => {
        // Call a function to load the item into the database
        model.loadItemToDB(req.session.currentUser.userID, item);
      });

      //res.send('JSON file uploaded and processed successfully.');
    } catch (error) {
      console.error('Error parsing JSON data:', error);
      return res.status(500).send('Error parsing the uploaded JSON file.');
    }
  });
});


// Setting up user routes
const userRouter = require("./routes/user.route");
app.use("/user", userRouter);

// Setting up admin routes
const adminRouter = require("./routes/admin.route");
app.use("/admin", adminRouter);

// Rendering login page on root route
app.get("/", (req, res) => {
  res.render("index", { title: 'Login' });
});

// Starting the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("App listening at http://localhost:" + PORT);
});
