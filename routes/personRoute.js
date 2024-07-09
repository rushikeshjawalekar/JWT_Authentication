const express = require("express");
const colors = require("../index");
const router = express.Router();
const Person = require("../userSchema/userSchema");
const { jwtAuthMiddleware, generateToken } = require("../jwtAuthentication");

// signup
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("Data saved To Database Succesfully".green);
    const payload = {
      id: response.id,
      username: response.username,
    };
    const token = generateToken(payload);
    console.log("Token Is :", token);
    res.status(201).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal Server Error".red });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Person.findOne({ username: username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid Username or Password" });
    }
    const payload = {
      id: user.id,
      username: user.username,
    };
    const Token = generateToken(payload);
    res.json({ Token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Error!" });
  }
});

router.get("/info", jwtAuthMiddleware, async (req, res) => {
  try {
    const response = await Person.find();
    console.log("Data fetched".green);
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal Server Error".red });
  }
});
router.put(":/id", async (req, res) => {
  try {
    const getId = req.params.id;
    const updatedinfo = req.body;
    const response = await Person.findOnebyidAndUpdate(getId, updatedinfo, {
      runValidator: true,
      new: true,
    });
    if (!response) {
      return res.status(400).json({ Error: "Cannot Find Person" });
    }
    console.log("Data Updated Succesfully".green);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal Server Error".red });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const getId = req.params.id;
    const response = await Person.findByIdAndDelete(getId);
    if (!response) {
      return res.status(400).json({ Error: "Cannot Find Person" });
    }
    console.log("Data Deleted From the Database!".rainbow);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Error!" });
  }
});

module.exports = router;
