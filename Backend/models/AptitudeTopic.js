const mongoose = require("mongoose");

const aptitudeTopicSchema = new mongoose.Schema({
  category: String,
  topicName: String
});

module.exports = mongoose.model("AptitudeTopic", aptitudeTopicSchema);