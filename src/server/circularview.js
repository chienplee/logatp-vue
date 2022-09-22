import Parse from "parse";
export default {
  async getCircularViews() {
    var obj = {};
    const currentUser = Parse.User.current();
    if (currentUser) {
      var query = new Parse.Query("circularviews");
      const data = await query.first();
      // console.log(data);
      if (data) {
        const totaldays1 = data.get("totaldays1");
        const totaldays2 = data.get("totaldays2");
        const totaldays3 = data.get("totaldays3");
        const totaldays4 = data.get("totaldays4");
        const totaldays5 = data.get("totaldays5");
        const totaldays6 = data.get("totaldays6");
        const totalHours1 = data.get("totalHours1");
        const totalHours2 = data.get("totalHours2");
        const totalHours3 = data.get("totalHours3");
        const totalHours4 = data.get("totalHours4");
        const totalHours5 = data.get("totalHours5");
        const totalHours6 = data.get("totalHours6");
        const setPicFlight = data.get("setPicFlight");
        const experienceHours = data.get("experienceHours");



        obj = {
          totaldays1: totaldays1,
          totaldays2: totaldays2,
          totaldays3: totaldays3,
          totaldays4: totaldays4,
          totaldays5: totaldays5,
          totaldays6: totaldays6,
          totalHours1: totalHours1,
          totalHours2: totalHours2,
          totalHours3: totalHours3,
          totalHours4: totalHours4,
          totalHours5: totalHours5,
          totalHours6: totalHours6,
          setPicFlight:setPicFlight,
          experienceHours:experienceHours
        };
      } else {
        obj = {
          totaldays1: 7,
          totaldays2: 30,
          totaldays3: 90,
          totaldays4: 183,
          totaldays5: 365,
          totaldays6: 0,
          totalHours1: 32,
          totalHours2: 120,
          totalHours3: 300,
          totalHours4: 600,
          totalHours5: 1000,
          totalHours6: 0,
          setPicFlight:false,
          experienceHours:false
        };
      }
    }

    return obj;
  },
};
