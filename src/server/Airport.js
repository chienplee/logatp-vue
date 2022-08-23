import Parse from "parse";

export default{
    async getAirports(icaocode){
        var obj=[]
        const currentUser = Parse.User.current();
    
        if (currentUser) {
            const query = new Parse.Query("Airport");
               query.equalTo("ICAOcode",icaocode)
            const results = await query.find();
        for (const object of results) {
            const  icaocode = object.get("ICAOcode")
            const  lat = object.get("latitude")
            const  long = object.get("longitude")
            const  city = object.get("city")
            const  country = object.get("country")
            const label =object.get("airportName")

            obj.push({
                icaocode:icaocode,
                lat:lat,
                long:long,
                city:city,
                country:country,
                lablel:label
            })
            
        }

            return obj
            
          }
        },
}