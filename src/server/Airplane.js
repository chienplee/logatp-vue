import Parse from "parse";

export default{
    async getAircrafts(){
        // var arr=[];
        const currentUser = Parse.User.current();
    
        if (currentUser) {
            const query = new Parse.Query("AirPlane");
            const results = await query.find();
            return results
            
          }
        },
}