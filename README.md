
# Housing Data Management API

The Housing Data Management API is a RESTful API designed to manage data related to housing units. It provides endpoints for retrieving all data or specific records based on various filters, deleting records, and adding new records. The API also includes a service for extracting data from websites and saving it to the database under a specific format, as well as a service for extracting data from uploaded files and saving it to the database. The API can be used to manage large amounts of housing data efficiently and effectively.



## Usage

### Retrieving all data

To retrieve all data saved into the database, make a GET request to the following endpoint:
```javascript
http://localhost:5000/api/v1/data/
```
```javascript
 {
        "_id": "641dbeefa2eb8cdee9214ad1",
        "address": "67 Greenwood Angus",
        "dateCollected": "3/24/2023",
        "municipality": "angus",
        "HousingType": "unlear",
        "unitSize": "4",
        "qtyBathrooms": "2",
        "secondarySuite": "unclear",
        "typeSecondarySuite": "unclear",
        "monthCollected": "march",
        "utilitiesIncluded": "part",
        "possibleDuplicate": "unclear",
        "totalCost": 2750,
        "postCode": "unclear",
        "landlordType": "unclear",
        "stability": "unclear",
        "source": "https://www.agsecure.ca",
        "createdAt": "2023-03-24T15:17:03.465Z",
        "updatedAt": "2023-03-24T15:17:03.465Z",
        "__v": 0
    },
```

The response will contain an array of objects representing each record in the database.

### Retrieving data by filters
To retrieve data by filters, make a GET request to the following endpoint with the desired filters as query parameters:
```javascript
http://localhost:5000/api/v1/data/?filter1=value1&filter2=value2&..
```
The response will contain an array of objects representing each record in the database that matches the specified filters.

### Deleting a record
To delete a record from the database, make a DELETE request to the following endpoint with the ID of the record to be deleted:
```javascript
http://localhost:5000/api/v1/data/?_id={id}
```
The response will indicate whether the record was successfully deleted or not.

### Adding new data
To add new data to the database by extracting it from a website, make a POST request to the following endpoint:
```javascript
http://localhost:5000/api/v1/runapp
```
The request should include the necessary information to extract the data from the website.

### Adding new data from a file

To add new data to the database by extracting it from an uploaded file, make a POST request to the following endpoint:
```javascript
http://localhost:5000/api/v1/runappfile
```
The request should include the uploaded file with the necessary information.

#### Filters
The following filters are available for retrieving data by filters:
```javascript
* address: String
* dateCollected:String
* municipality:String
* HousingType:String
* monthCollected:String
* unitSize:String
* qtyBathrooms:String
* secondarySuite:String
* typeSecondarySuite:String
* utilitiesIncluded:String
* totalCost:Number
* landlordType:String
* stability:String
* possibleDuplicate:String
* postCode:String
* source:String
* max:String
* min:String
```
## Usage/Examples


- To retrieve all records with a total cost less than 1000 and a unit size of 2, make a GET request to the following endpoint:

```javascript
http://localhost:5000/api/v1/data/?max=1000&unitSize=2
```
- To delete a record with an ID of "641dbeefa2eb8cdee9214aec", make a DELETE request to the following endpoint:

```javascript
http://localhost:5000/api/v1/data/?_id=641dbeefa2eb8cdee9214aec
```



## Installation

    1) Clone this repository to your local machine.
    2) Install the necessary dependencies by running npm install.
    3) Start the server by running npm start.

 ##  Dependencies
This API requires the following dependencies:

- express js
- mongoose
- dotenv
- cheerio JS