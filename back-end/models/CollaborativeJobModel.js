const mongoose = require('mongoose');

const collaborativeJobSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    jobDescription: { type: String, required: true },
    companies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter' }], 
    collaborationRequests: [{
        requester: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter' },
        status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' } 
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CollaborativeJob', collaborativeJobSchema);
