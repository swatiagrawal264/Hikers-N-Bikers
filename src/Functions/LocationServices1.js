import axios from 'axios';
//const REACT_APP_MAPQUEST_API_KEY = "pk.eyJ1Ijoic3dhdGlhZ3Jhd2FsMjY0IiwiYSI6ImNsaGxpYjR4NTExbTczdW10N2xtY3g3YzIifQ.UPFhZ-oO2GWcyahYFgl9jA"
/**
 * Calls a 3rd party API to fetch the latitude and longitude of a given address
 * @param {*} address - receives address as input
 * @returns - latitude and longitude of the given address
 */
export const getGeo_DataURL = (address) => {
    return `https://www.mapquestapi.com/geocoding/v1/address?key=${REACT_APP_MAPQUEST_API_KEY}&location=${address}`;
   //return `https://www.mapquestapi.com/geocoding/v1/address?key=${process.env.REACT_APP_MAPQUEST_API_KEY}&location=${address}`;
};
//};

/**
 * Calculates the latitude and longitude coordinates of a given address by using another function
 * @param {*} address - receives address as input
 * @returns - latitude and longitude of the given address formatted as necessary
 */
export async function get_Lat_And_Long(address) {
    let data = [];
    await axios
      .get(getGeo_DataURL(address))
      .then((resp) => {
        try {
          const longitude = resp.data.results[0].locations[0].displayLatLng.lng;
          const latitude = resp.data.results[0].locations[0].displayLatLng.lat;
          data = [latitude, longitude];
          console.log("Latitude and Longitude received successfully")
        } catch (error) {
          console.error(
            `Error: ${error}. Error in extracting latitude and/or longitude. Please ensure that a valid address was entered.`
          );
        }
      })
      .catch((err) => {
        console.error(`Error in fetching latitude and longitude with error ${err.message}`);
        this.setState({ fetchError: true, isLoading: false });
      });
  
    return data;
}

/**
 * Calculates points in a path based on the addresses received as input and offset percentage for maximum elevation gain
 * @param {*} startAddress - starting address received as input from user
 * @param {*} endAddress - ending address received as input from user
 * @param {*} offset - offset percentage received as input from user
 * @returns - the set of coordinates of points in the path between starting and address address corresponding to the given offset and with maximum elevation gain
 */
export async function get_Max_Path(startAddress, endAddress, offset) {
    let start = await get_Lat_And_Long(startAddress);
    let end = await get_Lat_And_Long(endAddress);
    
    const request = {
      start: {
        coordinates: start,
      },
      end: {
        coordinates: end
      },
      percentage: offset,
    };

    const headers = {
      "Content-Type": "application/json",
    }

    var response = {};
    await axios
      .post(`${process.env.REACT_APP_BACKEND_BASE_URL}${process.env.REACT_APP_CALC_MAX_ENDPOINT}`, JSON.stringify(request), {headers: headers})
      .then((resp) => {
        console.log("Response received from backend successfully for calculating Max Path");
        response = resp;
      })
      .catch((err) => {
        console.log("Error in getting max path from backend ",err);
      })
    
    return response;
}

/**
 * Calculates points in a path based on the addresses received as input and offset percentage for minimum elevation gain
 * @param {*} startAddress - starting address received as input from user
 * @param {*} endAddress - ending address received as input from user
 * @param {*} offset - offset percentage received as input from user
 * @returns - the set of coordinates of points in the path between starting and address address corresponding to the given offset and with minimum elevation gain
 */
export async function get_Min_Path(startAddress, endAddress, offset) {
    let start = await get_Lat_And_Long(startAddress);
    let end = await get_Lat_And_Long(endAddress);
   
    const request = {
      start: {
        coordinates: start,
      },
      end: {
        coordinates: end
      },
      percentage: offset,
    };

    const headers = {
      "Content-Type": "application/json",
    }

    var response = {}; 
    await axios
      .post(`${process.env.REACT_APP_BACKEND_BASE_URL}${process.env.REACT_APP_CALC_MIN_ENDPOINT}`, JSON.stringify(request), {headers: headers})
      .then((resp) => {
        console.log("Response received from backend successfully for calculating Min Path");
        response = resp;
      })
      .catch((err) => {
        console.log("Error in getting min path from backend ",err);
      })

    return response;
}