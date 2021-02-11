const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const bcrypt = require('bcrypt');
//const SALT_WORK_FACTOR = 10;

// Create Schema

const UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    entryDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
})

// UserSchema.pre('save', async function save(next) {
//     if (!this.isModified('password')) return next();
//     try {
//         const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
//         this.password = await bcrypt.hash(this.password, salt);
//         return next();
//     } catch (err) {
//         return next(err);
//     }
// });

// UserSchema.methods.validatePassword = async function validatePassword(data) {
//     return bcrypt.compare(data, this.password);
// };

module.exports = User = mongoose.model('user', UserSchema);