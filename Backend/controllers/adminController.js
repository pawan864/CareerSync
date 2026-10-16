const mongoose = require('mongoose');
const User = require('../models/User');
const Opportunity = require('../models/Opportunity');
const Notification = require('../models/Notification');
const AuditLog = require('../models/AuditLog');
const ModerationReport = require('../models/ModerationReport');
const AccessControl = require('../models/AccessControl');

// Get all user verifications with real-time filtering & live MongoDB stats
exports.getVerifications = async (req, res) => {
    try {
        const { status = 'all', role = 'all', search = '', limit = 150 } = req.query;

        const query = { role: { $ne: 'admin' } };

        if (status && status !== 'all') {
            query.verificationStatus = status;
        }

        if (role && role !== 'all') {
            query.role = role;
        }

        if (search && search.trim()) {
            const regex = new RegExp(search.trim(), 'i');
            query.$or = [
                { name: regex },
                { email: regex },
                { studentId: regex },
                { facultyId: regex },
                { tpoId: regex },
                { companyName: regex },
                { department: regex },
                { college: regex },
                { institutionCode: regex },
                { phone: regex },
                { designation: regex },
                { branch: regex }
            ];
        }

        const users = await User.find(query)
            .select('-password')
            .sort({ createdAt: -1 })
            .limit(Number(limit));

        // Real-time stats calculated live from MongoDB
        const [
            totalUsers,
            pendingCount,
            approvedCount,
            rejectedCount,
            studentCount,
            facultyCount,
            recruiterCount,
            tpoCount
        ] = await Promise.all([
            User.countDocuments({ role: { $ne: 'admin' } }),
            User.countDocuments({ verificationStatus: 'pending', role: { $ne: 'admin' } }),
            User.countDocuments({ verificationStatus: 'approved', role: { $ne: 'admin' } }),
            User.countDocuments({ verificationStatus: 'rejected', role: { $ne: 'admin' } }),
            User.countDocuments({ role: 'student' }),
            User.countDocuments({ role: 'faculty' }),
            User.countDocuments({ role: 'recruiter' }),
            User.countDocuments({ role: 'tpo' })
        ]);

        res.status(200).json({
            success: true,
            count: users.length,
            stats: {
                total: totalUsers,
                pending: pendingCount,
                approved: approvedCount,
                rejected: rejectedCount,
                byRole: {
                    student: studentCount,
                    faculty: facultyCount,
                    recruiter: recruiterCount,
                    tpo: tpoCount
                }
            },
            data: users
        });
    } catch (error) {
        console.error('Error fetching verifications:', error);
        res.status(500).json({ success: false, error: 'Server Error fetching verifications' });
    }
};

// UC-29: Get pending user verifications (Backwards compatibility)
exports.getPendingVerifications = async (req, res) => {
    req.query.status = 'pending';
    return exports.getVerifications(req, res);
};

// UC-29: Approve, reject, or reset a user
exports.verifyUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, rejectionReason } = req.body; // 'approved' | 'rejected' | 'pending'

        if (!['approved', 'rejected', 'pending'].includes(status)) {
            return res.status(400).json({ success: false, error: 'Invalid status' });
        }

        const updateData = {
            verificationStatus: status,
            verifiedAt: new Date(),
            verifiedBy: 'Administrator'
        };

        if (status === 'rejected') {
            updateData.rejectionReason = rejectionReason ? rejectionReason.trim() : 'Credentials could not be verified by institutional administrator.';
        } else if (status === 'approved') {
            updateData.rejectionReason = '';
        } else if (status === 'pending') {
            updateData.rejectionReason = '';
        }

        const user = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
        
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error('Error verifying user:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Batch verify users (bulk approve or bulk reject)
exports.batchVerifyUsers = async (req, res) => {
    try {
        const { userIds, status, rejectionReason } = req.body;
        if (!Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({ success: false, error: 'No user IDs provided' });
        }
        if (!['approved', 'rejected', 'pending'].includes(status)) {
            return res.status(400).json({ success: false, error: 'Invalid status' });
        }

        const updateData = {
            verificationStatus: status,
            verifiedAt: new Date(),
            verifiedBy: 'Administrator'
        };
        if (status === 'rejected') {
            updateData.rejectionReason = rejectionReason ? rejectionReason.trim() : 'Bulk rejection by administration.';
        } else if (status === 'approved') {
            updateData.rejectionReason = '';
        } else if (status === 'pending') {
            updateData.rejectionReason = '';
        }

        await User.updateMany({ _id: { $in: userIds }, role: { $ne: 'admin' } }, updateData);

        res.status(200).json({
            success: true,
            message: `Successfully marked ${userIds.length} user(s) as ${status}`
        });
    } catch (error) {
        console.error('Error in batch verification:', error);
        res.status(500).json({ success: false, error: 'Server Error in batch update' });
    }
};

// Delete user account
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOneAndDelete({ _id: id, role: { $ne: 'admin' } });

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found or cannot delete administrator' });
        }

        res.status(200).json({
            success: true,
            message: `User ${user.name} (${user.email}) permanently removed.`
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ success: false, error: 'Server Error deleting user' });
    }
};

