const express = require('express');
const sequelize = require('./config/database');
const session = require('express-session');
const authRouter = require('./routes/auth');
const blogRouter = require('./routes/blog');
const errorHandler = require('./middleware/errorHandler');
const notFoundHandler = require('./middleware/notFoundHandler');

// Import models
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');

const app = express();
app.set('trust proxy', 1);
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 600000 }
}));

app.use('/auth', authRouter);
app.use('/blog', blogRouter); 

// Sync models with the database
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Error syncing database:', err);
});

app.use(errorHandler);
app.use(notFoundHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
