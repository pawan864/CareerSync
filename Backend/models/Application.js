const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentProfile',
        required: true
    },
    opportunity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Opportunity',
        required: true
    },
    status: {
        type: String,
        enum: ['Applied', 'Shortlisted', 'Interview', 'Selected', 'Not Selected'],
        default: 'Applied'
    },
    resumeUrl: String,
    matchScore: Number // Pre-calculated skill match percentage
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);
