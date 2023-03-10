class DataService {
  constructor() {
    this.ads = [];
  }

  async findAll() {
    const dbConnection = require('./../db/config')
    let information = require('../db/models/info.model');
    const records = information.find();
    
    return records;
  }


  async findbyFilter(queries) {
    let params = [];
    Object.entries(queries).forEach(([key, value]) => {
      params.push({ key, value });
    });

    return {
      "WHAT DOES IT RETURN?: ": "Return ONLY the data that meets the FILTERS",
    };
  }

  async delete() {
    return {
      "WHAT DOES IT RETURN?: ": "Return OK if the data was deleted from the DB",
    };
  }
}

module.exports = DataService;
