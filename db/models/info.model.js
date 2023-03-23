const mongoose = require('mongoose');
const schema = mongoose.Schema;
const infoSchema = new schema({
    address :{type:String}, //date
    dateCollected: { type: String },
    municipality:{ type: String }, //ex: Bradford West , Midland, Wasaga Beach
    HousingType: { type: String }, //Shared, Apartment, Attached, Detached, Unclear
    unitSize: { type: String },
    qtyBathrooms: { type: String }, //Number or String?
    secondarySuite: { type: String }, //Yes, No, Unclear
    typeSecondarySuite: { type: String }, //Yes, No, Unclear
    monthCollected: { type: String },
    utilitiesIncluded: { type: String }, //Yes, No, Part, N/S, Partly<=50%, Partly>50%
    possibleDuplicate: { type: String }, //Note listing as a possible duplicate
    totalCost: { type: String },
    postCode: { type: String },
    landlordType: { type: String },
    stability: { type: String }, //Short-Term, Long Term, Not Stated
    source: { type: String },
}, {
    timestamps: true,
});

const InformationSchema = mongoose.model('infoSchema', infoSchema);
module.exports = InformationSchema;