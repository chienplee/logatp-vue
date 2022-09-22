import Parse from "parse";

export default {
  async getManuafacturers() {
    var obj = {
      manufacturers: [],
    };
    const query1 = new Parse.Query("Aircraft");
    const manufacturerData = await query1.find();
    for (const object of manufacturerData) {
      const manufacturer = object.get("manufacturer");
      obj.manufacturers.push(manufacturer);
    }
    return obj;
  },
  async getTypes(name) {
    var obj = {
      data: [],
    };
    const query1 = new Parse.Query("Aircraft");
    query1.equalTo("manufacturer", name);
    const manufacturerData = await query1.find();
    for (const object of manufacturerData) {
      const ICAOcode = object.get("ICAOcode");
      const type = object.get("type");
      obj.data.push({ ICAOcode, type });
    }
    return obj;
  },
};
