const mongoose = require('mongoose');
const schema = mongoose.Schema;
const kijijiSchema = new schema({
    housingType: { type: String },
    bedroomCount: { type: Number },
    city: { type: String },
    address: { type: String },
    monthCollected: { type: Date },
    dateCollected: { type: Date }
}, {
    timestamps: true,
});

const kijiji = mongoose.model('kijiji', kijijiSchema);
module.exports = kijiji;