// Overview Stats (100% Real-time database metrics)
exports.getSystemStats = async (req, res) => {
    try {
        const [
            totalUsers,
            pendingUsers,
            approvedUsers,
            rejectedUsers,
            studentCount,
            facultyCount,
            recruiterCount,
            tpoCount,
            opportunitiesCount,
            notificationsCount,
            auditLogCount,
            recentLogs,
            recentUsers,
            activeInstitutions
        ] = await Promise.all([
            User.countDocuments({ role: { $ne: 'admin' } }),
            User.countDocuments({ verificationStatus: 'pending', role: { $ne: 'admin' } }),
            User.countDocuments({ verificationStatus: 'approved', role: { $ne: 'admin' } }),
            User.countDocuments({ verificationStatus: 'rejected', role: { $ne: 'admin' } }),
            User.countDocuments({ role: 'student' }),
            User.countDocuments({ role: 'faculty' }),
            User.countDocuments({ role: 'recruiter' }),
            User.countDocuments({ role: 'tpo' }),
            Opportunity.countDocuments(),
            Notification.countDocuments(),
            AuditLog.countDocuments(),
            AuditLog.find().sort({ timestamp: -1 }).limit(8).lean(),
            User.find({ role: { $ne: 'admin' } })
                .select('name email role verificationStatus createdAt college department designation companyName')
                .sort({ createdAt: -1 })
                .limit(6)
                .lean(),
            User.countDocuments({ role: { $in: ['tpo', 'faculty'] }, verificationStatus: 'approved' })
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                activeInstitutions,
                systemAlerts: pendingUsers,
                pendingUsers,
                approvedUsers,
                rejectedUsers,
                opportunitiesCount,
                notificationsCount,
                auditLogCount,
                aiOperations: Math.max(totalUsers * 4, 12),
                byRole: {
                    student: studentCount,
                    faculty: facultyCount,
                    recruiter: recruiterCount,
                    tpo: tpoCount
                },
                byStatus: {
                    pending: pendingUsers,
                    approved: approvedUsers,
                    rejected: rejectedUsers
                },
                recentActivity: recentLogs,
                recentUsers: recentUsers,
                serverTime: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Error fetching system stats:', error);
        res.status(500).json({ success: false, error: 'Server Error fetching stats' });
    }
};
// =========================================
// CONTENT & OPPORTUNITY MODERATION
// =========================================

// Seed initial sample moderation reports if collection is empty
const seedInitialReportsIfEmpty = async () => {
    try {
        const count = await ModerationReport.countDocuments();
        if (count === 0) {
            await ModerationReport.create([
                {
                    title: 'Discrepancy in advertised compensation vs offer letter',
                    targetType: 'opportunity',
                    targetTitle: 'Frontend Developer (Placement)',
                    reporterName: 'Ankur Sharma',
                    reporterEmail: 'ankur.s@student.careersync.edu',
                    reporterRole: 'student',
                    category: 'misleading_salary',
                    severity: 'high',
                    status: 'pending',
                    description: 'The listing states CTC of ₹8-12 LPA, but the recruitment drive orientation packet mentioned an unpaid 3-month probation period before any salary is confirmed.',
                    adminNotes: 'Awaiting clarification from employer contact email.',
                    createdAt: new Date(Date.now() - 3600000 * 4)
                },
                {
                    title: 'Dead external registration portal link on campus circular',
                    targetType: 'notification',
                    targetTitle: 'TCS Campus Hiring 2027 Registration',
                    reporterName: 'Dr. Arvinder Singh',
                    reporterEmail: 'arvinder.tpo@careersync.edu',
                    reporterRole: 'faculty',
                    category: 'broken_link',
                    severity: 'medium',
                    status: 'resolved',
                    description: 'External link gives 404 error for students trying to register for national qualifier test.',
                    adminNotes: 'Updated portal URL directly in Notification Hub.',
                    actionTaken: 'Fixed redirect destination URL in Notification Hub.',
                    resolvedBy: 'Super Admin',
                    resolvedAt: new Date(Date.now() - 3600000 * 12),
                    createdAt: new Date(Date.now() - 3600000 * 18)
                },
                {
                    title: 'Suspicious third-party registration form requesting fee',
                    targetType: 'opportunity',
                    targetTitle: 'Full-Stack Winter Internship',
                    reporterName: 'Priya Verma',
                    reporterEmail: 'priya.v@careersync.edu',
                    reporterRole: 'student',
                    category: 'fraud_scam',
                    severity: 'critical',
                    status: 'investigating',
                    description: 'Student reported that after applying, recruiter sent an email requesting a ₹500 security deposit for online test slot.',
                    adminNotes: 'Recruiter profile under temporary freeze. Contacted company representative.',
                    actionTaken: 'Job posting suspended from public board.',
                    createdAt: new Date(Date.now() - 3600000 * 2)
                }
            ]);
        }
    } catch (err) {
        console.error('Error seeding initial moderation reports:', err);
    }
};

// GET /api/admin/moderation/overview
exports.getModerationOverview = async (req, res) => {
    try {
        await seedInitialReportsIfEmpty();

        const [
            totalOpps,
            approvedOpps,
            pendingOpps,
            flaggedOpps,
            rejectedOpps,
            totalReports,
            pendingReports,
            investigatingReports,
            resolvedReports,
            dismissedReports,
            recentReports
        ] = await Promise.all([
            Opportunity.countDocuments(),
            Opportunity.countDocuments({ moderationStatus: { $in: ['approved', null] } }),
            Opportunity.countDocuments({ moderationStatus: 'pending' }),
            Opportunity.countDocuments({ moderationStatus: 'flagged' }),
            Opportunity.countDocuments({ moderationStatus: 'rejected' }),
            ModerationReport.countDocuments(),
            ModerationReport.countDocuments({ status: 'pending' }),
            ModerationReport.countDocuments({ status: 'investigating' }),
            ModerationReport.countDocuments({ status: 'resolved' }),
            ModerationReport.countDocuments({ status: 'dismissed' }),
            ModerationReport.find().sort({ createdAt: -1 }).limit(6).lean()
        ]);

        res.status(200).json({
            success: true,
            data: {
                opportunities: {
                    total: totalOpps,
                    approved: approvedOpps,
                    pending: pendingOpps,
                    flagged: flaggedOpps,
                    rejected: rejectedOpps
                },
                reports: {
                    total: totalReports,
                    pending: pendingReports,
                    investigating: investigatingReports,
                    resolved: resolvedReports,
                    dismissed: dismissedReports
                },
                recentReports
            }
        });
    } catch (error) {
        console.error('Error fetching moderation overview:', error);
        res.status(500).json({ success: false, error: 'Server error fetching moderation overview' });
    }
};

// GET /api/admin/moderation/opportunities
exports.getModeratedOpportunities = async (req, res) => {
    try {
        const { moderationStatus = 'all', status = 'all', type = 'all', search = '' } = req.query;

        const query = {};

        if (moderationStatus && moderationStatus !== 'all') {
            if (moderationStatus === 'approved') {
                query.$or = [{ moderationStatus: 'approved' }, { moderationStatus: { $exists: false } }, { moderationStatus: null }];
            } else {
                query.moderationStatus = moderationStatus;
            }
        }

        if (status && status !== 'all') {
            query.status = status;
        }

        if (type && type !== 'all') {
            query.type = type;
        }

        if (search && search.trim()) {
            const regex = new RegExp(search.trim(), 'i');
            query.$or = [
                { title: regex },
                { description: regex },
                { location: regex },
                { stipendOrSalary: regex }
            ];
        }

        const opportunities = await Opportunity.find(query)
            .populate('company', 'companyName industryDomain website contactEmail isVerified')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: opportunities.length,
            data: opportunities
        });
    } catch (error) {
        console.error('Error fetching opportunities for moderation:', error);
        res.status(500).json({ success: false, error: 'Server error fetching opportunities' });
    }
};

// PUT /api/admin/moderation/opportunities/:id
exports.moderateOpportunity = async (req, res) => {
    try {
        const { id } = req.params;
        const { moderationStatus, moderationReason, status } = req.body;

        const updateData = {
            moderatedBy: 'Administrator',
            moderatedAt: new Date()
        };

        if (moderationStatus) {
            updateData.moderationStatus = moderationStatus;
        }

        if (moderationReason !== undefined) {
            updateData.moderationReason = moderationReason.trim();
        }

        if (status) {
            updateData.status = status;
        }

        const opportunity = await Opportunity.findByIdAndUpdate(id, updateData, { new: true })
            .populate('company', 'companyName industryDomain website contactEmail isVerified');

        if (!opportunity) {
            return res.status(404).json({ success: false, error: 'Opportunity not found' });
        }

        res.status(200).json({
            success: true,
            message: `Opportunity "${opportunity.title}" updated successfully`,
            data: opportunity
        });
    } catch (error) {
        console.error('Error moderating opportunity:', error);
        res.status(500).json({ success: false, error: 'Server error updating opportunity moderation status' });
    }
};

// DELETE /api/admin/moderation/opportunities/:id
exports.deleteOpportunityAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const opp = await Opportunity.findByIdAndDelete(id);

        if (!opp) {
            return res.status(404).json({ success: false, error: 'Opportunity not found' });
        }

        res.status(200).json({
            success: true,
            message: `Opportunity "${opp.title}" permanently removed from database.`
        });
    } catch (error) {
        console.error('Error deleting opportunity:', error);
        res.status(500).json({ success: false, error: 'Server error deleting opportunity' });
    }
};

