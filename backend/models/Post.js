const mongoose = require("mongoose");
let slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
//!POST SCHEMA
const PostSchema = mongoose.Schema({
  // author: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true
  // },
  title: { type: String, required: true },
  slug: { type: String, slug: "title", unique: true },
  subtitle: { type: String, required: true },
  content: { type: String, required: true },
  date: { default: Date.now, type: Date },
});

module.exports = mongoose.model("Post", PostSchema);
