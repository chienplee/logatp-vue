import Parse from "parse";
export default {

async  getLastFlightRecord (){
    var obj={};
    const currentUser = Parse.User.current();
    if (currentUser) {
        const query1 = new Parse.Query("Flight");
        var flightData = await query1.find();
        const limit= flightData.length-1;
        query1.skip(limit)
        flightData = await query1.find();
        // console.log("results",results);
         try {

           for (const object of flightData) {
             const Date = object.get("FlightDate");
             const Destination = object.get("DestinatonAirport");
             const Departure = object.get("DepartureAirport");
             const AirCraftType = object.get("AircraftType");
             const crew = object.get("Crew2");

            obj={
                'date':Date,
                'destination':Destination,
                'departure':Departure,
                'aircraft':AirCraftType,
                'crew':crew
            }
            //  arr.push({ name: LastName });
            //  console.log("last flight object", obj);
             return obj;
           }
         } catch (error) {
           console.error("Error", error);
         }
      }
    },
   
    
    

}

