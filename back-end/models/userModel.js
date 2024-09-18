const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["jobSeeker", "recruiter", "admin"],
    default: "jobSeeker",
  },
  jobApplications: [
    {
      jobId: { type: Schema.Types.ObjectId, ref: "Job" },
      appliedAt: { type: Date, default: Date.now },
    },
  ],
  savedJobs: [{ jobId: { type: Schema.Types.ObjectId, ref: "Job" } }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("User", UserSchema);

class User {
  constructor(data) {
    this.data = data;
  }

  async save() {
    const user = new UserModel(this.data);
    return await user.save();
  }

  static async findById(userId) {
    return await UserModel.findById(userId).populate(
      "jobApplications.jobId savedJobs.jobId"
    );
  }

  static async updateUser(userId, updatedData) {
    return await UserModel.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
  }

  static async deleteUser(userId) {
    return await UserModel.findByIdAndDelete(userId);
  }
}

module.exports = User = mongoose.model('user', UserSchema)
