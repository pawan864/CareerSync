const mongoose = require('mongoose');

const StudentProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    personalInfo: {
        phone: String,
        address: String,
        portfolioUrl: String,
        githubUrl: String,
        linkedinUrl: String
    },
    academicInfo: {
        college: String,
        department: String,
        semester: Number,
        graduationYear: Number,
        cgpa: Number
    },
    skills: [{
        name: {
            type: String,
            required: true
        },
        level: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
            default: 'Beginner'
        },
        category: {
            type: String,
            enum: ['Technical', 'Soft', 'Domain'],
            default: 'Technical'
        }
    }],
    certifications: [{
        title: String,
        issuer: String,
        dateIssued: Date,
        credentialId: String,
        url: String
    }],
    projects: [{
        title: String,
        description: String,
        technologiesUsed: [String],
        githubUrl: String,
        liveUrl: String
    }],
    careerInterests: {
        targetRoles: [String],
        preferredLocations: [String],
        willingToRelocate: Boolean
    }
}, { timestamps: true });

module.exports = mongoose.model('StudentProfile', StudentProfileSchema);
