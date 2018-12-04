const mongoose = require('mongoose');
const { Schema } = mongoose;

const LinkSchema = new Schema({
    short_link: { type: String, required: true },
    full_link: { type: String, required: true },
    gen_type: { type: String, default: 'base62' },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
    deleted_at: { type: Date, default: null },
});

module.exports = mongoose.model('links', LinkSchema);
