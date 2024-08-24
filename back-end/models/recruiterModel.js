const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recruiterSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role :{
        type: String,
        default : "recruiter"
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    companyWebsite: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    jobPostings: [{
        type: Schema.Types.ObjectId,
        ref: 'Job'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);

module.exports = Recruiter;
