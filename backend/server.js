require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const dreamRoutes = require('./routes/dreamRoutes');

const app = express();

app.use(cors()); // allows cross-origin requests
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/dreams', dreamRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to the db');
    app.listen(process.env.PORT, () => {
      console.log('listening on port ', process.env.PORT);
    });
  })
  .catch((error) => console.log(error));
