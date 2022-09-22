import Parse from "parse";
import moment from "moment";
import JsHelper from "../helper/JsHelper";

// import user from "./user";

export default {
  async getSummary(year) {
    var obj = {
      deps: [],
      dests: [],
      approachTypes: [],
      aircrafts: [],
      airports: [],
      Hours: 0,
      picHours: 0,
      flights: 0,
      aircradts: 0,
      takeoffs: 0,
      landings: 0,
      goArounds: 0,
      diversions: 0,
      autolands: 0,
      totalPassangers: 0,
      totalpayload: 0,
      totapFlightPlanDistance: 0,
      airportNames: [],
    };
    const currentUser = Parse.User.current();

    if (currentUser) {
      const query1 = new Parse.Query("Flight");
      var flightData = await query1.find();
      const setYear = "01" + "/" + "01" + "/" + year;
      const now = new Date(setYear).getFullYear();

      const firstday = new Date(now, 0, 1);
      const lastDay = new Date(now, 11, 31);
        // console.log(firstday,lastDay)

      try {
        for (const object of flightData) {
          const FlightDate = moment(object.get("flightDate")).format(
            "MM/DD/YYYY"
          );
          const BlockTime = parseInt(object.get("blockTime"));
          if (JsHelper.dateCheck(firstday, lastDay, FlightDate)) {
            // console.log("hi");
            obj.deps.push(object.get("departureAirport"));
            obj.dests.push(object.get("destinationAirport"));
            obj.airportNames.push([
              object.get("departureAirport"),
              object.get("destinationAirport"),
            ]);

            obj.flights = obj.flights + 1;
            const ar = object.get("aircraftRegistration");
            const pictime = object.get("picTime");
            const at = object.get("aircraftType");
            const depAir = object.get("departure");
            const desAir = object.get("destination");
            const takeoff = object.get("pfTakeoff");
            const landing = object.get("pfLanding");
            const goaround = object.get("goAround");
            const diverted = object.get("diverted");
            const autoland = object.get("autoland");
            const totalPayload = parseInt(object.get("totalPayload"));
            const flightplanDistance = parseInt(
              object.get("flightplanDistance")
            );
            const totalPassangers = parseInt(object.get("totalPassangers"));
            const approachType = object.get("approachType");
            obj.approachTypes.push(approachType);

            if (takeoff == true) {
              obj.takeoffs += 1;
            }
            if (landing == true) {
              obj.landings += 1;
            }
            if (goaround == true) {
              obj.goArounds += 1;
            }
            if (diverted == true) {
              obj.diversions += 1;
            }
            if (autoland == true) {
              obj.autolands += 1;
            }
            if (totalPassangers) {
              obj.totalPassangers += totalPassangers;
            }
            if (totalPayload) {
              obj.totalpayload += totalPayload;
            }
            if (flightplanDistance) {
              obj.totapFlightPlanDistance += flightplanDistance;
            }
            obj.aircrafts.push(ar, at);
            obj.airports.push(depAir, desAir);

            if (BlockTime) {
              obj.Hours += BlockTime;
            }
            if (pictime == true) {
              obj.picHours += BlockTime;
            }
          }
        }

        return obj;
      } catch (error) {
        console.error("Error", error);
      }
    }
  },
};