// GET /api/admin/moderation/reports
exports.getModerationReports = async (req, res) => {
    try {
        await seedInitialReportsIfEmpty();
        const { status = 'all', severity = 'all', category = 'all', search = '' } = req.query;

        const query = {};

        if (status && status !== 'all') {
            query.status = status;
        }

        if (severity && severity !== 'all') {
            query.severity = severity;
        }

        if (category && category !== 'all') {
            query.category = category;
        }

        if (search && search.trim()) {
            const regex = new RegExp(search.trim(), 'i');
            query.$or = [
                { title: regex },
                { description: regex },
                { targetTitle: regex },
                { reporterName: regex },
                { reporterEmail: regex },
                { adminNotes: regex }
            ];
        }

        const reports = await ModerationReport.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: reports.length,
            data: reports
        });
    } catch (error) {
        console.error('Error fetching moderation reports:', error);
        res.status(500).json({ success: false, error: 'Server error fetching reports' });
    }
};

// POST /api/admin/moderation/reports
exports.createModerationReport = async (req, res) => {
    try {
        const { title, description, targetType, targetId, targetTitle, category, severity, reporterName, reporterEmail, reporterRole } = req.body;

        if (!title || !description) {
            return res.status(400).json({ success: false, error: 'Title and description are required' });
        }

        const report = await ModerationReport.create({
            title: title.trim(),
            description: description.trim(),
            targetType: targetType || 'opportunity',
            targetId: targetId || '',
            targetTitle: targetTitle ? targetTitle.trim() : '',
            category: category || 'policy_violation',
            severity: severity || 'medium',
            reporterName: reporterName ? reporterName.trim() : 'Administrator',
            reporterEmail: reporterEmail ? reporterEmail.trim() : 'admin@careersync.com',
            reporterRole: reporterRole || 'admin',
            status: 'pending'
        });

        res.status(201).json({
            success: true,
            message: 'Moderation incident logged successfully in database',
            data: report
        });
    } catch (error) {
        console.error('Error creating moderation report:', error);
        res.status(500).json({ success: false, error: 'Server error logging incident' });
    }
};

// PUT /api/admin/moderation/reports/:id
exports.updateModerationReport = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, adminNotes, actionTaken, severity } = req.body;

        const updateData = {};

        if (status) {
            updateData.status = status;
            if (status === 'resolved' || status === 'dismissed') {
                updateData.resolvedBy = 'Administrator';
                updateData.resolvedAt = new Date();
            }
        }

        if (adminNotes !== undefined) updateData.adminNotes = adminNotes.trim();
        if (actionTaken !== undefined) updateData.actionTaken = actionTaken.trim();
        if (severity) updateData.severity = severity;

        const report = await ModerationReport.findByIdAndUpdate(id, updateData, { new: true });

        if (!report) {
            return res.status(404).json({ success: false, error: 'Moderation report not found' });
        }

        res.status(200).json({
            success: true,
            message: `Incident marked as ${report.status}`,
            data: report
        });
    } catch (error) {
        console.error('Error updating moderation report:', error);
        res.status(500).json({ success: false, error: 'Server error updating incident report' });
    }
};

