/* eslint-disable no-unused-vars */
const cheerio = require("cheerio");
const axios = require("axios");

let db = {
  angus: [],
  alliston: [],
  barrie: [],
  bradford: [],
  collingwood: [],
  friday: [],
  innisfil: [],
  newTecumseth: [],
  midland: [],
  orillia: [],
  orangeville: [],
  tottenham: [],
  penetanguishene: [],
  wasaga: [],
};

// Function to manage the errors
let resultOperations = [];
const errorHandler = (error, source) => {
  let details = {
    source: source,
  };
  if (error.response) {
    Object.assign(details, {
      status: error.response.status,
      headers: error.response.headers,
    });
  } else if (error.request) {
    // The request was made but no response was received
    Object.assign(details, {
      Error: error.request,
    });
  } else {
    // Something happened in setting up the request that triggered an Error
    Object.assign(details, {
      Error: error.message,
    });
  }
  resultOperations.push(details);
};

// Function to get Data Links and return them into an Array[]
const scrapeData = async (url, path, source) => {
  let data = [];
  try {
    const response = await axios.get(url);
    let $ = cheerio.load(response.data);
    $(path).each((i, e) => {
      data.push($(e).attr("href"));
    });
    return data;
  } catch (error) {
    resultOperations.push(errorHandler(error, source));
  }
};

// Function to save data into MongoDB
const saveData = async (data) => {
  let InformationSchema = require("./../db/models/info.model.js");
  const connection = require("./../db/config.js");

  return await Promise.all(
    Object.keys(data).map((property) => {
      data[property].forEach((record) => {
        const information = new InformationSchema(record);
        information.save();
      });
    })
  )
    .then(() => {
      return "Information saved successfully";
    })

    .catch((err) => {
      return `Error : ${err}`;
    });
};

// ✅ ****************** shorelinepropertymanagement.ca scraping *****************
// This page does not need pagination
const shorelinepropertymanagement = async () => {
  let source = "https://shorelinepropertymanagement.ca";
  let url = `https://shorelinepropertymanagement.managebuilding.com/Resident/public/rentals`;
  let path = {
    ads: "#rentals-container > a.featured-listing",
  };
  try {
    const response = await axios.get(url);
    let $ = cheerio.load(response.data);
    $(path.ads).each((i, e) => {
      // grab the city
      let city = $(e).attr("data-location").split(",")[0].toLowerCase();
      let address = $(e).find("h3").text();
      // If the city name is a property in DB object
      if (Object.prototype.hasOwnProperty.call(db, city)) {
        let info = {
          address: $(e).find("h3").text(),
          dateCollected: new Date().toLocaleDateString(),
          municipality: $(e).attr("data-location").split(",")[0].toLowerCase(),
          HousingType: $(e).attr("data-type").toLowerCase(),
          unitSize: $(e).attr("data-bedrooms"),
          qtyBathrooms: $(e).attr("data-bathrooms"),
          secondarySuite: "unclear",
          typeSecondarySuite: "unclear",
          monthCollected: new Date().toLocaleString("default", {
            month: "long",
          }).toLowerCase(),
          utilitiesIncluded: "yes",
          possibleDuplicate: "unclear",
          totalCost: $(e).attr("data-rent"),
          postCode: $(e).attr("data-location").split("|")[1],
          landlordType: "unclear",
          stability: "unclear",
          source: source,
        };

        db[info.municipality.split(",")[0].toLowerCase()].push(info);
      }
    });
    resultOperations.push({ status: 200, source: source });
  } catch (error) {
    errorHandler(error, source);
  }
};

