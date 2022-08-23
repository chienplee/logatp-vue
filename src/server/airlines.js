import Parse from "parse";

export default {
async getAirlines(){
    var airlenesdata = []
    
    const query = new Parse.Query("Airline");

    const results = await query.find();
    try {
        for(const object of results){
            const airlinename = object.get("AirlineName")
            const image = object.get("Logo")

            airlenesdata.push({airlinename:airlinename,image:image})
        }
    } catch (error) {
        console.log(error)
    }

    return airlenesdata

}
}