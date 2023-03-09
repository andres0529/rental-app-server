const cheerio = require("cheerio");
const axios = require("axios");

let db = {
  barrie: [],
  bradford: [],
  newTecumseth: [],
  collinwood: [],
  wasaga: [],
  angus: [],
  midland: [],
  orillia: [],
  inisfill: [],
  penetanguishene: [],
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
    return `****Error scrapping from ${source} : ${error} ****`;
  }
};

/*

// ❌ ****************** gottarent.com scraping *****************
// anti-scraping which does not allow bring the info
const gotarrent = async () => {
  let url = "https://www.gottarent.com/simcoe-region-on-rentals/";
  // custom path for grab elements into gotarrent.com
  let path = {
    pagination: "#pagi14200 > pagination > div > right > a",
    ads: "",
  };
  // call the function pagination for each location of listanza.com
  let pagination = await getPagination(url, path.pagination, "gottarent");
  return pagination;
};
// ❌ ****************** zolo.com scraping *****************
// anti-scraping which does not allow bring the info
const zolo = async () => {
  let source = "https://www.zolo.ca";
  let urls = [
    `${source}/barrie-real-estate/for-rent`,
    `${source}/midland-real-estate/for-rent`,
    `${source}/bradford-west-gwillimbury-real-estate/for-rent`,
    `${source}/new-tecumseth-real-estate/for-rent`,
    `${source}/essa-real-estate/for-rent`,
    `${source}/innisfil-real-estate/for-rent`,
    `${source}/springwater-real-estate/for-rent`,
    `${source}/clearview-real-estate/for-rent`,
    `${source}/collingwood-real-estate/for-rent`,
    `${source}/wasaga-beach-real-estate/for-rent`,
    `${source}/penetanguishene-real-estate/for-rent`,
    `${source}/tay-real-estate/for-rent`,
    `${source}/tiny-real-estate/for-rent`,
    `${source}/orillia-real-estate/for-rent`,
    `${source}/oro-medonte-real-estate/for-rent`,
    `${source}/ramara-real-estate/for-rent`,
    `${source}/severn-real-estate/for-rent`,
  ];
  let path = {
    pagination:
      "#listing_container > section.supplementary-nav.xs-my6.xs-flex.xs-flex-column.xs-flex-align-center > nav.xs-hide.md-flex a",
    ads: "",
  };

  let pagination = Promise.all(
    // call the function pagination for each location of zolo.ca
    urls.map(async (url) => {
      let urlPages = await getPagination(url, path.pagination, source);
      // to add the first page when an empty array is returned or when is got more than 1 element
      urlPages.length === 0 ? urlPages.unshift(url) : "";
      return urlPages;
    })
  );

  return pagination;
};

// ❌ ****************** livewithbk.com scraping *****************
// This page does not need pagination
const livewithbk = async () => {
  let source = "https://www.livewithbk.com/";
  let url = "https://www.livewithbk.com/property-rentals";
  let path = {
    adCard: "#1359157006",
  };
  const response = await axios.get(url);
  let $ = cheerio.load(response.data);
  let price = $("body");
  return "";
};
*/
// ✅ ****************** shorelinepropertymanagement.ca scraping *****************
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
      let city = $(e).attr("data-location").split(",")[0].toLowerCase();
      if (Object.prototype.hasOwnProperty.call(db, city)) {
        let info = {
          municipality: $(e).attr("data-location").split(",")[0].toLowerCase(),
          HousingType: $(e).attr("data-type"),
          unitSize: $(e).attr("data-square-feet"),
          secondarySuite: "Unclear",
          typeSecondarySuite: "Unclear",
          utilitiesIncluded: "yes",
          totalCost: $(e).attr("data-rent"),
          landlordType: "unclear",
          stability: "unclear",
          possibleDuplicate: "unclear",
          source: source,
        };
        db[info.municipality.split(",")[0].toLowerCase()].push(info);
      }
    });
    return { status: 200, message: `Information saving correctly from ${source}` };
  } catch (error) {
    return `****Error scrapping from ${source} : ${error} ****`;
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
    ads: "",
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
      urlPages.length === 0 ? urlPages.unshift(url) : "";
      return urlPages;
    })
  );

  return pagination;
};

// ✅ ****************** agsecure.com scraping *****************
// This page does not need pagination
const agsecure = async () => {
  let source = "https://www.agsecure.ca";
  let baseUrl = `${source}listings/`;

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
    ads: "",
  };

  return "data";
};

// ✅ ****************** freerentads.com scraping *****************
const freerentads = async () => {
  let source = "https://www.freerentads.com/";
  let baseUrl = `${source}/rentals-properties-for-rent-simcoe-county-on-canada-QQSZ17294-6N1CpS`;

  // custom path for grab elements into freerentads.com
  let path = {
    pagination:
      "#app > div.container-fluid.container-grey > div > div.pagination > div > ul > li> a",
    ads: "",
  };

  return "data";
};

// ✅ ****************** kijiji.com scraping *****************
const kijiji = () => {};

// *****************+ Main Function ********************
const runappService = async () => {
  return shorelinepropertymanagement();
  //return await listanza();
  //return await agsecure();
  //return await freerentads();
  //return await kijiji();
};

module.exports = runappService;
