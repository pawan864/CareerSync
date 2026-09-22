const mongoose = require('mongoose');

const OpportunitySchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyProfile',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Internship', 'Placement', 'Project'],
        required: true
    },
    description: String,
    location: String,
    workMode: {
        type: String,
        enum: ['On-site', 'Hybrid', 'Remote'],
        default: 'On-site'
    },
    stipendOrSalary: String,
    duration: String, // e.g., "6 months"
    requiredSkills: [{
        name: String,
        level: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
        }
    }],
    eligibilityCriteria: {
        minCgpa: Number,
        branches: [String],
        gradYear: [Number]
    },
    status: {
        type: String,
        enum: ['Open', 'Closed'],
        default: 'Open'
    }
}, { timestamps: true });

module.exports = mongoose.model('Opportunity', OpportunitySchema);
