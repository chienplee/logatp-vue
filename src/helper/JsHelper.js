export default {
  makeid(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  mintoHourswithMin(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + ":" + rminutes;
  },
   timeconvert(num)
   
 { 
  var obj={
    hours:0,
    min:0
  }
  var hours = Math.floor(num / 60);  
  var minutes = num % 60;
  obj.hours=hours
  obj.min=minutes
  return obj         
}
,
  dateCheck(from, to, check) {
    var fDate, lDate, cDate;
    fDate = Date.parse(from);
    lDate = Date.parse(to);
    cDate = Date.parse(check);

    if (cDate <= lDate && cDate >= fDate) {
      return true;
    }
    return false;
  },

  fliterUniqvalue(data) {
    return data.filter((item, i, ar) => ar.indexOf(item) === i);
  },
  frequencyofApproachType(arr) {
    const counts = {
      ILS: 0,
      RNP: 0,
      LOC: 0,
      LDA: 0,
      VOR: 0,
      NDB: 0,
      PAR: 0,
      Visual: 0,
      Contact: 0,
      Circling: 0,
    };

    for (const type of arr) {
      counts[type] = counts[type] ? counts[type] + 1 : 1;
    }

    return counts;
  },

  frequencyofEle(arr) {
    const obj = {};

    for (const type of arr) {
      obj[type] = obj[type] ? obj[type] + 1 : 1;
    }

    return obj;
  },
  content: [
    "ILS",
    "RNP",
    "LOC",
    "LDA",
    "VOR",
    "NDB",
    "PAR",
    "Visual",
    "Contat",
    "Circling",
  ],

  getItems(input) {
    var arr = input,
      obj = {};
    for (var i = 0; i < arr.length; i++) {
      if (!obj[arr[i].city]) {
        obj[arr[i].city] = {
          count: 1,
          image: arr[i].countryCode,
        };
        // console.log(arr[i].countryCode);
      } else if (obj[arr[i].city]) {
        obj[arr[i].city] = {
          count: obj[arr[i].city].count + 1,
          image: arr[i].countryCode,
        };
      }
    }
    return obj;
  },

  getItems1(input) {
    var arr = input,
      obj = {};
    for (var i = 0; i < arr.length; i++) {
      if (!obj[arr[i].city]) {
        obj[arr[i].city] = {
          count: 1,
          image: arr[i].countryCode,
        };
        // console.log(arr[i].countryCode);
      } else if (obj[arr[i].city]) {
        obj[arr[i].city] = {
          count: obj[arr[i].city].count + 1,
          image: arr[i].countryCode,
        };
      }
    }
    return obj;
  },
  filterAircraftTypes(input) {
    var arr = input,
      obj = {};
    for (var i = 0; i < arr.length; i++) {
      if (!obj[arr[i].type]) {
        obj[arr[i].type] = {
          registration:[arr[i].registration],
          airplaneName:arr[i].airplaneName,
          planeid:arr[i].planeid,
          isActive:arr[i].isActive,
          type:arr[i].type
        }
        
      } else  {
        obj[arr[i].type].registration.push(arr[i].registration)
        
       
      }
    }
    return obj;
  },
  filterAircraftTypes1(input) {
    var arr = input,
      obj = {};
    for (var i = 0; i < arr.length; i++) {
      if (!obj[arr[i].type]) {
        obj[arr[i].type] = {
          registration:[arr[i].registration],
          airplaneName:[arr[i].airplaneName],
          planeid:[arr[i].planeid],
          isActive:[arr[i].isActive],
          type:arr[i].type
        }
        
      } else  {
        obj[arr[i].type].registration.push(arr[i].registration)
        obj[arr[i].type].airplaneName.push(arr[i].airplaneName)
        obj[arr[i].type].planeid.push(arr[i].planeid)
        obj[arr[i].type].isActive.push(arr[i].isActive)

        
       
      }
    }
    return obj;
  },
   checkFlightNumber(flightNumber){
    var airline = "", flightno = "";
    flightNumber = flightNumber.trim().replace(" ", "");
    
    for (var i = 0; i < flightNumber.length; i++){
      var c = flightNumber[i];
      if (c > 64 )
        airline += c;
      else
      {
        if (i <= 1)
          airline += c;
        else
          flightno += c;
      }
    }
    return [airline, flightno]
  }
  // filterAircraftTypes(input) {
    //   var arr = input,
    //     obj = {};
    //   for (var i = 0; i < arr.length; i++) {
    //     if (!obj[arr[i].type]) {
    //       obj[arr[i].type] = [arr[i].registration]
    //       console.log(arr[i].countryCode);
    //     } else  {
    //       obj[arr[i].type].push(arr[i].registration)
         
    //     }
    //   }
    //   return obj;
    // },

  // filterTypes(input) {
  //   var arr = input,
  //     obj = {};
  //   for (var i = 0; i < arr.length; i++) {
  //     if (!obj[arr[i].type]) {
  //       obj[arr[i].type] = {
  //         registration: arr[i].registration,
  //         airplaneName:arr[i].airplaneName,
  //         planeid:arr[i].planeid,
  //         isActice:arr[i].isActive
  //       };
    
  //     } else if (obj[arr[i].type]) {
  //       obj[arr[i].type] = {
  //         registration: arr[i].registration,
  //         airplaneName:obj[arr[i].type].registration + ,
  //         planeid:arr[i].planeid,
  //         isActice:arr[i].isActive
  //       };
  //     }
  //   }
  //   return obj;
  // },
};
