require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/books");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB is Connected: ${conn.connect.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

app.get("/", (req, res) => {
  res.send({ title: "Test root access" });
});

app.get("/add-note", async (req, res) => {
  try {
    await Book.insertMany([
      {
        title: "ABC",
        body: "This is test for the ABC",
      },
      {
        title: "XYZ",
        body: "XYZ, this is the test for that",
      },
    ]);
    res.send("Data added");
  } catch (err) {
    console.log("error", err);
  }
});

app.get("/books", async (req, res) => {
  const book = await Book.find();

  if (book) {
    res.json(book);
  } else {
    res.send("API Failure, something is wrong");
  }
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
  });
});
