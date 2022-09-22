import Parse from "parse";


export default {
 async getAdminFunction(){
  const getAdmin = Parse.Object.extend("User");
  const adminquery = new Parse.Query(getAdmin);
  adminquery.equalTo("email", "admin@logatp.com");
  const object = await adminquery.first();
 return object

  }
};


