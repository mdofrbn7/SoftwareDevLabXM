const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    category: String,
    name: String,
    author: String

}, {
    timestamps: true
});

module.exports = mongoose.model('Library', NoteSchema);