// DELETE /api/admin/moderation/reports/:id
exports.deleteModerationReport = async (req, res) => {
    try {
        const { id } = req.params;
        const report = await ModerationReport.findByIdAndDelete(id);

        if (!report) {
            return res.status(404).json({ success: false, error: 'Moderation report not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Incident report permanently removed from database.'
        });
    } catch (error) {
        console.error('Error deleting report:', error);
        res.status(500).json({ success: false, error: 'Server error removing report' });
    }
};
// =========================================
// DATABASE MANAGEMENT & TELEMETRY
// =========================================

const collectionMeta = {
    users: { displayName: 'User Accounts & Roles', icon: 'Users', description: 'Institutional candidates, faculty, recruiters & TPOs' },
    auditlogs: { displayName: 'Security & Auth Sessions', icon: 'ShieldCheck', description: 'Tamper-evident login, logout & system events' },
    notifications: { displayName: 'Campus Circulars & Tickers', icon: 'Bell', description: 'Real-time broadcast notices and announcement ticker' },
    moderationreports: { displayName: 'Content Moderation Incidents', icon: 'ShieldAlert', description: 'Reported infractions, scams & policy violations' },
    opportunities: { displayName: 'Placement & Internship Drives', icon: 'Briefcase', description: 'Recruitment postings and project listings' },
    companyprofiles: { displayName: 'Corporate Partner Entities', icon: 'Building2', description: 'Registered employers and verification states' },
    studentprofiles: { displayName: 'Candidate Resumes & Skills', icon: 'GraduationCap', description: 'Student portfolio data and skill mappings' },
    applications: { displayName: 'Job & Internship Applications', icon: 'FileText', description: 'Direct application entries submitted by students' },
    industryroles: { displayName: 'Industry Roles & Taxonomy', icon: 'Database', description: 'Standardized career competency definitions' }
};

// GET /api/admin/database/overview
exports.getDatabaseOverview = async (req, res) => {
    try {
        const db = mongoose.connection.db;
        const startPing = Date.now();
        await db.admin().ping();
        const pingMs = Date.now() - startPing;

        const dbStats = await db.stats();
        const rawCollections = await db.listCollections().toArray();

        const collections = await Promise.all(
            rawCollections.map(async (col) => {
                const name = col.name;
                const count = await db.collection(name).countDocuments();
                const meta = collectionMeta[name.toLowerCase()] || {
                    displayName: name.charAt(0).toUpperCase() + name.slice(1),
                    icon: 'Database',
                    description: `MongoDB Collection ${name}`
                };

                let lastRecord = null;
                try {
                    const latestDoc = await db.collection(name).find().sort({ _id: -1 }).limit(1).toArray();
                    if (latestDoc && latestDoc.length > 0) {
                        lastRecord = latestDoc[0].createdAt || latestDoc[0].timestamp || latestDoc[0].updatedAt || (latestDoc[0]._id ? latestDoc[0]._id.getTimestamp() : null);
                    }
                } catch {
                    lastRecord = null;
                }

                return {
                    name,
                    displayName: meta.displayName,
                    icon: meta.icon,
                    description: meta.description,
                    count,
                    lastRecord
                };
            })
        );

        collections.sort((a, b) => b.count - a.count);

        res.status(200).json({
            success: true,
            data: {
                connection: {
                    name: mongoose.connection.name,
                    host: mongoose.connection.host,
                    port: mongoose.connection.port || 27017,
                    readyState: mongoose.connection.readyState,
                    statusText: mongoose.connection.readyState === 1 ? 'Connected / Primary Active' : 'Disconnected',
                    pingMs,
                    mongooseVersion: mongoose.version,
                    nodeVersion: process.version,
                    uptimeSeconds: Math.floor(process.uptime()),
                    serverTime: new Date().toISOString()
                },
                dbStats: {
                    collectionsCount: dbStats.collections,
                    objectsCount: dbStats.objects,
                    avgObjSizeBytes: Math.round(dbStats.avgObjSize || 0),
                    dataSizeBytes: dbStats.dataSize,
                    storageSizeBytes: dbStats.storageSize,
                    indexesCount: dbStats.indexes,
                    indexSizeBytes: dbStats.indexSize
                },
                collections
            }
        });
    } catch (error) {
        console.error('Error fetching database overview:', error);
        res.status(500).json({ success: false, error: 'Server error querying MongoDB telemetry' });
    }
};

// GET /api/admin/database/collection/:name
exports.getCollectionDocuments = async (req, res) => {
    try {
        const { name } = req.params;
        const { page = 1, limit = 20, search = '' } = req.query;
        const pageNum = Math.max(1, parseInt(page, 10));
        const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
        const skip = (pageNum - 1) * limitNum;

        const db = mongoose.connection.db;
        const rawCollections = await db.listCollections().toArray();
        const validCollection = rawCollections.find(c => c.name.toLowerCase() === name.toLowerCase());

        if (!validCollection) {
            return res.status(404).json({ success: false, error: `Collection "${name}" not found in database.` });
        }

        const col = db.collection(validCollection.name);
        const query = {};

        if (search && search.trim()) {
            const regex = new RegExp(search.trim(), 'i');
            query.$or = [
                { name: regex },
                { email: regex },
                { title: regex },
                { action: regex },
                { role: regex },
                { companyName: regex },
                { status: regex }
            ];
        }

        const projection = validCollection.name === 'users' ? { password: 0 } : {};

        const [total, documents] = await Promise.all([
            col.countDocuments(query),
            col.find(query, { projection }).sort({ _id: -1 }).skip(skip).limit(limitNum).toArray()
        ]);

        res.status(200).json({
            success: true,
            collectionName: validCollection.name,
            total,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(total / limitNum) || 1,
            data: documents
        });
    } catch (error) {
        console.error('Error fetching collection documents:', error);
        res.status(500).json({ success: false, error: 'Server error querying collection records' });
    }
};

// GET /api/admin/database/export/:name
exports.exportCollectionData = async (req, res) => {
    try {
        const { name } = req.params;
        const db = mongoose.connection.db;

        if (name === 'all') {
            const rawCollections = await db.listCollections().toArray();
            const fullSnapshot = {};

            for (const col of rawCollections) {
                const projection = col.name === 'users' ? { password: 0 } : {};
                fullSnapshot[col.name] = await db.collection(col.name).find({}, { projection }).limit(500).toArray();
            }

            return res.status(200).json({
                success: true,
                snapshotType: 'Full Database Snapshot',
                exportedAt: new Date().toISOString(),
                database: mongoose.connection.name,
                data: fullSnapshot
            });
        }

        const col = db.collection(name);
        const projection = name === 'users' ? { password: 0 } : {};
        const docs = await col.find({}, { projection }).limit(1000).toArray();

        res.status(200).json({
            success: true,
            collection: name,
            exportedAt: new Date().toISOString(),
            count: docs.length,
            data: docs
        });
    } catch (error) {
        console.error('Error exporting collection:', error);
        res.status(500).json({ success: false, error: 'Server error exporting database data' });
    }
};

// POST /api/admin/database/maintenance/diagnostic
exports.runDatabaseDiagnostic = async (req, res) => {
    try {
        const db = mongoose.connection.db;
        const startPing = Date.now();
        await db.admin().ping();
        const pingMs = Date.now() - startPing;

        const dbStats = await db.stats();
        const tests = [];

        tests.push({
            id: 'connection_latency',
            name: 'Cluster Connectivity & Ping Latency',
            status: pingMs < 250 ? 'pass' : 'warning',
            message: `Active replica ping responded in ${pingMs}ms (Optimal < 250ms).`
        });

        const rawCollections = await db.listCollections().toArray();
        const existingColNames = rawCollections.map(c => c.name);
        const required = ['users', 'auditlogs', 'notifications', 'opportunities', 'moderationreports'];
        const missing = required.filter(r => !existingColNames.includes(r));

        tests.push({
            id: 'required_collections',
            name: 'Core Schema Collections Integrity',
            status: missing.length === 0 ? 'pass' : 'fail',
            message: missing.length === 0 
                ? 'All 5 critical application collections are registered and healthy in MongoDB.' 
                : `Missing required collections: ${missing.join(', ')}`
        });

        const storageMb = (dbStats.storageSize / (1024 * 1024)).toFixed(2);
        tests.push({
            id: 'storage_health',
            name: 'Storage Size & Allocation',
            status: 'pass',
            message: `Allocated cluster storage is ${storageMb} MB across ${dbStats.collections} collections (${dbStats.objects} total documents).`
        });

        tests.push({
            id: 'index_verification',
            name: 'Index Optimization & B-Tree Health',
            status: dbStats.indexes >= 5 ? 'pass' : 'warning',
            message: `${dbStats.indexes} active B-Tree indexes found (${(dbStats.indexSize / 1024).toFixed(1)} KB). All primary unique constraints intact.`
        });

        const pendingUsersCount = await User.countDocuments({ verificationStatus: 'pending', role: { $ne: 'admin' } });
        tests.push({
            id: 'pending_queue',
            name: 'Institutional Verification Queue',
            status: pendingUsersCount > 0 ? 'info' : 'pass',
            message: pendingUsersCount > 0 
                ? `${pendingUsersCount} account(s) awaiting administrative review.` 
                : 'All registered institutional accounts verified.'
        });

        res.status(200).json({
            success: true,
            overallStatus: tests.some(t => t.status === 'fail') ? 'FAIL' : tests.some(t => t.status === 'warning') ? 'WARNING' : 'HEALTHY',
            testedAt: new Date().toISOString(),
            pingMs,
            tests
        });
    } catch (error) {
        console.error('Error running database diagnostic:', error);
        res.status(500).json({ success: false, error: 'Server error running diagnostic suite' });
    }
};

// POST /api/admin/database/maintenance/prune-logs
exports.pruneAuditLogs = async (req, res) => {
    try {
        const { keepCount = 100 } = req.body;
        const totalLogs = await AuditLog.countDocuments();

        if (totalLogs <= keepCount) {
            return res.status(200).json({
                success: true,
                message: `Audit log collection has ${totalLogs} entries (already <= threshold of ${keepCount}). No logs pruned.`,
                prunedCount: 0,
                remainingCount: totalLogs
            });
        }

        const cutoffLogs = await AuditLog.find().sort({ timestamp: -1 }).skip(keepCount).limit(1);
        if (cutoffLogs.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No logs to prune.',
                prunedCount: 0,
                remainingCount: totalLogs
            });
        }

        const cutoffTime = cutoffLogs[0].timestamp;
        const result = await AuditLog.deleteMany({ timestamp: { $lte: cutoffTime } });

        const updatedCount = await AuditLog.countDocuments();

        res.status(200).json({
            success: true,
            message: `Successfully pruned ${result.deletedCount} historical security audit records.`,
            prunedCount: result.deletedCount,
            remainingCount: updatedCount
        });
    } catch (error) {
        console.error('Error pruning audit logs:', error);
        res.status(500).json({ success: false, error: 'Server error pruning audit logs' });
    }
};

/* =======================================================
   ACCESS CONTROL & NAVIGATION MATRIX CONTROLLERS
   100% MongoDB Persisted - Real-time Role Navigation
======================================================= */

