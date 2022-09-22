import Parse from "parse";

export default {
  async getManuafacturers() {
    var obj = {
        data:[]
    };
    const query1 = new Parse.Query("manufacturer");
    const manufacturerData = await query1.find();
    // console.log(manufacturerData);
    for (const object of manufacturerData) {
        const manufacturer = object.get("name")
        const logoPath = object.get("logoPath")
        // console.log(manufacturer,logoPath)

        obj.data.push({manufacturer,logoPath})

    }
    return obj
  },
};
