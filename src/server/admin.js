import Parse from "parse";

const getAdminFunction = async (obj) => {
  const getAdmin = Parse.Object.extend("User");
  const adminquery = new Parse.Query(getAdmin);
  adminquery.equalTo("email", "admin@logatp.com");
  const object = await adminquery.first();
  const acl = new Parse.ACL(Parse.User.current());
  acl.setWriteAccess(object.id, true);
  acl.setReadAccess(object.id, true);
  obj.setACL(acl);
};

export default {
  getAdminFunction,
};
