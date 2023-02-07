const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const privateMessageSchema = new Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    from_user: {
        type: String,
        ref: 'User',
        required: true
    },
    to_user: {
        type: String,
        ref: 'User',
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

module.exports = mongoose.model('PrivateMessage', privateMessageSchema);
