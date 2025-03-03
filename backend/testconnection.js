const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://ivan:q7InvN55@exam-app.8gu8x.mongodb.net/examDB?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });
