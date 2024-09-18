const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the recruiter schema
const recruiterSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    company: String,
    jobPostings: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
    createdAt: { type: Date, default: Date.now }
});

// Create the Recruiter model
const RecruiterModel = mongoose.model('Recruiter', recruiterSchema);

// Recruiter class to handle recruiter-related operations
class Recruiter {
    constructor(data) {
        this.data = data;
    }

    async save() {
        const recruiter = new RecruiterModel(this.data);
        return await recruiter.save();
    }

    static async findById(recruiterId) {
        return await RecruiterModel.findById(recruiterId).populate('jobPostings');
    }

    static async updateRecruiter(recruiterId, updatedData) {
        return await RecruiterModel.findByIdAndUpdate(recruiterId, updatedData, { new: true });
    }

    static async deleteRecruiter(recruiterId) {
        return await RecruiterModel.findByIdAndDelete(recruiterId);
    }
}

// Exporting the Recruiter model and the Recruiter class
// module.exports = RecruiterModel; // Only export the Mongoose model

module.exports = Recruiter = mongoose.model('recruiter',recruiterSchema)