const mongoose = require('mongoose');

const BoxSchema = new mongoose.Schema({
    position: { type: Array },
    freeDates: { type: Array },
    positionText: { type: String },
    lastModifiedDate: { type: Date },
});

module.exports = mongoose.model('Box', BoxSchema);