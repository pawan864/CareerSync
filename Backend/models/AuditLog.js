/**
 * CareerSync Capstone Project
 * 
 * @module Backend/Models/AuditLog
 * @description Mongoose schema for AuditLog functionality in the MERN stack.
 */
const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    action: {
        type: String,
        enum: ['LOGIN', 'LOGOUT'],
        required: true
    },
    localTime: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('AuditLog', AuditLogSchema);
