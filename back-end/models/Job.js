const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title: String,
    description: String,
    requirements: String,
    location: String,
    salary: Number,
    openings: Number,
    recruiter: { type: Schema.Types.ObjectId, ref: 'Recruiter', required: true },
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const JobModel = mongoose.model('Job', jobSchema);

class Job {
    constructor(data) {
        this.data = data;
    }

    async save() {
        const job = new JobModel(this.data);
        return await job.save();
    }

    static async findById(jobId) {
        return await JobModel.findById(jobId).populate('recruiter');
    }

    static async deleteById(jobId) {
        return await JobModel.findByIdAndDelete(jobId);
    }

    static async updateJob(jobId, updatedData) {
        return await JobModel.findByIdAndUpdate(jobId, updatedData, { new: true });
    }
}

module.exports = Job;