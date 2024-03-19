const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');
const session = require('express-session');
const app = express();

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 600000 }
  }));

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
