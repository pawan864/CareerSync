const mongoose = require('mongoose');

const IndustryRoleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    industry: String, // e.g., 'IT', 'Finance'
    requiredSkills: [{
        name: String,
        level: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
        }
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // TPO or Admin or Industry
    }
}, { timestamps: true });

module.exports = mongoose.model('IndustryRole', IndustryRoleSchema);
