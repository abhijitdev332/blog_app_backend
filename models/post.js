import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [10, "Title must be at least 10 characters long"],
      maxlength: [100, "Title must not exceed 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [30, "Content must be at least 20 characters long"],
    },
    imageUrl: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference to the User model
      required: [true, "Author is required"],
    },
    tags: {
      type: [String],
      validate: {
        validator: function (tags) {
          return tags.length <= 4; // Maximum 10 tags
        },
        message: "A maximum of 4 tags is allowed",
      },
      default: [],
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft", // Default status
    },
    publishedAt: {
      type: Date,
      default: null, // Populated only when status is "published"
    },
    likes: {
      type: Number,
      default: 0,
      min: [0, "Likes cannot be negative"],
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        text: {
          type: String,
          required: [true, "Comment text is required"],
          minlength: [3, "Comment text must not be empty"],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);
PostSchema.statics.findPublished = function () {
  return this.find({ status: "published" });
};
PostSchema.methods.updatePublish = function () {
  if (this.status == "published" && !this.publishedAt) {
    this.publishedAt = Date.now();
    return this.save();
  }
};
PostSchema.statics.getRelatedPosts = async function (postId, limit = 5) {
  try {
    // Find the current post by ID
    const currentPost = await this.findById(postId);
    if (!currentPost) {
      throw new Error("Post not found");
    }
    // Query for posts that share at least one tag with the current post, excluding the current post itself
    const relatedPosts = await this.find({
      _id: { $ne: currentPost._id }, // Exclude the current post
      tags: { $in: currentPost.tags }, // Find posts with overlapping tags
    })
      .limit(limit) // Limit the number of results
      .sort({ createdAt: -1 }); // Sort by most recent

    return relatedPosts;
  } catch (error) {
    throw error;
  }
};
// Instance method to add a like
PostSchema.methods.addLike = function () {
  this.likes += 1;
  return this.save();
};

export const postModal = mongoose.model("post", PostSchema);
