/* eslint-disable no-unused-vars */
const connection = require("./../db/config.js");
let informationSchema = require("./../db/models/info.model.js");

const dataService = {
  find: async (req, res) => {
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
