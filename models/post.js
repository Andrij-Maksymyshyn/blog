const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true,
      unique: true
    },
    date: { type: Date, default: Date.now },
    tags: {
      type: Array,
      default: []
    },
    viewsCount: {
      type: Number,
      default: 0
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    imageUrl: String
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

postSchema.pre(/^find/, function () {
  this.populate("user");
});

const Post = mongoose.model("Post", postSchema);

module.exports = {
  Post
};