// ✅ ****************** agsecure.com scraping *****************
// This page does not need pagination
const agsecure = async () => {
  let source = "https://www.agsecure.ca";
  let baseUrl = `${source}/listings/`;

  let urls = [
    `${baseUrl}alliston`,
    `${baseUrl}angus`,
    `${baseUrl}barrie`,
    `${baseUrl}bradford`,
    `${baseUrl}collingwood`,
    `${baseUrl}friday-harbour`,
    `${baseUrl}innisfil`,
    `${baseUrl}midland`,
    `${baseUrl}orangeville`,
    `${baseUrl}orillia`,
    `${baseUrl}tottenham`,
    `${baseUrl}wasaga`,
  ];

  let path = {
    ads: "#slider > ul.slides > li.flex-active-slide > p",
    readMore:
      "#listings > div > div.listing > div.listing-txt > p.listing-details > span.pull-right > a",
  };

  try {
    // grab all the "read more" links and save them into an array called data
    let data = await Promise.all(
      urls.map(async (url) => {
        return await scrapeData(url, path.readMore, source);
      })
    );

    await Promise.all(
      data.flat().map(async (url) => {
        const response = await axios.get(`${source}${url}`);
        let $ = cheerio.load(response.data);
        let data = $("li p").first().text();
        // due to this page has a no common structure html, I delete all the extra spaces and other characters
        data = data
          .replace(/\\n/g, "")
          .replace(/\\t/g, "")
          .replace(/\\/g, "")
          .replace(/\s{2,}/g, " ")
          .split(" | ");
        let city = url.split("/")[2];

        let info = {
          address: data[0],
          dateCollected: new Date().toLocaleDateString(),
          municipality: city,
          HousingType: "unlear",
          monthCollected: new Date().toLocaleString("default", {
            month: "long",
          }).toLowerCase(),
          unitSize: $("p.listing-details")
            .first()
            .html()
            .replace(/[^0-9]+/g, "")[0],
          qtyBathrooms: $("p.listing-details")
            .first()
            .html()
            .replace(/[^0-9]+/g, "")[1],
          secondarySuite: "unclear",
          typeSecondarySuite: "unclear",
          utilitiesIncluded: data[2] === "Utilities Included" ? "yes" : "part",
          totalCost: data[1].split(" ")[0].substring(1),
          landlordType: "unclear",
          stability: "unclear",
          possibleDuplicate: "unclear",
          postCode: "unclear",
          source: source,
        };
        // the name friday harbor is spelling with a middle hypen
        if (city === "friday-harbour") {
          city = "friday";
        }

        db[`${city}`].push(info);
      })
    );
    resultOperations.push({ status: 200, source: source });
  } catch (error) {
    errorHandler(error, source);
  }
};

// ✅ ****************** Listanza.com scraping *****************
const listanza = async () => {
  let source = "https://www.listanza.com";
  let baseUrl = "https://www.listanza.com/home-for-rent/";
  let urls = [
    `${baseUrl}loc_barrie/in_us/p_0/`,
    `${baseUrl}loc_angus/in_us/p_0/`,
    `${baseUrl}loc_innisfil/in_us/p_0/`,
    `${baseUrl}loc_wasaga/in_us/p_0/`,
    `${baseUrl}loc_midland+on/in_us/p_0/`,
    `${baseUrl}loc_orillia/in_us/p_0/`,
    `${baseUrl}loc_innisfil/in_us/p_0/`,
    `${baseUrl}loc_penetanguishene/in_us/p_0/`,
    `${baseUrl}loc_collingwood/in_us/p_0/`,
  ];
  // custom path for grab elements into listanza.com
  let path = {
    pagination:
      "#app > div.container-fluid.container-grey > div > div.pagination > div > ul > li> a",
    ads: "ul.inline.card_footer > li.pull-right > a",
  };
  let pagination = await Promise.all(
    // call the function pagination for each location of listanza.com
    urls.map(async (url) => {
      let urlPages = await scrapeData(url, path.pagination, source);
      // If exist more than 1 page add the url base to all of them and add the first url which does not come by default
      if (urlPages.length > 1) {
        let urlList = urlPages.map((link) => `https://www.listanza.com${link}`);
        urlList.unshift(url);
        return urlList;
      }
      // to add the first page when an empty array is returned or when is got more than 1 element
      // urlPages.length === 0 ? urlPages.unshift(url) : "";
      return urlPages.length === 0 ? [url] : urlPages;
    })
  );
  // grab all the "view listing" link into each page
  let adsList = await Promise.all(
    pagination.flat().map(async (url) => {
      try {
        let response = await scrapeData(url, path.ads, source);
        return response;
      } catch (error) {
        resultOperations.push(errorHandler(error, source));
      }
    })
  );

  await Promise.all(
    adsList.flat().map(async (url) => {
      try {
        const response = await axios.get(url);
        let $ = cheerio.load(response.data);
        let city = url.split("rental-")[1].split("-")[0].trim();
        let info = {
          address: $("span.sub-title").text().split("ON")[0].trim(),
          dateCollected: new Date().toLocaleDateString(),
          municipality: city,
          HousingType: $("span.building.value").text().toLowerCase(),
          monthCollected: new Date().toLocaleString("default", {
            month: "long",
          }).toLowerCase(),
          unitSize: $("span.beds.value").text(),
          qtyBathrooms: $("span.baths.value").text(),
          secondarySuite: "Unclear",
          typeSecondarySuite: "Unclear",
          utilitiesIncluded:
            $("ul.listingul.includes.value").children("li").length > 0
              ? "yes"
              : "not",
          totalCost: $("h2.price").text().replace(/[^\d]/g, ""),
          landlordType: "unclear",
          stability: "unclear",
          possibleDuplicate: "unclear",
          postCode: $("span.sub-title").text().split("ON")[1].trim(),
          source: source,
        };
        db[`${city}`].push(info);
      } catch (error) {
        errorHandler(error, source);
      }
    })
  );
  resultOperations.push({ status: 200, source: source });
};

// *****************+ Main Function ********************
const runappService = async () => {
  await shorelinepropertymanagement();
  await agsecure();
  await listanza();
  await saveData(db)

  return resultOperations;
};

module.exports = runappService;
