/**
 * CareerSync Capstone Project
 * 
 * @module Backend/Models/CompanyProfile
 * @description Mongoose schema for CompanyProfile functionality in the MERN stack.
 */
const mongoose = require('mongoose');

const CompanyProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    companyName: {
        type: String,
        required: true
    },
    industryDomain: String,
    website: String,
    description: String,
    contactEmail: String,
    locations: [String],
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('CompanyProfile', CompanyProfileSchema);
