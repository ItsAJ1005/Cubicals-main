const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["jobSeeker", "employer", "admin"],
    default: "jobSeeker",
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  profilePicture: {
    type: String,
  },
  resume: {
    type: String,
  },
  jobApplications: [
    {
      jobId: {
        type: Schema.Types.ObjectId,
        ref: "Job",
      },
      appliedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  savedJobs: [
    {
      jobId: {
        type: Schema.Types.ObjectId,
        ref: "Job",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updatedAt` on save
UserSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
