/* eslint-disable no-unused-vars */
let InformationSchema = require("./../db/models/info.model.js");
const connection = require("./../db/config.js");
// let info = {
//   address: "",
//   dateCollected: "03/24/2023",
//   municipality: "barrie",
//   HousingType: "unlear",
//   monthCollected: "march",
//   unitSize: 9,
//   qtyBathrooms: 9,
//   secondarySuite: "unclear",
//   typeSecondarySuite: "unclear",
//   utilitiesIncluded: "Yes",
//   totalCost: 999999,
//   landlordType: "unclear",
//   stability: "unclear",
//   possibleDuplicate: "unclear",
//   postCode: "",
//   source: "Manual",
// };

const runappfileService = async (data) => {
  try {
    const information = new InformationSchema(data);
    await information.save();
    return 200;
  } catch (error) {
    return error;
  }
};

module.exports = runappfileService;