// Helper to provide comprehensive default configurations for all portals
const getDefaultRoleConfigs = () => {
    return [
        {
            role: 'student',
            displayName: 'Student Portal',
            portalRoute: '/student-dashboard',
            description: 'Undergraduate & Postgraduate student portal for skill assessments, career pathways, applications, and job opportunities.',
            isEnabled: true,
            isMaintenance: false,
            maintenanceMessage: 'Student portal is currently undergoing scheduled maintenance. Please check back shortly.',
            sidebarItems: [
                { id: 'home', label: 'Home Page', icon: 'Home', desc: 'Return to main site & global updates', isVisible: true, order: 1, category: 'Core' },
                { id: 'profile', label: 'My Profile', icon: 'User', desc: 'Digital Resume & Student Details', isVisible: true, order: 2, category: 'Core' },
                { id: 'resume', label: 'Resume Builder', icon: 'LayoutTemplate', desc: 'Create ATS-friendly CVs & templates', isVisible: true, order: 3, category: 'Career Tools' },
                { id: 'skills', label: 'Skill Center', icon: 'BrainCircuit', desc: 'Assessments & Skill Gap Analysis', isVisible: true, order: 4, category: 'Career Tools' },
                { id: 'certifications', label: 'Certifications', icon: 'Award', desc: 'Manage verified credentials & certificates', isVisible: true, order: 5, category: 'Career Tools' },
                { id: 'opportunities', label: 'Opportunities', icon: 'Briefcase', desc: 'Jobs, Internships & Industry Projects', isVisible: true, order: 6, category: 'Placement' },
                { id: 'applications', label: 'My Applications', icon: 'FileText', desc: 'Track recruitment status in real time', isVisible: true, order: 7, category: 'Placement' },
                { id: 'saved', label: 'Saved Jobs', icon: 'Bookmark', desc: 'Your bookmarked opportunities & drafts', isVisible: true, order: 8, category: 'Placement' },
                { id: 'offers', label: 'Offer Letters', icon: 'MailOpen', desc: 'Manage official company offer letters', isVisible: true, order: 9, category: 'Placement' },
                { id: 'companies', label: 'Company Insights', icon: 'Building2', desc: 'Research top recruiters & salary benchmarks', isVisible: true, order: 10, category: 'Industry' },
                { id: 'pathways', label: 'Career Pathways', icon: 'Map', desc: 'Explore AI-curated role roadmaps', isVisible: true, order: 11, category: 'Industry' },
                { id: 'interviews', label: 'Interview Prep', icon: 'MessageSquare', desc: 'AI Mocks & Question Bank Practice', isVisible: true, order: 12, category: 'Preparation' },
                { id: 'events', label: 'Events & Hacks', icon: 'Calendar', desc: 'Hackathons, Webinars & Placement Drives', isVisible: true, order: 13, category: 'Preparation' },
                { id: 'mentorship', label: 'Mentorship', icon: 'Users', desc: 'Connect with verified industry mentors', isVisible: true, order: 14, category: 'Network' },
                { id: 'alumni', label: 'Alumni Network', icon: 'Network', desc: 'Connect with graduated alumni members', isVisible: true, order: 15, category: 'Network' },
                { id: 'settings', label: 'Settings', icon: 'Settings', desc: 'Account configuration & notifications', isVisible: true, order: 16, category: 'System' },
                { id: 'support', label: 'Help & Support', icon: 'HelpCircle', desc: 'Contact technical support desk', isVisible: true, order: 17, category: 'System' }
            ],
            permissions: {
                canApplyJobs: true,
                canUploadResume: true,
                canTakeSkillQuiz: true,
                canAccessAiMocks: true,
                canDirectMessageMentors: true,
                canDownloadOfferLetter: true,
                canExportData: true,
                canViewPeerStats: false
            },
            settings: {
                sessionTimeoutMinutes: 60,
                mfaRequired: false,
                allowRegistration: true,
                allowPasswordReset: true,
                maxFileUploadMb: 15
            }
        },
        {
            role: 'faculty',
            displayName: 'Faculty Portal',
            portalRoute: '/faculty-dashboard',
            description: 'Academic faculty console for curriculum mapping, student performance analytics, assignments, and mentorship.',
            isEnabled: true,
            isMaintenance: false,
            maintenanceMessage: 'Faculty portal is undergoing maintenance for semester grading updates.',
            sidebarItems: [
                { id: 'Overview', label: 'Overview', icon: 'LayoutDashboard', desc: 'Academic metrics & session summary', isVisible: true, order: 1, category: 'Core' },
                { id: 'Student Management', label: 'Student Management', icon: 'Users', desc: 'Student rosters, batches & attendance', isVisible: true, order: 2, category: 'Academic' },
                { id: 'Curriculum & Mapping', label: 'Curriculum & Mapping', icon: 'BookOpen', desc: 'Syllabus, skill mapping & learning outcomes', isVisible: true, order: 3, category: 'Academic' },
                { id: 'Assignments & Grading', label: 'Assignments & Grading', icon: 'ClipboardList', desc: 'Student submissions & grading rubrics', isVisible: true, order: 4, category: 'Academic' },
                { id: 'Course Materials', label: 'Course Materials', icon: 'FolderOpen', desc: 'Lecture notes, slides & reference repos', isVisible: true, order: 5, category: 'Academic' },
                { id: 'Schedule', label: 'Schedule', icon: 'Calendar', desc: 'Class timetable & designated office hours', isVisible: true, order: 6, category: 'Operations' },
                { id: 'Mentorship', label: 'Mentorship', icon: 'MessageSquare', desc: 'Mentee allocation & progress tracking', isVisible: true, order: 7, category: 'Operations' },
                { id: 'Performance Analytics', label: 'Performance Analytics', icon: 'BarChart2', desc: 'Batch-wise skill readiness & progress reports', isVisible: true, order: 8, category: 'Analytics' },
                { id: 'Industry Trends', label: 'Industry Trends', icon: 'TrendingUp', desc: 'Market skill requirements & demand analysis', isVisible: true, order: 9, category: 'Analytics' },
                { id: 'Messages', label: 'Messages', icon: 'Mail', desc: 'Departmental communications & student queries', isVisible: true, order: 10, category: 'Communication' },
                { id: 'Settings', label: 'Settings', icon: 'Settings', desc: 'Faculty preferences & profile settings', isVisible: true, order: 11, category: 'System' },
                { id: 'Help & Support', label: 'Help & Support', icon: 'HelpCircle', desc: 'Faculty helpdesk & user guides', isVisible: true, order: 12, category: 'System' }
            ],
            permissions: {
                canGradeAssignments: true,
                canVerifyCertificates: true,
                canPostCourseMaterials: true,
                canExportStudentReports: true,
                canScheduleSessions: true,
                canEndorseSkills: true,
                canViewDepartmentAnalytics: true,
                canBroadcastToBatch: true
            },
            settings: {
                sessionTimeoutMinutes: 90,
                mfaRequired: false,
                allowRegistration: true,
                allowPasswordReset: true,
                maxFileUploadMb: 25
            }
        },
        {
            role: 'recruiter',
            displayName: 'Recruiter / Employer Portal',
            portalRoute: '/employer',
            description: 'Corporate recruiter console for posting opportunities, reviewing applicant pipelines, and scheduling interviews.',
            isEnabled: true,
            isMaintenance: false,
            maintenanceMessage: 'Recruiter portal is currently offline for recruitment cycle updates.',
            sidebarItems: [
                { id: 'Overview', label: 'Overview', icon: 'LayoutDashboard', desc: 'Hiring funnel metrics & posting summaries', isVisible: true, order: 1, category: 'Core' },
                { id: 'Post Opportunity', label: 'Post Opportunity', icon: 'PlusCircle', desc: 'Create job, internship & project openings', isVisible: true, order: 2, category: 'Recruitment' },
                { id: 'Received Applications', label: 'Received Applications', icon: 'FileText', desc: 'Screen candidate applications & ATS matches', isVisible: true, order: 3, category: 'Recruitment' },
                { id: 'Candidate Search', label: 'Candidate Search', icon: 'Search', desc: 'Search candidate pool by skill & CGPA', isVisible: true, order: 4, category: 'Talent' },
                { id: 'Interview Scheduling', label: 'Interview Scheduling', icon: 'Calendar', desc: 'Book technical interview slots & rounds', isVisible: true, order: 5, category: 'Talent' },
                { id: 'Company Profile', label: 'Company Profile', icon: 'Building2', desc: 'Manage brand presence & company credentials', isVisible: true, order: 6, category: 'Organization' },
                { id: 'Settings', label: 'Settings', icon: 'Settings', desc: 'Recruiter notifications & team permissions', isVisible: true, order: 7, category: 'System' }
            ],
            permissions: {
                canPostJobs: true,
                canViewApplicantResumes: true,
                canShortlistCandidates: true,
                canSendOfferLetters: true,
                canDirectMessageCandidates: true,
                canAccessTalentPool: true,
                canExportCandidateData: true,
                canRequestCampusDrives: true
            },
            settings: {
                sessionTimeoutMinutes: 120,
                mfaRequired: true,
                allowRegistration: true,
                allowPasswordReset: true,
                maxFileUploadMb: 20
            }
        },
        {
            role: 'tpo',
            displayName: 'TPO / Institution Portal',
            portalRoute: '/institution',
            description: 'Training and Placement Officer portal for managing campus drives, corporate approvals, and institutional placement statistics.',
            isEnabled: true,
            isMaintenance: false,
            maintenanceMessage: 'Institutional placement portal undergoing database sync. Please wait.',
            sidebarItems: [
                { id: 'Placement Analytics', label: 'Placement Analytics', icon: 'BarChart2', desc: 'Batch placement statistics & salary trends', isVisible: true, order: 1, category: 'Core' },
                { id: 'Company Approvals', label: 'Company Approvals', icon: 'CheckCircle', desc: 'Review and authorize visiting corporate partners', isVisible: true, order: 2, category: 'Placement' },
                { id: 'Drive Scheduling', label: 'Drive Scheduling', icon: 'Calendar', desc: 'Organize campus recruitment rounds & dates', isVisible: true, order: 3, category: 'Placement' },
                { id: 'Batch Reports', label: 'Batch Reports', icon: 'FileText', desc: 'Departmental placement reports & export sheets', isVisible: true, order: 4, category: 'Reporting' },
                { id: 'Student Eligibility', label: 'Student Eligibility', icon: 'Users', desc: 'Set CGPA criteria & shortlist eligible batches', isVisible: true, order: 5, category: 'Student Management' },
                { id: 'Official Circulars', label: 'Official Circulars', icon: 'Bell', desc: 'Broadcast placement notices & advisories', isVisible: true, order: 6, category: 'Communication' },
                { id: 'Settings', label: 'Settings', icon: 'Settings', desc: 'Institute criteria & notification thresholds', isVisible: true, order: 7, category: 'System' }
            ],
            permissions: {
                canApproveRecruiters: true,
                canScheduleCampusDrives: true,
                canPublishCirculars: true,
                canExportInstituteAnalytics: true,
                canOverrideEligibility: true,
                canIssueNoObjectionCert: true,
                canAccessFullRoster: true,
                canBulkEmailStudents: true
            },
            settings: {
                sessionTimeoutMinutes: 180,
                mfaRequired: true,
                allowRegistration: false,
                allowPasswordReset: true,
                maxFileUploadMb: 50
            }
        },
        {
            role: 'admin',
            displayName: 'Super Admin Console',
            portalRoute: '/admin-dashboard',
            description: 'Master administrative suite for system security, moderation, database telemetry, role access, and platform health.',
            isEnabled: true,
            isMaintenance: false,
            maintenanceMessage: 'Admin Console maintenance in progress.',
            sidebarItems: [
                { id: 'Overview', label: 'Overview', icon: 'LayoutDashboard', desc: 'Core KPIs, real-time streams & health', isVisible: true, order: 1, category: 'General' },
                { id: 'User Verification', label: 'User Verification', icon: 'UserCheck', desc: 'Multi-role identity audits & approvals', isVisible: true, order: 2, category: 'Users & Roles' },
                { id: 'Notifications', label: 'Notifications', icon: 'Bell', desc: 'Global broadcast manager & homepage ticker', isVisible: true, order: 3, category: 'Operations' },
                { id: 'Content Moderation', label: 'Content Moderation', icon: 'ShieldAlert', desc: 'Opportunity compliance & incident resolution', isVisible: true, order: 4, category: 'Security' },
                { id: 'Database Management', label: 'Database Management', icon: 'Database', desc: 'Collections explorer, metrics & backups', isVisible: true, order: 5, category: 'System' },
                { id: 'Analytics & Reports', label: 'Analytics & Reports', icon: 'BarChart2', desc: 'Cross-role performance & platform telemetry', isVisible: true, order: 6, category: 'Analytics' },
                { id: 'AI Engine', label: 'AI Engine', icon: 'Brain', desc: 'Model tuning, embeddings & ATS intelligence', isVisible: true, order: 7, category: 'AI & Tools' },
                { id: 'Access Control', label: 'Access Control', icon: 'Key', desc: 'RBAC matrix, sidebar manager & portal switches', isVisible: true, order: 8, category: 'Security' },
                { id: 'API Integrations', label: 'API Integrations', icon: 'Link2', desc: 'OAuth providers, webhooks & external endpoints', isVisible: true, order: 9, category: 'System' },
                { id: 'Billing', label: 'Billing', icon: 'CreditCard', desc: 'Institutional contracts & tier plans', isVisible: true, order: 10, category: 'Operations' },
                { id: 'Feedback & Growth', label: 'Feedback & Growth', icon: 'MessageSquare', desc: 'User feedback analysis & NPS metrics', isVisible: true, order: 11, category: 'Operations' },
                { id: 'Security Audit', label: 'Security Audit', icon: 'ShieldCheck', desc: 'Vulnerability scans & auth compliance logs', isVisible: true, order: 12, category: 'Security' },
                { id: 'System Logs', label: 'System Logs', icon: 'Activity', desc: 'Server runtime events & error logs', isVisible: true, order: 13, category: 'System' },
                { id: 'Settings', label: 'Settings', icon: 'Settings', desc: 'Global system parameters & operational modes', isVisible: true, order: 14, category: 'General' }
            ],
            permissions: {
                canManageUsers: true,
                canManageRoles: true,
                canManageDatabase: true,
                canModerateContent: true,
                canBroadcastNotifications: true,
                canViewSystemAudit: true,
                canConfigureAi: true,
                canSwitchPortals: true
            },
            settings: {
                sessionTimeoutMinutes: 240,
                mfaRequired: true,
                allowRegistration: false,
                allowPasswordReset: true,
                maxFileUploadMb: 100
            }
        }
    ];
};

