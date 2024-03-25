const express = require('express');
const sequelize = require('./config/database');
const session = require('express-session');
const authRouter = require('./routes/auth');
const blogRouter = require('./routes/blog');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();

// Setup router
const router = express.Router();

// Import models
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');

// Set up Handlebars.js engine with default layout
const hbs = exphbs.create({ defaultLayout: 'main' });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 600000 }
}));

// Define the home route
router.get('/', async (req, res) => {
  try {
    // Optional: Fetch data from your database here
    // const postData = await Post.findAll({ include: [User] });
    // const posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', { /* pass your data here, e.g., posts: posts */ });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use the router
app.use(router);

app.use('/auth', authRouter);
app.use('/blog', blogRouter);

// Sync models with the database
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Error syncing database:', err);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});