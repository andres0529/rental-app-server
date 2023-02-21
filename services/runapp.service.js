const cheerio = require("cheerio");
const axios = require("axios");

let adsObject = {
  listanza: {
    locations: [
      {
        name: "Barrie",
        url: "https://www.listanza.com/home-for-rent/loc_barrie/in_us/p_0/",
        data: [],
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
    ],
  },
};
const runappService = {
  // ----------------------- Function to scrape listanza.com website

  async listanza() {
    let data = [];


    
    axios
      .get(adsObject.listanza.locations[1].url)
      .then((response) => {
        let $ = cheerio.load(response.data);
        let pagination = [
          "https://www.listanza.com/home-for-rent/loc_orillia/in_us/p_0/",
        ];
        // To grab the pagination links
        $(
          "#app > div.container-fluid.container-grey > div > div.pagination > div > ul > li> a"
        ).each((i, e) => {
          pagination.push("https://www.listanza.com/" + $(e).attr("href"));
        });
        return pagination;
      })

      .then((pagination) => {
        const requests = pagination.map((page) => {
          return axios.get(page).then((results) => {
            let $ = cheerio.load(results.data);
            $(
              "#grid-inner > article > div.searchitem-in > div.searchitem-imgbox > div > a"
            ).each((i, e) => {
              data.push($(e).attr("href"));
              return $(e).attr("href");
            });
          });
        });

        return Promise.all(requests);
      })

      .then(() => {
        console.log(data);
      });
  },

  // async listanza() {
  //   // Array to saving all the urls in the pagination
  //   let pagination = [
  //     "https://www.listanza.com/home-for-rent/loc_barrie/in_us/p_0/",
  //   ];

  //   let states = [];

  //   try {
  //     let res = await axios.get(adsObject.listanza.locations[0].url);
  //     let $ = cheerio.load(res.data);
  //     // To grab the ads in page #1
  //     // $(
  //     //   "#grid-inner > article > div.searchitem-in > div.searchitem-imgbox > div > a"
  //     // ).each((i, e) => {
  //     //   states.push($(e).attr("href"));
  //     // });

  //     $(
  //       // To grab the pagination links
  //       "#app > div.container-fluid.container-grey > div > div.pagination > div > ul > li> a"
  //     ).each((i, e) => {
  //       pagination.push("https://www.listanza.com/" + $(e).attr("href"));
  //     });

  //     console.log(pagination);
  //     return states;
  //   } catch (error) {
  //     return `Error: ${error}`;
  //   }
  // },

  // Function to run all the services
  async run() {
    return await this.listanza();
  },
};

module.exports = runappService;
