const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");


// POST contact message
router.post("/", async (req, res) => {

try{

const { name, email, message } = req.body;

const newContact = new Contact({
name,
email,
message
});

await newContact.save();

res.json({
message: "Message sent successfully ✅"
});

}
catch(error){

console.log(error);

res.status(500).json({
message: "Server error"
});

}

});

module.exports = router;