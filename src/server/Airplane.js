import Parse from "parse";

export default{
    async getAircrafts(){
        // var arr=[];
        const currentUser = Parse.User.current();
    
        if (currentUser) {
          const username = currentUser.get('username')

            const query = new Parse.Query("AirPlane");
            
            query.equalTo('username',username)
            query.descending("createdAt");
            const results = await query.find();
            return results
            
          }
        },
        async getPointer(id){
          const airplaneClass=Parse.Object.extend("AirPlane");
           const airplaneQuery=new Parse.Query(airplaneClass);
           var a= await airplaneQuery.get(id).then((object) => {
                return object
      
                }
                ).catch((error) =>  {
                  console.log("error",error)
                });
      
                return a;
              }  ,
              async getFlightsOfManufacture(aircraftRegistration) {
                const currentUser = Parse.User.current();
                if (currentUser) {
                  const flight = new Parse.Query("Flight");
                  flight.equalTo('aircraftRegistration',aircraftRegistration)
                  flight.descending("createdAt");
                  var flightData = await flight.find();
                  if (flightData.length) {
                    return flightData;
                  }
                  return [];
                }
              },
              async getCustomAirplanes(Registration,Type) {
                const currentUser = Parse.User.current();
                if (currentUser) {
                  const username = currentUser.get('username')

            const query = new Parse.Query("AirPlane");
            query.equalTo('username',username)
            const aircraftRegistration = new Parse.Query("AirPlane");
            aircraftRegistration.equalTo('aircraftRegistration',Registration)   
            const aircraftType = new Parse.Query("AirPlane");

            aircraftType.equalTo('aircraftType',Type)
      var airplanes = Parse.Query.and(query, aircraftRegistration, aircraftType,);

      airplanes.descending("createdAt");
            const results = await airplanes.find();
            return results
                }
              },
              async getAircraftsforPdf() {
                var typeData=[]
                const currentUser = Parse.User.current();
                // console.log(currentUser)
                if (currentUser) {
                  const username = currentUser.get('username')
                  const AirPlane = new Parse.Query("AirPlane");
                  AirPlane.equalTo('username',username)

                  const Aircraftdata =  await  AirPlane.find()
                  // console.log(Aircraftdata)
                  for(const object of Aircraftdata){
                    const type = object.get('aircraftType')
                    // const registration = object.get('aircraftRegistration')

                    // console.log(type)
                        typeData.push(type)
                        
                  }
                  // console.log(typeData)
                  
                  
                  
                }

                return typeData
              },
              
          
}