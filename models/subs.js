const mongoose = require("mongoose");
const { Schema } = mongoose;

const SubSchema = new Schema({
  auth: { type: String, required: true },
  subObject: { type: Object, required: true }
});

module.exports = mongoose.model("subs", SubSchema);
