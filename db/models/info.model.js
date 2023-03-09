const mongoose = require('mongoose');
const schema = mongoose.Schema;
const infoSchema = new schema({
    dateCollected :{type:String}, //date
    town: { type: String },
    localMunicipality:{ type: String }, //ex: Bradford West , Midland, Wasaga Beach
    housingType: { type: String }, //Shared, Apartment, Attached, Detached, Unclear
    stratifiedArea: { type: String },
    streetNo: { type: String }, //Number or String?
    streetName: { type: String },
    streetType: { type: String },
    postalCode: { type: String },
    unitSize: { type: String }, //Room, Bach, 1 Bed, 2 Bed, 3 Bed, 4 Bed, 4+ Bed
    secondarySuite: { type: String }, //Yes, No, Unclear
    monthlyRent: { type: Number },
    utilitiesIncluded: { type: String }, //Yes, No, Part, N/S, Partly<=50%, Partly>50%
    costAddHydro: { type: String },
    costAddGas: { type: String },
    stability: { type: String }, //Short-Term, Long Term, Not Stated
    possibleDuplicate: { type: String }, //Note listing as a possible duplicate
}, {
    timestamps: true,
});

const InformationSchema = mongoose.model('infoSchema', infoSchema);
module.exports = InformationSchema;