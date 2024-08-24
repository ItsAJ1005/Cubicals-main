const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: String,
        required: true
    },
    location: {
        type: String,
        trim: true
    },
    salary: {
        type: Number,
        required: true
    },
    recruiter: {
        type: Schema.Types.ObjectId,
        ref: 'Recruiter',
        required: true
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
