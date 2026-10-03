import re

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\controllers\authController.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Update login to send OTP instead of token
old_login_end = """        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};"""
new_login_end = """        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Hash it and save to user
        const crypto = require('crypto');
        user.loginOtp = crypto.createHash('sha256').update(otp).digest('hex');
        user.loginOtpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
        
        await user.save({ validateBeforeSave: false });

        console.log(`\n\n========================================`);
        console.log(`🚀 [MOCK EMAIL] OTP for ${user.email} is: ${otp}`);
        console.log(`========================================\n\n`);

        res.status(200).json({ 
            success: true, 
            message: 'Please check your mail. OTP sent.', 
            userId: user._id 
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Verify OTP and login
// @route   POST /api/v1/auth/verify-otp
// @access  Public
exports.verifyOtp = async (req, res, next) => {
    try {
        const { userId, otp } = req.body;
        
        if (!userId || !otp) {
            return res.status(400).json({ success: false, error: 'Please provide user ID and OTP' });
        }

        const crypto = require('crypto');
        const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

        const user = await User.findOne({
            _id: userId,
            loginOtp: hashedOtp,
            loginOtpExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid or expired OTP' });
        }

        // Clear OTP
        user.loginOtp = undefined;
        user.loginOtpExpire = undefined;
        await user.save({ validateBeforeSave: false });

        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};"""
content = content.replace(old_login_end, new_login_end)

with open(r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Backend\controllers\authController.js', 'w', encoding='utf-8') as f:
    f.write(content)
