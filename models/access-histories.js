const mongoose = require('mongoose');
const { Schema } = mongoose;

const AccessHistorySchema = new Schema({
    link_id: { type: Schema.ObjectId, ref: 'links', required: true },
    count: { type: Number, required: true, default: 1 },
    last_visited_at: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('access_histories', AccessHistorySchema);
