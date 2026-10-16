const mongoose = require('mongoose');

/**
 * CareerSync Capstone Project
 * 
 * @module Backend/Models/ModerationReport
 * @description Mongoose schema for real-time Content Moderation reports and incident handling.
 */
const ModerationReportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide an incident title'],
        trim: true
    },
    targetType: {
        type: String,
        enum: ['opportunity', 'notification', 'user', 'other'],
        default: 'opportunity'
    },
    targetId: {
        type: String,
        default: ''
    },
    targetTitle: {
        type: String,
        default: '',
        trim: true
    },
    reporterName: {
        type: String,
        default: 'Automated System Sentinel',
        trim: true
    },
    reporterEmail: {
        type: String,
        default: 'sentinel@careersync.internal'
    },
    reporterRole: {
        type: String,
        default: 'system'
    },
    category: {
        type: String,
        enum: [
            'inappropriate_content',
            'misleading_salary',
            'unauthorized_posting',
            'spam',
            'fraud_scam',
            'policy_violation',
            'broken_link'
        ],
        default: 'policy_violation'
    },
    severity: {
        type: String,
        enum: ['critical', 'high', 'medium', 'low'],
        default: 'medium'
    },
    status: {
        type: String,
        enum: ['pending', 'investigating', 'resolved', 'dismissed'],
        default: 'pending'
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    adminNotes: {
        type: String,
        default: ''
    },
    actionTaken: {
        type: String,
        default: ''
    },
    resolvedBy: {
        type: String,
        default: ''
    },
    resolvedAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('ModerationReport', ModerationReportSchema);