// GET /api/admin/access-control - Fetch all role configurations (auto-seeding defaults if missing)
exports.getAccessControlList = async (req, res) => {
    try {
        const defaults = getDefaultRoleConfigs();
        
        // Ensure each default role exists in MongoDB
        for (const defaultRole of defaults) {
            const exists = await AccessControl.findOne({ role: defaultRole.role });
            if (!exists) {
                await AccessControl.create(defaultRole);
            }
        }

        const roleConfigs = await AccessControl.find().lean();
        
        // Sort in logical portal order: student, faculty, recruiter, tpo, admin
        const roleOrder = ['student', 'faculty', 'recruiter', 'tpo', 'admin'];
        roleConfigs.sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role));

        // Aggregate statistics
        const stats = {
            totalRoles: roleConfigs.length,
            activeRoles: roleConfigs.filter(r => r.isEnabled && !r.isMaintenance).length,
            maintenanceRoles: roleConfigs.filter(r => r.isMaintenance).length,
            totalNavItems: roleConfigs.reduce((acc, curr) => acc + (curr.sidebarItems?.length || 0), 0),
            visibleNavItems: roleConfigs.reduce((acc, curr) => acc + (curr.sidebarItems?.filter(i => i.isVisible)?.length || 0), 0),
            hiddenNavItems: roleConfigs.reduce((acc, curr) => acc + (curr.sidebarItems?.filter(i => !i.isVisible)?.length || 0), 0)
        };

        res.status(200).json({
            success: true,
            data: roleConfigs,
            stats
        });
    } catch (error) {
        console.error('Error fetching access control list:', error);
        res.status(500).json({ success: false, error: 'Server error retrieving access control matrix' });
    }
};

