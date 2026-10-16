const mongoose = require('mongoose');

const SidebarItemSchema = new mongoose.Schema({
    id: { 
        type: String, 
        required: true 
    },
    label: { 
        type: String, 
        required: true 
    },
    icon: { 
        type: String, 
        default: 'LayoutDashboard' 
    },
    desc: { 
        type: String, 
        default: '' 
    },
    isVisible: { 
        type: Boolean, 
        default: true 
    },
    order: { 
        type: Number, 
        default: 0 
    },
    badge: { 
        type: String, 
        default: '' 
    },
    path: { 
        type: String, 
        default: '' 
    },
    category: { 
        type: String, 
        default: 'General' 
    },
    isCustom: { 
        type: Boolean, 
        default: false 
    }
}, { _id: false });

const AccessControlSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        unique: true,
        enum: ['student', 'faculty', 'recruiter', 'tpo', 'admin'],
        lowercase: true,
        trim: true
    },
    displayName: {
        type: String,
        required: true
    },
    portalRoute: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    isEnabled: {
        type: Boolean,
        default: true
    },
    isMaintenance: {
        type: Boolean,
        default: false
    },
    maintenanceMessage: {
        type: String,
        default: 'This portal is currently undergoing scheduled maintenance. Please check back shortly.'
    },
    sidebarItems: [SidebarItemSchema],
    permissions: {
        type: Map,
        of: Boolean,
        default: {}
    },
    settings: {
        sessionTimeoutMinutes: { 
            type: Number, 
            default: 60 
        },
        mfaRequired: { 
            type: Boolean, 
            default: false 
        },
        allowRegistration: { 
            type: Boolean, 
            default: true 
        },
        allowPasswordReset: { 
            type: Boolean, 
            default: true 
        },
        maxFileUploadMb: { 
            type: Number, 
            default: 15 
        }
    },
    lastUpdatedBy: {
        type: String,
        default: 'Super Admin'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('AccessControl', AccessControlSchema);
