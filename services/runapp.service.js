const cheerio = require("cheerio");
const axios = require("axios");

let adsObject = {
  listanza: {
    locations: [
      {
        name: "Barrie",
        url: "https://www.listanza.com/home-for-rent/loc_barrie/in_us/p_0/",
        data: [
          // {
          //   id:'',
          //   picture: "",
          //   source: "",
          //   monthCollected: "",
          //   dateCollected: "",
          //   localMunicipality: "",
          //   town: "",
          //   stratifiedArea: "",
          //   streetNumber: "",
          //   StreetName: "",
          //   streetType: "",
          //   postalCode: "",
          //   housingType: "",
          //   size: "",
          //   secondarySuite: "",
          //   typeOfSecondarySuite: "",
          //   monthlyRent: "",
          //   utilitiesIncluded: "",
          //   CostAddHydro: "",
          //   CostAddGas: "",
          //   Adjusted: "",
          //   landlordType: "",
          //   stability: "",
          //   possibleDuplicate: "",
          // },
        ],
      },
      {
        name: "Wasaga Beach",
        url: "https://www.listanza.com/home-for-rent/loc_wasaga/in_us/p_0/",
        data: [],
      },
      {
        name: "Midland",
        url: "https://www.listanza.com/home-for-rent/loc_midland+on/in_us/p_0/",
        data: [],
      },
      {
        name: "Orillia",
        url: "https://www.listanza.com/home-for-rent/loc_orillia/in_us/p_0/",
        data: [],
      },
      {
        name: "Innisfil",
        url: "https://www.listanza.com/home-for-rent/loc_innisfil/in_us/p_0/",
        data: [],
      },
      {
        name: "Penetanguishene",
        url: "https://www.listanza.com/home-for-rent/loc_penetanguishene/in_us/p_0/",
        data: [],
      },
      {
        name: "Collinwood",
        url: "https://www.listanza.com/home-for-rent/loc_collingwood/in_us/",
        data: [],
      },
    ],
  },
};

const runappService = {
  // ----------------- Function to scrape listanza.com website
  listanza(loc) {
    let linksListAd = [];
    
    return (
      axios.get(loc.url)
        // To grab the pagination links
        .then((response) => {
          let $ = cheerio.load(response.data);
          let pagination = [loc.url];
          $(
            "#app > div.container-fluid.container-grey > div > div.pagination > div > ul > li> a"
          ).each((i, e) => {
            pagination.push("https://www.listanza.com/" + $(e).attr("href"));
          });
          return pagination;
        })

        // Looping pagination[] and fetching the data from each number page
        .then((pagination) => {
          const requests = pagination.map((page) => {
            return axios.get(page).then((results) => {
              let $ = cheerio.load(results.data);
              $(
                "#grid-inner > article > div.searchitem-in > div.searchitem-imgbox > div > a"
              ).each((i, e) => {
                linksListAd.push($(e).attr("href"));
                return $(e).attr("href");
              });
            });
          });
          return Promise.all(requests);
        })

        .then(() => {
          // loc.data.push(linksListAd);
          // console.log(linksListAd);

          const requests = linksListAd.map((singleAd) => {
            return axios.get(singleAd).then((results) => {
              let $ = cheerio.load(results.data);
              let data = {};
              data.monthlyRent = $(
                "#app > div.container-fluid.container-grey > div > div.ltcol > div:nth-child(6) > ul > li:nth-child(5) > span.price.value"
              ).first().text();

              loc.data.push(data);
            });
          });
          // console.log('hola desde 123')
          return Promise.all(requests);
        })
    );
  },

  // Function to run all the services
  async run() {
    await axios
      .all(
        adsObject.listanza.locations.map((loc) => {
          return this.listanza(loc);
        })
      )
      .then(() => {
        // console.log("hello from 138")
        console.log(adsObject.listanza.locations[0].data);
      });
  },
};

module.exports = runappService;
