const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
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

module.exports = Project = mongoose.model('project', ProjectSchema);