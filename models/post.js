const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  userId: {
    type: Schema.Types.ObjecId,
    ref: "User"
  },
  cityId: {
    type: Schema.Types.ObjectId,
    ref: "City"
  },
  title: String,
  body: String,
  imageUrl: String,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
