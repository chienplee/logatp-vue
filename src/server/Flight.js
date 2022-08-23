import Parse from "parse";
import moment from "moment";
import JsHelper from "../helper/JsHelper";
import user from "./user";

export default {
  async getLastFlightRecord() {
    var obj = {};
    const currentUser = Parse.User.current();
    if (currentUser) {
      const query1 = new Parse.Query("Flight");
      var flightData = await query1.find();
      const limit = flightData.length - 1;
      query1.skip(limit);
      flightData = await query1.find();
      // console.log("results",results);
      try {
        for (const object of flightData) {
          const Date = object.get("FlightDate");
          const Destination = object.get("destination");
          const Departure = object.get("departure");
          const Airplane = object.get("airplanePointer");
          const pilot = object.get("pilotInCommandPointer");
          const crew2 = object.get("crew2Pointer");
          const crew3 = object.get("crew3Pointer");
          const crew4 = object.get("crew4Pointer");

          obj = {
            date: Date,
            destination: Destination,
            departure: Departure,
            airplane: Airplane,
            pilot: pilot,
            crew2: crew2,
            crew3: crew3,
            crew4: crew4,
          };
          //  arr.push({ name: LastName });
          //  console.log("last flight object", obj);
          return obj;
        }
      } catch (error) {
        console.error("Error", error);
      }
    }
  },
  async getFlights() {
    const flight = new Parse.Query("Flight");
    flight.descending("createdAt");
    var flightData = await flight.find();
    if (flightData.length) {
      return flightData;
    }
    return [];
  },

  async getCurrentUserFlights() {
    const currentUser = Parse.User.current();
    if (currentUser) {
      const flight = new Parse.Query("Flight");
      flight.descending("createdAt");
      var flightData = await flight.find();
      if (flightData.length) {
        return flightData;
      }
      return [];
    }
  },
  async getCrewMemberFlights(name) {
    const currentUser = Parse.User.current();
    if (currentUser) {
      const pilotInCommand = new Parse.Query("Flight");
      pilotInCommand.equalTo("pilotInCommand", name);
      const crew2 = new Parse.Query("Flight");
      crew2.equalTo("crew2", name);
      const crew3 = new Parse.Query("Flight");
      crew3.equalTo("crew3", name);
      const crew4 = new Parse.Query("Flight");
      crew4.equalTo("crew4", name);

      var flightQ = Parse.Query.or(pilotInCommand, crew2, crew3, crew4);

      flightQ.descending("createdAt");
      var flightData = await flightQ.find();
      if (flightData.length) {
        return flightData;
      }
      return [];
    }
  },

  async getFlight(flightId) {
    const flight = new Parse.Query("Flight");
    flight.include("departureAirport");
    flight.include("destinationAirport");
    flight.include("pilotInCommandPointer");
    flight.include("crew2Pointer");
    flight.include("crew3Pointer");
    flight.include("crew4Pointer");
    var flightData = await flight.get(flightId);
    if (flightData.id) {
      return flightData;
    }
    return [];
  },

  async getFlightsForMap() {
    var obj ={
      deps:[],
      dests:[],
      airpots:[]
    }
   if(user.getCurrentUser()){
    const flight = new Parse.Query("Flight");
    
    flight.include("departureAirport");
    flight.include("destinationAirport");
    var flightData = await flight.find();

    for(const object of flightData) {
      // console.log("obj",object.get("departureAirport"))
      obj.deps.push(object.get("departureAirport"))
      obj.dests.push(object.get("destinationAirport"))
      obj.airpots.push([object.get("departureAirport"),object.get("destinationAirport")])


     }
   
    
      return obj;
   }
    
  
  },

  async getLastFiveFlightsRecored() {
    var obj = [];
    const currentUser = Parse.User.current();
    if (currentUser) {
      const query1 = new Parse.Query("Flight");
      var flightData = await query1.find();
      var limit = 0;

      if (flightData.length > 6) {
        limit = flightData.length - 5;
      }
      query1.skip(limit);
      flightData = await query1.find();
      console.log("5 flights", flightData);
      // console.log("results",results);
      try {
        for (const object of flightData) {
          const FlightDate = moment(object.get("flightDate")).format(
            "DD-MM-YYYY"
          );
          const departureAirport = object.get("departure");
          const destinationAirport = object.get("destination");
          const deptodes = departureAirport + "->" + destinationAirport;
          console.log(departureAirport, destinationAirport);
          const FlightNumber = object.get("flightNumber");
          const BlockTime = object.get("blockTime");
          // console.log("Flight",FlightDate)

          obj.push({
            id: object.id,
            DATE: FlightDate,
            DeparturetoDestination: deptodes,
            FlightNumber: FlightNumber,
            BlockTime: BlockTime,
          });
        }
        return obj;
      } catch (error) {
        console.error("Error", error);
      }
      console.log("onj", obj);
    }
  },

  async getDashboardData() {
    var obj = {
      aircrafts: [],
      airports: [],
      length: "",
      Hours: 0,
      HourswithMinutes: "",
      PFLanding: 0,
      PFTakeoff: 0,
    };
    const currentUser = Parse.User.current();
    if (currentUser) {
      const query1 = new Parse.Query("Flight");

      const pfTakeoffquery = new Parse.Query("Flight");
      pfTakeoffquery.equalTo("pfTakeoff", true);
      const pfTakeoffCount = await pfTakeoffquery.find();
      obj.PFTakeoff = pfTakeoffCount.length;

      const pfLandingquery = new Parse.Query("Flight");
      pfLandingquery.equalTo("pfLanding", true);
      const pfLandingCount = await pfTakeoffquery.find();
      obj.PFLanding = pfLandingCount.length;

      var flightData = await query1.find();
      var length = flightData.length;
      obj.length = length;
      flightData = await query1.find();
      // console.log("results",results);

      try {
        for (const object of flightData) {
          const ar = object.get("aircraftRegistration");
          const at = object.get("aircraftType");
          const depAir = object.get("departure");
          const desAir = object.get("destination");

          const BlockTime = object.get("blockTime");
          // console.log("bt", BlockTime);
          // obj.Hours += BlockTime;
          if (BlockTime) {
            // console.log("qqq",BlockTime)
            obj.Hours += BlockTime;
            // obj.hrs.push(BlockTime)
          }
          obj.aircrafts.push(ar, at);
          obj.airports.push(depAir, desAir);
        }

        obj.HourswithMinutes = JsHelper.mintoHourswithMin(obj.Hours);
        return obj;
      } catch (error) {
        console.error("Error", error);
      }
    }
  },
  async getNdaysHours(n) {
    var obj = {
      dates: [],
      Hours: 0,
      HourswithMinutes: "",
    };
    const currentUser = Parse.User.current();
    if (currentUser) {
      const query1 = new Parse.Query("Flight");
      var flightData = await query1.find();
      flightData = await query1.find();
      try {
        for (const object of flightData) {
          const dateFrom = moment(Date.now() - n * 24 * 3600 * 1000).format(
            "MM/DD/YYYY"
          );
          const dateTo = moment(Date.now()).format("MM/DD/YYYY");
          const FlightDate = moment(object.get("flightDate")).format(
            "MM/DD/YYYY"
          );
          if (JsHelper.dateCheck(dateFrom, dateTo, FlightDate)) {
            // console.log("yes");
            // console.log(dateFrom,dateTo,FlightDate)

            obj.dates.push(FlightDate);

            const BlockTime = parseInt(object.get("blockTime"));

            if (BlockTime) {
              obj.Hours += BlockTime;
            }
          }

          obj.HourswithMinutes = JsHelper.mintoHourswithMin(obj.Hours);
        }

        return obj;
      } catch (error) {
        console.error("Error", error);
      }
    }
  },

  async getCurrentYearHours() {
    var obj = {
      dates: [],
      Hours: 0,
      HourswithMinutes: "",
      month: "",
      toalyear: 0,
      year: "",
      Quarter1: 0,
      Quarter2: 0,
      Quarter3: 0,
      Quarter4: 0,
    };
    const currentUser = Parse.User.current();
    if (currentUser) {
      const query1 = new Parse.Query("Flight");
      var flightData = await query1.find();
      flightData = await query1.find();
      const now = new Date();

      const firstday = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      // console.log(lastDay);

      const currentYear = new Date().getFullYear();
      console.log(currentYear);

      const firstDayYear = new Date(currentYear, 0, 1);
      const q1f = new Date(currentYear, 3, 1);
      const q1L = new Date(currentYear, 5, 30);

      const q2f = new Date(currentYear, 6, 1);
      const q2L = new Date(currentYear, 8, 30);

      const q3f = new Date(currentYear, 9, 1);
      const q3L = new Date(currentYear, 12, 31);
      const q4f = new Date(currentYear, 0, 1);
      const q4L = new Date(currentYear, 2, 31);

      console.log("q1f", q1f);
      console.log("q1L", q1L);

      console.log(firstDayYear);

      const lastDayYear = new Date(currentYear, 11, 31);
      console.log(lastDayYear);

      obj.month = moment(firstday).format("MMMM ");
      obj.year = moment(firstday).format("YYYY ");
      try {
        for (const object of flightData) {
          const FlightDate = moment(object.get("flightDate")).format(
            "MM/DD/YYYY"
          );
          // console.log("df", dateFrom, dateTo);
          const BlockTime = parseInt(object.get("blockTime"));

          if (JsHelper.dateCheck(firstday, lastDay, FlightDate)) {
            obj.dates.push(FlightDate);

            if (BlockTime) {
              obj.Hours += BlockTime;
            }
          }
          if (JsHelper.dateCheck(firstDayYear, lastDayYear, FlightDate)) {
            if (BlockTime) {
              obj.toalyear += BlockTime;
            }
          }
          if (JsHelper.dateCheck(q1f, q1L, FlightDate)) {
            if (BlockTime) {
              obj.Quarter1 += BlockTime;
            }
          }
          if (JsHelper.dateCheck(q2f, q2L, FlightDate)) {
            if (BlockTime) {
              obj.query2 += BlockTime;
            }
          }
          if (JsHelper.dateCheck(q3f, q3L, FlightDate)) {
            if (BlockTime) {
              obj.query3 += BlockTime;
            }
          }
          if (JsHelper.dateCheck(q4f, q4L, FlightDate)) {
            if (BlockTime) {
              obj.query4 += BlockTime;
            }
          }

          obj.HourswithMinutes = JsHelper.mintoHourswithMin(obj.Hours);
        }

        return obj;
      } catch (error) {
        console.error("Error", error);
      }
    }
  },
  async getSummary(year) {
    var obj = {
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
    };
    const currentUser = Parse.User.current();
    if (currentUser) {
      const query1 = new Parse.Query("Flight");
      var flightData = await query1.find();
      obj.flights = flightData.length;
      const setYear = "01" + "/" + "01" + "/" + year;
      const now = new Date(setYear).getFullYear();

      const firstday = new Date(now, 0, 1);
      const lastDay = new Date(now, 11, 31);

      // console.log("fs", firstday, "ls", lastDay);
      const pfTakeoffquery = new Parse.Query("Flight");
      pfTakeoffquery.equalTo("pfTakeoff", true);
      const pfTakeoffCount = await pfTakeoffquery.find();
      obj.takeoffs = pfTakeoffCount.length;

      const pfLandingquery = new Parse.Query("Flight");
      pfLandingquery.equalTo("pfLanding", true);
      const pfLandingCount = await pfTakeoffquery.find();
      obj.landings = pfLandingCount.length;

      const picHours = new Parse.Query("Flight");
      picHours.equalTo("picTime", true);
      const picHoursCount = await pfTakeoffquery.find();
      obj.picHours = picHoursCount.length;

      const goAroundQuery = new Parse.Query("Flight");
      goAroundQuery.equalTo("goAround", true);
      const goAroundCount = await goAroundQuery.find();
      obj.goArounds = goAroundCount.length;

      const divertedQuery = new Parse.Query("Flight");
      divertedQuery.equalTo("diverted", true);
      const divertedCount = await pfTakeoffquery.find();
      obj.diversions = divertedCount.length;

      const autolandQuery = new Parse.Query("Flight");
      autolandQuery.equalTo("autoland", true);
      const autolandCount = await pfTakeoffquery.find();
      obj.autolands = autolandCount.length;

      // console.log("results",results);
      try {
        for (const object of flightData) {
          const FlightDate = moment(object.get("flightDate")).format(
            "MM/DD/YYYY"
          );
          const BlockTime = parseInt(object.get("blockTime"));
          const totalPayload = parseInt(object.get("totalPayload"));
          const flightplanDistance = parseInt(object.get("flightplanDistance"));
          const totalPassangers = parseInt(object.get("totalPassangers"));
          const approachType = object.get("approachType");
          obj.approachTypes.push(approachType);
          const ar = object.get("aircraftRegistration");
          const at = object.get("aircraftType");
          const depAir = object.get("departure");
          const desAir = object.get("destination");
          obj.aircrafts.push(ar, at);
          obj.airports.push(depAir, desAir);
          if (totalPassangers) {
            obj.totalPassangers += totalPassangers;
          }
          if (totalPayload) {
            obj.totalpayload += totalPayload;
          }
          if (flightplanDistance) {
            obj.totapFlightPlanDistance += flightplanDistance;
          }

          if (JsHelper.dateCheck(firstday, lastDay, FlightDate)) {
            // console.log("bt", BlockTime);
            // console.log("yes");
            if (BlockTime) {
              obj.Hours += BlockTime;
            }
          }
        }

        return obj;
      } catch (error) {
        console.error("Error", error);
      }
    }
  },
  async getRecentTakeoffsLandings() {
    var obj = {
      m1name: "",
      m2name:"",
      m3name:"",
      m1T: 0,
      m2T: 0,
      m3T: 0,
      m1L:0,
      m2L:0,
      m3L:0,
      recentTakeoffs:[],
      recentLandings:[],
      dates:[]

    };

    if (user.getCurrentUser()) {
      console.log("hello");


      const query = new Parse.Query("Flight");
      var flightData = await query.find();
      const limit = flightData.length - 3;
      query.skip(limit);
      flightData = await query.find();
      for (const object of flightData) {
        const Departure = object.get("departure");
        const Destination = object.get("destination");

        const FlightDate = moment(object.get("flightDate")).format(
          "MMMM Do YYYY"
        );
        const FlightDates = moment(object.get("flightDate")).format("MM/DD/YYYY"
          
        );
        obj.recentTakeoffs.push({dep:Departure,date:FlightDate})
        obj.dates.push(FlightDates)
        obj.recentLandings.push({des:Destination,date:FlightDate})


        console.log(Departure,FlightDate)

      }


      console.log("fd",flightData)






      const query1 = new Parse.Query("Flight");
      query1.equalTo("pfTakeoff", true);
      var flightData1 = await query1.find();


      const query2 = new Parse.Query("Flight");
      query2.equalTo("pfLanding", true);
      var flightData2 = await query1.find();

      console.log("fd", flightData1);
      const now = new Date();

      const firstday = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      console.log("fs", "ld", firstday, lastDay);
      obj.m1name = moment(firstday).format("MMMM ");

      const lastmonthlastdate = moment()
        .subtract(1, "months")
        .startOf("month")
        .format("MM/DD/YYYY");
      console.log(lastmonthlastdate);
      obj.m2name = moment(lastmonthlastdate).format("MMMM ");


      const lastmonthfirstdate = moment()
        .subtract(1, "months")
        .endOf("month")
        .format("MM/DD/YYYY");
      console.log(lastmonthfirstdate);


      const lastsecondsmonthlastdate = moment()
        .subtract(2, "months")
        .startOf("month")
        .format("MM/DD/YYYY");
      console.log(lastsecondsmonthlastdate);
      obj.m3name = moment(lastsecondsmonthlastdate).format("MMMM");


      const lastsecondmonthfirstdate = moment()
        .subtract(2, "months")
        .endOf("month")
        .format("MM/DD/YYYY");
      console.log(lastsecondmonthfirstdate);

      try {
        for (const object of flightData1) {
          const FlightDate = moment(object.get("flightDate")).format(
            "MM/DD/YYYY"
          );
          if (JsHelper.dateCheck(firstday, lastDay, FlightDate)) {
            obj.m1T += obj.m1T;
          }
          if (JsHelper.dateCheck(lastmonthfirstdate, lastmonthlastdate, FlightDate)) {
            obj.m2T += obj.m1T;
          }
          if (JsHelper.dateCheck(lastsecondsmonthlastdate, lastsecondmonthfirstdate, FlightDate)) {
            obj.m3T += obj.m3T;
          }
        }

        for (const object of flightData2) {
          const FlightDate = moment(object.get("flightDate")).format(
            "MM/DD/YYYY"
          );
          if (JsHelper.dateCheck(firstday, lastDay, FlightDate)) {
            obj.m1L += obj.m1L;
          }
          if (JsHelper.dateCheck(lastmonthfirstdate, lastmonthlastdate, FlightDate)) {
            obj.m2L += obj.m1L;
          }
          if (JsHelper.dateCheck(lastsecondsmonthlastdate, lastsecondmonthfirstdate, FlightDate)) {
            obj.m3L += obj.m3L;
          }
        }
        return obj;
      } catch (error) {
        console.log("error", error);
      }
    }
  },
};
