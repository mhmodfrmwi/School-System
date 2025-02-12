const mongoose = require("mongoose");
const libraryItemSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  item_url: {
    type: String,
    required: true,
  },
});

const LibraryItem = mongoose.model("LibraryItem", libraryItemSchema);

module.exports = LibraryItem;
