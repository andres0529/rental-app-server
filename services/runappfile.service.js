const Info = require('../db/models/info.model');

const runappfileService = (data) => {
  const information = new Info(data);
  information.save((err, savedInfo) => {
    // console.log(data);
    if (err) {
      console.error(err);

      return "Error saving data: ", err.message;
    } else {
      console.log('Information saved successfully:', savedInfo);
      return data;
    }
  });
  return information
};
module.exports = runappfileService;
