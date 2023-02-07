const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    from_user: {
        type: String,
        ref: 'User',
        required: true
    },
    room: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date_sent: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Message', messageSchema);
