class DataService {
  constructor() {
    this.ads = [];
  }

 async findAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ "WHAT DOES IT RETURN?: ": "Return All DATA form the DB" });
      }, 2000);
    });
  }
  // async findAll() {
  //   return { "WHAT DOES IT RETURN?: ": "Return All DATA form the DB" };
  // }

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
