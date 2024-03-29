const mongoose = require('mongoose');

// Setup schema
const userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
});

// Export User model
module.exports = mongoose.model('users', userSchema);