const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
    meetingDate: { type: Date },
    name: { type: String },
    phone: { type: String },
    animalType: { type: Number },
    foodType: { type: Number },
    lastModifiedDate: { type: Date },
});

module.exports = mongoose.model('Meeting', MeetingSchema);