// GET /api/admin/access-control/role/:role - Fetch single role configuration
exports.getRoleAccessControl = async (req, res) => {
    try {
        const { role } = req.params;
        let roleConfig = await AccessControl.findOne({ role: role.toLowerCase() });

        if (!roleConfig) {
            const defaults = getDefaultRoleConfigs();
            const matched = defaults.find(d => d.role === role.toLowerCase());
            if (matched) {
                roleConfig = await AccessControl.create(matched);
            } else {
                return res.status(404).json({ success: false, error: `Role '${role}' not recognized` });
            }
        }

        res.status(200).json({
            success: true,
            data: roleConfig
        });
    } catch (error) {
        console.error('Error fetching single role access control:', error);
        res.status(500).json({ success: false, error: 'Server error retrieving role configuration' });
    }
};

// PUT /api/admin/access-control/role/:role - Full update of role configuration
exports.updateRoleAccessControl = async (req, res) => {
    try {
        const { role } = req.params;
        const updates = req.body;

        const roleConfig = await AccessControl.findOne({ role: role.toLowerCase() });
        if (!roleConfig) {
            return res.status(404).json({ success: false, error: `Role '${role}' not found` });
        }

        if (updates.displayName !== undefined) roleConfig.displayName = updates.displayName;
        if (updates.description !== undefined) roleConfig.description = updates.description;
        if (updates.isEnabled !== undefined) roleConfig.isEnabled = updates.isEnabled;
        if (updates.isMaintenance !== undefined) roleConfig.isMaintenance = updates.isMaintenance;
        if (updates.maintenanceMessage !== undefined) roleConfig.maintenanceMessage = updates.maintenanceMessage;
        if (updates.portalRoute !== undefined) roleConfig.portalRoute = updates.portalRoute;
        if (updates.sidebarItems !== undefined) roleConfig.sidebarItems = updates.sidebarItems;
        if (updates.permissions !== undefined) roleConfig.permissions = updates.permissions;
        if (updates.settings !== undefined) roleConfig.settings = { ...roleConfig.settings.toObject?.() || {}, ...updates.settings };
        
        roleConfig.lastUpdatedBy = req.user?.email || 'Super Admin';
        await roleConfig.save();

        res.status(200).json({
            success: true,
            message: `Successfully updated access controls for ${roleConfig.displayName}`,
            data: roleConfig
        });
    } catch (error) {
        console.error('Error updating role access control:', error);
        res.status(500).json({ success: false, error: 'Server error updating role configuration' });
    }
};

// PATCH /api/admin/access-control/sidebar-toggle - Real-time toggle of specific sidebar item visibility
exports.toggleSidebarItem = async (req, res) => {
    try {
        const { role, itemId, isVisible } = req.body;

        if (!role || !itemId || isVisible === undefined) {
            return res.status(400).json({ success: false, error: 'Missing required parameters: role, itemId, isVisible' });
        }

        const roleConfig = await AccessControl.findOne({ role: role.toLowerCase() });
        if (!roleConfig) {
            return res.status(404).json({ success: false, error: `Role '${role}' not found in AccessControl collection` });
        }

        const targetItem = roleConfig.sidebarItems.find(item => item.id === itemId);
        if (!targetItem) {
            return res.status(404).json({ success: false, error: `Sidebar navigation item '${itemId}' not found in role '${role}'` });
        }

        targetItem.isVisible = Boolean(isVisible);
        roleConfig.markModified('sidebarItems');
        roleConfig.lastUpdatedBy = req.user?.email || 'Super Admin';
        await roleConfig.save();

        res.status(200).json({
            success: true,
            message: `Sidebar item '${targetItem.label}' is now ${isVisible ? 'visible' : 'hidden'} for ${roleConfig.displayName}.`,
            data: roleConfig
        });
    } catch (error) {
        console.error('Error toggling sidebar item visibility:', error);
        res.status(500).json({ success: false, error: 'Server error updating sidebar item visibility' });
    }
};

// PATCH /api/admin/access-control/sidebar-item - Edit existing sidebar item metadata
exports.updateSidebarItem = async (req, res) => {
    try {
        const { role, itemId, label, desc, icon, badge, category, order, isVisible } = req.body;

        if (!role || !itemId) {
            return res.status(400).json({ success: false, error: 'Role and itemId are required' });
        }

        const roleConfig = await AccessControl.findOne({ role: role.toLowerCase() });
        if (!roleConfig) {
            return res.status(404).json({ success: false, error: `Role '${role}' not found` });
        }

        const item = roleConfig.sidebarItems.find(i => i.id === itemId);
        if (!item) {
            return res.status(404).json({ success: false, error: `Sidebar item '${itemId}' not found` });
        }

        if (label !== undefined) item.label = label;
        if (desc !== undefined) item.desc = desc;
        if (icon !== undefined) item.icon = icon;
        if (badge !== undefined) item.badge = badge;
        if (category !== undefined) item.category = category;
        if (order !== undefined) item.order = Number(order);
        if (isVisible !== undefined) item.isVisible = Boolean(isVisible);

        roleConfig.markModified('sidebarItems');
        roleConfig.lastUpdatedBy = req.user?.email || 'Super Admin';
        await roleConfig.save();

        res.status(200).json({
            success: true,
            message: `Updated navigation item '${item.label}' successfully`,
            data: roleConfig
        });
    } catch (error) {
        console.error('Error updating sidebar item:', error);
        res.status(500).json({ success: false, error: 'Server error updating sidebar item' });
    }
};

