/* eslint-disable no-unused-vars */
const connection = require("./../db/config.js");
let informationSchema = require("./../db/models/info.model.js");

const dataService = {
  find: async (req, res) => {
    // If a range does not come, we assingn values by default
    const { min = 0, max = 99999 } = req.query;

    // Next two lines delete the properties from the object
    delete req.query.min;
    delete req.query.max;

    // I prepare the object to be sent it
    req.query.totalCost = { $gt: Number(min), $lt: Number(max) };
    const records = await informationSchema.find(req.query);
    return records;
  },
  // Function to Delete one record from the DB according to the DB
  delete: async (req, res) => {
    try {
      const result = await informationSchema.deleteOne({ _id: req.query._id });
      return result;
    } catch (err) {
      return err;
    }
  },
};

module.exports = dataService;
