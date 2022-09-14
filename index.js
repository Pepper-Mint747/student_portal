import express from "express";
import paginate from "express-paginate";
import passport from "passport";

import { connect } from "mongoose";
import { config } from "dotenv";
import cors from "cors";

config();
const app = express();

//==================================Middlewares================================
app.use(passport.initialize());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(paginate.middleware(process.env.LIMIT, process.env.MAX_LIMIT));

//==================================MongoDB Connection=========================
const mongoURI = process.env.MONGO_URI;
connect(mongoURI, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log(`Connection to MongoDB was successful`);
});

//==============================Server Endpoints===============================

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
