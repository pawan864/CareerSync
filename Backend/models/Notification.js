const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a notification title'],
        trim: true,
        maxlength: [180, 'Title cannot be more than 180 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        trim: true
    },
    category: {
        type: String,
        enum: ['drives', 'notices', 'events', 'academic'],
        default: 'notices'
    },
    sender: {
        type: String,
        default: 'Training & Placement Office',
        trim: true
    },
    senderRole: {
        type: String,
        default: 'Official Circular',
        trim: true
    },
    priority: {
        type: String,
        enum: ['high', 'normal', 'low'],
        default: 'normal'
    },
    actionText: {
        type: String,
        default: '',
        trim: true
    },
    actionUrl: {
        type: String,
        default: '',
        trim: true
    },
    isManual: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isTicker: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);