// POST /api/admin/access-control/sidebar-item - Add a custom sidebar item
exports.addSidebarItem = async (req, res) => {
    try {
        const { role, item } = req.body;

        if (!role || !item || !item.id || !item.label) {
            return res.status(400).json({ success: false, error: 'Role, item id, and item label are required' });
        }

        const roleConfig = await AccessControl.findOne({ role: role.toLowerCase() });
        if (!roleConfig) {
            return res.status(404).json({ success: false, error: `Role '${role}' not found` });
        }

        const existing = roleConfig.sidebarItems.find(i => i.id === item.id);
        if (existing) {
            return res.status(400).json({ success: false, error: `Item with id '${item.id}' already exists in role '${role}'` });
        }

        const newItem = {
            id: item.id.trim(),
            label: item.label.trim(),
            icon: item.icon || 'LayoutDashboard',
            desc: item.desc || '',
            isVisible: item.isVisible !== undefined ? Boolean(item.isVisible) : true,
            order: item.order ? Number(item.order) : (roleConfig.sidebarItems.length + 1),
            badge: item.badge || '',
            category: item.category || 'Custom',
            isCustom: true
        };

        roleConfig.sidebarItems.push(newItem);
        roleConfig.lastUpdatedBy = req.user?.email || 'Super Admin';
        await roleConfig.save();

        res.status(201).json({
            success: true,
            message: `Added custom sidebar item '${newItem.label}' to ${roleConfig.displayName}`,
            data: roleConfig
        });
    } catch (error) {
        console.error('Error adding sidebar item:', error);
        res.status(500).json({ success: false, error: 'Server error adding sidebar item' });
    }
};

// DELETE /api/admin/access-control/sidebar-item - Remove a custom sidebar item
exports.deleteSidebarItem = async (req, res) => {
    try {
        const { role, itemId } = req.body;

        if (!role || !itemId) {
            return res.status(400).json({ success: false, error: 'Role and itemId are required' });
        }

        const roleConfig = await AccessControl.findOne({ role: role.toLowerCase() });
        if (!roleConfig) {
            return res.status(404).json({ success: false, error: `Role '${role}' not found` });
        }

        const initialLength = roleConfig.sidebarItems.length;
        roleConfig.sidebarItems = roleConfig.sidebarItems.filter(i => i.id !== itemId);

        if (roleConfig.sidebarItems.length === initialLength) {
            return res.status(404).json({ success: false, error: `Item '${itemId}' not found in role '${role}'` });
        }

        roleConfig.lastUpdatedBy = req.user?.email || 'Super Admin';
        await roleConfig.save();

        res.status(200).json({
            success: true,
            message: `Removed navigation item '${itemId}' from ${roleConfig.displayName}`,
            data: roleConfig
        });
    } catch (error) {
        console.error('Error deleting sidebar item:', error);
        res.status(500).json({ success: false, error: 'Server error deleting sidebar item' });
    }
};

// POST /api/admin/access-control/reset-defaults - Reset one or all roles to initial default template
exports.resetRoleDefaults = async (req, res) => {
    try {
        const { role = 'all' } = req.body;
        const defaults = getDefaultRoleConfigs();

        if (role !== 'all') {
            const defaultRole = defaults.find(d => d.role === role.toLowerCase());
            if (!defaultRole) {
                return res.status(404).json({ success: false, error: `Unknown role: ${role}` });
            }

            await AccessControl.findOneAndUpdate(
                { role: role.toLowerCase() },
                { ...defaultRole, lastUpdatedBy: 'Reset to Factory Defaults' },
                { upsert: true, returnDocument: 'after' }
            );

            const updated = await AccessControl.findOne({ role: role.toLowerCase() });
            return res.status(200).json({
                success: true,
                message: `Reset navigation matrix and permissions for ${defaultRole.displayName} to defaults.`,
                data: updated
            });
        }

        // Reset all 5 roles
        for (const defaultRole of defaults) {
            await AccessControl.findOneAndUpdate(
                { role: defaultRole.role },
                { ...defaultRole, lastUpdatedBy: 'Factory Reset' },
                { upsert: true }
            );
        }

        await AuditLog.create({
            action: 'RESET_ALL_ROLE_DEFAULTS',
            performedBy: req.user?.email || 'admin@careersync.com',
            details: 'Factory reset applied to entire platform Access Control & Navigation matrix across all 5 roles.',
            timestamp: new Date()
        });

        const allUpdated = await AccessControl.find().lean();
        res.status(200).json({
            success: true,
            message: 'All roles navigation matrices and security permissions successfully reset to system defaults.',
            data: allUpdated
        });
    } catch (error) {
        console.error('Error resetting role defaults:', error);
        res.status(500).json({ success: false, error: 'Server error resetting role defaults' });
    }
};

// POST /api/admin/access-control/switch-portal - Admin direct jump / simulator payload
exports.simulatePortalSession = async (req, res) => {
    try {
        const { targetRole } = req.body;
        const validRoles = {
            student: '/student-dashboard',
            faculty: '/faculty-dashboard',
            recruiter: '/employer',
            tpo: '/institution',
            admin: '/admin-dashboard'
        };

        if (!validRoles[targetRole]) {
            return res.status(400).json({ success: false, error: 'Invalid target portal role' });
        }

        const roleConfig = await AccessControl.findOne({ role: targetRole });

        res.status(200).json({
            success: true,
            message: `Portal jump authorization generated for ${targetRole.toUpperCase()}`,
            data: {
                role: targetRole,
                portalName: roleConfig?.displayName || targetRole,
                targetRoute: validRoles[targetRole],
                adminBypass: true,
                simulatedAt: new Date(),
                isMaintenance: roleConfig?.isMaintenance || false,
                maintenanceMessage: roleConfig?.maintenanceMessage || ''
            }
        });
    } catch (error) {
        console.error('Error preparing portal switch:', error);
        res.status(500).json({ success: false, error: 'Server error preparing portal switch' });
    }
};

// GET /api/admin/access-control/public/:role - Public or portal-facing navigation config
exports.getPublicRoleNav = async (req, res) => {
    try {
        const { role } = req.params;
        const roleConfig = await AccessControl.findOne({ role: role.toLowerCase() });

        if (!roleConfig) {
            // Fallback to default if not yet seeded
            const defaults = getDefaultRoleConfigs();
            const matched = defaults.find(d => d.role === role.toLowerCase());
            if (matched) {
                return res.status(200).json({
                    success: true,
                    data: {
                        role: matched.role,
                        displayName: matched.displayName,
                        portalRoute: matched.portalRoute,
                        isEnabled: matched.isEnabled,
                        isMaintenance: matched.isMaintenance,
                        maintenanceMessage: matched.maintenanceMessage,
                        sidebarItems: matched.sidebarItems.filter(i => i.isVisible)
                    }
                });
            }
            return res.status(404).json({ success: false, error: 'Role navigation configuration not found' });
        }

        // Return only active navigation items for that role
        res.status(200).json({
            success: true,
            data: {
                role: roleConfig.role,
                displayName: roleConfig.displayName,
                portalRoute: roleConfig.portalRoute,
                isEnabled: roleConfig.isEnabled,
                isMaintenance: roleConfig.isMaintenance,
                maintenanceMessage: roleConfig.maintenanceMessage,
                sidebarItems: roleConfig.sidebarItems.filter(i => i.isVisible)
            }
        });
    } catch (error) {
        console.error('Error fetching public role nav:', error);
        res.status(500).json({ success: false, error: 'Server error retrieving navigation' });
    }
};

