import Flight from "./Flight";
export default {
  async getAllFlightsLatLng() {
    var obj = [];
    // console.log("hi");
    Flight.getFlights().then((results) => {
      // console.log("results", results);

      for (const object of results) {
        var depAir =  object.get("departureAirport");
      // console.log("obj",object.get('departureAirport').get("latitude"))


        // console.log("lat", depAir);
        // console.log(depAir.id)
        if(depAir){
          const lt =   depAir.get("city")
          console.log("lt",lt)
        }
      }
      return obj;
    });
  },

};
