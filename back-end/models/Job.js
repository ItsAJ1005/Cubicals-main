const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title: String,
    description: String,
    requirements: String,
    location: String,
    salary: Number,
    openings: Number,
    recruiter: { type: Schema.Types.ObjectId, ref: "Recruiter", required: true },
    status: { type: String, enum: ["open", "closed"], default: "open" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const JobModel = mongoose.model("Job", jobSchema);

class Job {
    constructor(data) {
        this.data = data;
    }

    async save() {
        const job = new JobModel(this.data);
        return await job.save();
    }

    static async findById(jobId) {
        return await JobModel.findById(jobId).populate("recruiter");
    }

    static async deleteById(jobId) {
        return await JobModel.findByIdAndDelete(jobId);
    }

    static async updateJob(jobId, updatedData) {
        return await JobModel.findByIdAndUpdate(jobId, updatedData, { new: true });
    }
    static async find(query = {}) {
        return await JobModel.find(query).populate("recruiter");
    }

    static async findOne(query) {
        return await JobModel.findOne(query);
    }

    static async getDistinctField(fieldName) {
        try {
            const distinctValues = await JobModel.distinct(fieldName);
            return distinctValues;
        } catch (error) {
            console.error("Error fetching distinct values:", error);
            throw new Error("Error fetching distinct values");
        }
    }
    static async findByIdAndDelete(jobId) {
        try {
            const deletedJob = await JobModel.findByIdAndDelete(jobId);
            if (!deletedJob) {
                throw new Error("Job not found");
            }
            return deletedJob;
        } catch (error) {
            console.error("Error deleting job:", error);
            throw new Error("Error deleting job");
        }
    }

    static async deleteMany(criteria) {
        try {
            const result = await JobModel.deleteMany(criteria);
            return result; // Returns information about the deletion operation
        } catch (error) {
            console.error("Error deleting jobs:", error);
            throw new Error("Error deleting jobs");
        }
    }
}

module.exports = Job;