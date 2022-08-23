import Parse from "parse";

export default{
    getCurrentUser(){
    const currentUser = Parse.User.current();
    return currentUser  
    }
}