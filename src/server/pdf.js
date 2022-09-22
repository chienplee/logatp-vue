import user from "./user"
import Parse from "parse";
import Flight from "./Flight"
import JsHelper from "../helper/JsHelper";
import Airplane from "./Airplane";
import moment from "moment";
export default{
    async getPdfData(){
        var obj={
            flightDetails:[],
            name:"",
            fname:"",
            lname:'',
            username:"",
            GrandTotal:0,
            flights:0,
            mostRecentFlight:'',
            mostRecentRoute:"",
            picFlights:0,
            totalTakeoffs:0,
            totalLandings:0,
            totalAirportsVisited:0,
            pilotinCommandHours:0,
            totalHoursCarriedForward:0,
            last30daysHours:0,
            last90daysHours:0,
            last183daysHours:0,
            last365daysHours:0,
            AircraftTypes:[],
            date:moment(new Date()).format("DD-MMMM-YYYY"),
     
            



        }
        if(user.getCurrentUser){
            //username
            const user1 =  user.getCurrentUser();
      var username = user1.get("username");
      var fname = user1.get("firstName");
      var lname = user1.get("lastName");
      obj.username=username
      obj.fname=fname;
      obj.lname=lname
      obj.name = lname+" " +fname
   
      // flight data
      const flight = new Parse.Query("Flight");
    
    const flightData = await flight.find();
     
    for(const object of flightData){
       const flightDate=moment(object.get("flightDate")).format("DD-MMMM-YYYY")
       const aircraftType= object.get("aircraftType")
       const aircraftRegistration= object.get("aircraftRegistration")
       const flightNumber= object.get("flightNumber")
       const blockTime= object.get("blockTime")
       const picTime= object.get("picTime")
       const from= object.get("departure")
       const to= object.get("destination")
       const pilotInCommand= object.get("pilotInCommand")
       const outTime= moment.utc(object.get("outTime")).format("HH:mm");
       const flightTime= object.get("flightTime")
       const offTime= moment.utc(object.get("offTime")).format("HH:mm");
       const onTime= moment.utc(object.get("onTime")).format("HH:mm");
       const inTime= moment.utc(object.get("inTime")).format("HH:mm");
       const pfTakeOff= object.get("pfTakeOff")
       const pfLanding= object.get("pfLanding")
       const nightTime= object.get("nightTime")

       const id=object.id
       const realmId=object.get('realmID')
    //    console.log(realmId)
       const approachType=object.get('approachType')
    //    const aircraftType=object.get('aircraftType')
    //    const aircraftRegistration=object.get('aircraftRegistration')

       
       const flightplanDistance=object.get('flightplanDistance')
       const airplanePointer=object.get('airplanePointer')


    //    console.log(airplanePointer.)
       const crew2=object.get('crew2')
       const crew3=object.get('crew3')
       const crew4=object.get('crew4')
       const goAround=object.get('goAround')
       const diverted=object.get('diverted')
       const autoland=object.get('autoland')
       const proFlight=object.get('proFlight')
       const totalPassangers=object.get('totalPassangers')


    //    const createdAt=object.get('createdAt')
       const createdAt=moment(object.get("createdAt")).format("DD-MMMM-YYYY")

    //    const updatedAt=object.get('updatedAt')
       const updatedAt=moment(object.get("updatedAt")).format("DD-MMMM-YYYY")

       const totalPayload=object.get('totalPayload')

    //    console.log(pfLanding)
       obj.flightDetails.push({
        flightDate:flightDate,
        aircraftRegistration:aircraftRegistration,
        aircraftType:aircraftType,
        from:from,
        to:to,
        outTime:outTime,
        onTime:onTime,
        inTime:inTime,
        offTime:offTime,
        flightNumber:flightNumber,
        pfLanding:pfLanding,
        pfTakeOff:pfTakeOff,
        pilotInCommand:pilotInCommand,
        flightTime:flightTime,
        blockTime:blockTime,
        nightTime:nightTime,
        id:id,
        realmId:realmId,
        approachType:approachType,
        flightplanDistance:flightplanDistance,
        airplanePointer:airplanePointer,
        crew2:crew2,
        crew3:crew3,
        crew4:crew4,
        goAround:goAround,
        diverted:diverted,
        autoland:autoland,
        proFlight:proFlight,
        createdAt:createdAt,
        updatedAt:updatedAt,
        totalPayload:totalPayload,
        picTime:picTime,
        totalPassangers:totalPassangers
  

       
        
       })





    }
     

    //stastics Data
    await Flight.getDashboardData().then(res=>{
        obj.GrandTotal = res.HourswithMinutes,
        obj.flights= res.length
        obj.picFlights=res.picFlights
        obj.totalTakeoffs= res.PFTakeoff
        obj.totalLandings=res.PFLanding
        const uniqAirports=JsHelper.fliterUniqvalue(res.airports)
        // console.log(uniqAirports.length)
        var len = uniqAirports.length
       obj.totalAirportsVisited= len
       obj.pilotinCommandHours=res.pilotInCommandHours
        
    })

    await Flight.getLastFlightRecord().then(res=>{
        // console.log(res)
        obj.mostRecentFlight=moment(res.date).format("MM-DD-YYYY")
        obj.mostRecentRoute= res.departure + '->' + res.destination
    })

    await Flight.getNdaysHours(30).then(res=>{
        obj.last30daysHours=res.HourswithMinutes
    })
    await Flight.getNdaysHours(90).then(res=>{
        obj.last90daysHours=res.HourswithMinutes
    })
    await Flight.getNdaysHours(185).then(res=>{
        obj.last183daysHours=res.HourswithMinutes
    })
    await Flight.getNdaysHours(365).then(res=>{
        obj.last365daysHours=res.HourswithMinutes
    })

    await Airplane.getAircraftsforPdf().then(async res=>{
        // console.log(res)
        var data =JsHelper.fliterUniqvalue(res)
        // console.log('lin33333333333',data)
        
        
        for(const type of data){
            // console.log(res)
            const flight = new Parse.Query("Flight");
            // console.log(type)
                
                  flight.equalTo('aircraftType',type)
                  var flightData = await flight.find();

                //   console.log(type,flightData.length)
                  var bt=0
                  for(const flight of flightData){
                    
                    const BlockTime = flight.get('blockTime')
                    bt=bt+BlockTime
                    // console.log(type)
                    
                  }
             if(flightData.length){
                obj.AircraftTypes.push({type:type,Flights:flightData.length,BlockTime:bt})

             }
      
                  

        }
        // console.log(obj.AircraftTypes)
    })
    

     
      



        //   console.log(obj)  
            
        }
        return obj

    }
     
}