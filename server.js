require("dotenv").config();
const express = require("express");
const workoutRouter = require("./routes/workouts");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const cors = require("cors");

//express app
const app = express();

const port = process.env.PORT;

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB & listening at port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//middleware

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//endpoints
app.use("/api/workouts", workoutRouter);
app.use("/api/user", userRoutes);

//listen to requests
