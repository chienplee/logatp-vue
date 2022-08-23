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
      ILS:0,
      RNP:0,
      LOC:0,
      LDA:0,
      VOR:0,
      NDB:0,
      PAR:0,
      Visual:0,
      Contact:0,
      Circling:0



    };

    for (const type of arr) {
      counts[type] = counts[type] ? counts[type] + 1 : 1;
    }

    return counts;
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
};
