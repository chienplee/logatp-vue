var moment = require('moment');  
import Parse from 'parse'
Parse.Cloud.define('hello', function(req, res) {
  return 'Hi';
});

Parse.Cloud.define("totalFlights", async () => {
	const query = new Parse.Query("Logs");
	//query.equalTo("movie", request.params.movie);
	
	const count = await query.count({useMasterKey:true});//query.find({useMasterKey:true});

	const flightQuery = new Parse.Query("Flight");
	const flightCount = await flightQuery.count({useMasterKey:true});//query.find({useMasterKey:true});

	return Math.max(count, flightCount);
});


Parse.Cloud.define("getFlightsInfo", async () => {
	const query = new Parse.Query("Flight");
	//query.ascending("createdAt");
	query.descending("createdAt");
	query.limit(1);
	const results = await query.find({useMasterKey:true});

	return results;
});

Parse.Cloud.define("updateRealTrackFlightInfo", async()=>{
	const query = new Parse.Query("Flight");
	query.exists("faID").notEqualTo("faID","");
	query.equalTo("proFlight", true);
	const results = await query.find({useMasterKey:true});

	var message = ""; 
	if(results.length > 0){
		results.forEach(function(data, index){
			
			var objectData = data.toJSON();
			
			if(objectData.realTrack==undefined || objectData.realTrack==""){
				var response = new Promise(function(resolve, reject) {
					const queryFlight = new Parse.Query("Flight");
				  	queryFlight.get(objectData.objectId).then(function(flight) {
				  		
						var putins = new getFlightTrack();
						putins.getData(objectData.faID,function(dataObject){
							if(dataObject.GetHistoricalTrackResult){
								flight.set("realTrack", JSON.stringify(dataObject));
								
								putins.getFlightInfoStatus(objectData.faID,function(dataObject){
									if(dataObject.FlightInfoStatusResult){
										flight.set("flightInfo", JSON.stringify(dataObject));
										let pushMessage = "";
										if(dataObject.FlightInfoStatusResult.flights[0].actual_blockin_time && flightInfo.FlightInfoStatusResult.flights[0].actual_blockout_time){
											const actual_blockin_time = dataObject.FlightInfoStatusResult.flights[0].actual_blockin_time.epoch
											const actual_blockout_time = dataObject.FlightInfoStatusResult.flights[0].actual_blockout_time.epoch

											const actual_arrival_time = dataObject.FlightInfoStatusResult.flights[0].actual_arrival_time.epoch
											const actual_departure_time = dataObject.FlightInfoStatusResult.flights[0].actual_departure_time.epoch
											
											if(actual_blockin_time > 0 && actual_blockout_time > 0){
												const blockTime  = actual_blockin_time - actual_blockout_time
												const blockTimeMin = Math.round(blockTime/60);

												const flightTime   = actual_arrival_time-actual_departure_time
												const flightTimeMin= Math.round(flightTime/60) 
												
												pushMessage ="Your flight "+objectData.flightNumber+" on date "+moment(objectData.flightDate).format("DD MMM YYYY H:mm:ss")+" from "+objectData.departure+" to "+objectData.destination+" was completed with total block time "+blockTimeMin+". The difference between inTime and outTime.Total flight time "+flightTimeMin+". The difference between onTime and offTime.By tapping the push, redirect them to the flight detail in iOS app.";
											}
										}
										else{
											pushMessage = "Your flight "+objectData.flightNumber+" on date "+moment(objectData.flightDate).format("DD MMM YYYY H:mm:ss")+" from "+objectData.departure+" to "+objectData.destination+" was completed";
										}
										if(pushMessage!=""){
											let status_push = send_push_notification(objectData.username,objectData.objectId,message)
											status_push().then((res_push)=>{
												resolve(res_push)
											})
										}
									}
									flight.save(null, { useMasterKey: true }).then((flight)=>{
							        	let pushMessage = ""
										resolve("success")
							        })
								})
								
							}
							
						})
					})
				})
				if(index==results.length-1){
					message = response
				}
			}
		});	
	}else{
		message = "No record found."
	}
	return message
	

})

// Called automatically before a new flight is created
// Parse.Cloud.beforeSave("Flight", async(request, response)=>  {
// 	console.log('@@@ Before save called!\n');
// 	const flight = request.object;
	
// 	if (!flight.get("username")) {
// 		throw "username can't be empty.";
// 	}
// 	if (!flight.get("flightDate")) {
// 		throw "flightDate can't be empty.";
// 	}
// 	if (!flight.get("flightNumber")) {
// 		throw "flightNumber can't be empty.";
// 	}
// 	if (!flight.get("departure")) {
// 		throw "departure can't be empty.";
// 	}
// 	if (!flight.get("destination")) {
// 		throw "destination can't be empty.";
// 	}
	

// })
// Called automatically when a new flight is created
Parse.Cloud.afterSave("Flight", async(request, response)=>  {
	console.log('@@@ After save called!\n');
  	const object = request.object

	// Get current date, and only do the search when the flight is within 14 days from now
	let currentDate = new Date();
	let dateThreshould = new Date(new Date().setDate(new Date().getDate() - 14));

	var date = new Date(request.object.get("flightDate"));


	if (date < dateThreshould) {
		return
	};


	var dateToCompare = (date.getUTCMonth()+1)+'/'+date.getUTCDate()+'/'+date.getUTCFullYear();

  	var start_date = moment(request.object.get("flightDate")).unix();//"1611858600";
	var end_date   = moment(request.object.get("flightDate")).unix()+24*60*60;//"1611945000";
	var origin     = request.object.get("departure");//"KLAX";
	var destination= request.object.get("destination");//"KIAH";
	var flightNumber = request.object.get("flightNumber");//UAL1981

  	if (request.object.get("createdAt").getTime() == request.object.get("updatedAt").getTime()) {
		console.log('@@@ Created at is same as updated at, querying user \n');
		const queryUser = new Parse.Query("User");
		queryUser.equalTo('username', request.object.get("username"));
		const responseUser = await queryUser.find({useMasterKey:true});
		if(responseUser.length > 0){
			if(responseUser[0].get("username")==request.object.get("username") && responseUser[0].get("planExpiryDate") >= currentDate) {
			  	if(responseUser[0].get("plan")=="pro" || responseUser[0].get("plan")=="trial"  /*&& moment(request.object.get("inTime")).unix() < moment().unix()*/){

					object.set('proFlight', true);
					const [airline, flightno]= checkFlightNumber(flightNumber)
					console.log('Flight number checked'+airline+', no:'+flightno);
					if(flightno.length > 1){
						getAirlineInfo(airline).then(function(airlineName){
							console.log('get airline info checked')
							var flightSchedules = new getFlightData();
							var putins = new getFlightTrack();
							var identFlightNo = airlineName+''+flightno;
							console.log('Ident search: '+identFlightNo);
							putins.getFlightInfoStatus(identFlightNo, function(dataObjectFlight){
								if(dataObjectFlight.FlightInfoStatusResult){
									if(dataObjectFlight.FlightInfoStatusResult.flights.length > 0){

										const getFlightAfterFilter = dataObjectFlight.FlightInfoStatusResult.flights.filter((el) => {
											var fDate = new Date(el.filed_departure_time.epoch * 1000);
											flightDateTime = (fDate.getUTCMonth()+1)+'/'+fDate.getUTCDate()+'/'+fDate.getUTCFullYear();
											return 	(el.origin.alternate_ident == origin) && 
													(el.destination.alternate_ident == destination) && 
													(Date.parse(flightDateTime) == Date.parse(dateToCompare));
										});
										dataObjectFlight.FlightInfoStatusResult.flights = getFlightAfterFilter;
										
										if(getFlightAfterFilter.length > 0){
											var faID = getFlightAfterFilter[0].faFlightID;

											object.set("faID", faID);
											object.save(null, { useMasterKey: true }).then((flight)=>{

												console.log("FA ID Obtained")
											})

											putins.getData(faID,function(dataObject){
												if(dataObject.GetHistoricalTrackResult){
													object.set("realTrack", JSON.stringify(dataObject));
												}
												console.log('real track', dataObject)
												object.save(null, { useMasterKey: true }).then((flight)=>{
													console.log("Real Track obtained")
												})
											})
											
											// putins.getFlightInfoStatus(identFlightNo,function(dataObject){
											// 	if(dataObject.FlightInfoStatusResult){
													object.set("flightInfo", JSON.stringify(dataObjectFlight));
												// }
												console.log('flightInfo', dataObjectFlight)

												object.save(null, { useMasterKey: true }).then((flight)=>{
													console.log("Flight Info Obtained")
												})
											// })
										}else{
											console.log('No data found after filter.');
										}

									}else{
										console.log("FlightInfoStatusResult returning empty data");
									}
								}else{
									console.log("FlightInfoStatus returning empty data");
								}
							});
						})
					  }	
				}
			}
		}
    }
})
var getFlightData = function (){
	var restclient = require('restler');
	var self = this;
	var fxml3_url = 'http://flightxml.flightaware.com/json/FlightXML3/';
	var fxml2_url = 'http://flightxml.flightaware.com/json/FlightXML2/';
	

	this.getIdent = function (start_date,end_date,origin,destination,airline,flightno,callback) {
		restclient.get(fxml2_url + 'AirlineFlightSchedules', {
		    username: process.env.FLIGHT_AWARE_FLIGHTXML2_USERNAME,
		    password: process.env.FLIGHT_AWARE_FLIGHTXML2_API_KEY,
		    query: {startDate: start_date, endDate:end_date,origin:origin,destination:destination,airline:airline,flightno:flightno,howMany:1}
		}).on('success', function(data, response){
	        var dataObj = data;
	        callback(dataObj);
	    })
	    .on('fail', function(data, response){
	        console.log('Error on getIdent:', data);
	    });	
	    return self.feature;
	}
	this.getFaID = function (ident,departuretime,callback) {
		restclient.get(fxml2_url + 'GetFlightID', {
		    username: process.env.FLIGHT_AWARE_FLIGHTXML2_USERNAME,
		    password: process.env.FLIGHT_AWARE_FLIGHTXML2_API_KEY,
		    query: {ident: ident, departureTime:departuretime}
		}).on('success', function(data, response){
	        var dataObj = data;
	        callback(dataObj);
	    })
	    .on('fail', function(data, response){
	        console.log('Error on getFaID:', data);
	    });	
	    return self.feature;
	}
	
}
var getFlightTrack = function () {
	var restclient = require('restler');
	var self = this;
	var fxml3_url = 'http://flightxml.flightaware.com/json/FlightXML3/';
	var fxml2_url = 'http://flightxml.flightaware.com/json/FlightXML2/';

	this.getData = function (faID,callback) {
		restclient.get(fxml2_url + 'GetHistoricalTrack', {
		    username: process.env.FLIGHT_AWARE_FLIGHTXML2_USERNAME,
		    password: process.env.FLIGHT_AWARE_FLIGHTXML2_API_KEY,
		    query: {faFlightID: faID}
		}).on('success', function(data, response){
            var dataObj = data;

            callback(dataObj);
        })
        .on('fail', function(data, response){
            console.log('Error get flight track:', data.message, data);
        });
        return self.feature;
	}
	this.getFlightInfoStatus = function (ident,callback) {
		restclient.get(fxml3_url + 'FlightInfoStatus', {
		    username: process.env.FLIGHT_AWARE_FLIGHTXML3_USERNAME,
		    password: process.env.FLIGHT_AWARE_FLIGHTXML3_API_KEY,
		    query: {ident: ident, include_ex_data: true, offset:0}
		}).on('success', function(data, response){
            var dataObj = data;

            callback(dataObj);
        })
        .on('fail', function(data, response){
            console.log('Error get flight info status:', data.message, data);
        });
        return self.feature;
	}
}
function checkFlightNumber(flightNumber){
	var airline = "", flightno = "";
	flightNumber = flightNumber.trim().replace(" ", "");
	
	for (var i = 0; i < flightNumber.length; i++){
		var c = flightNumber[i];
		if (c > 64 && string.IsNullOrEmpty(number))
			airline += c;
		else
		{
			if (i <= 1)
				airline += c;
			else
				flightno += c;
		}
	}
	return [airline, flightno]
}
async function send_push_notification (username,objectId,message)  {
		const query = new Parse.Query(Parse.Installation);
		query.equalTo("username", username);
		return Parse.Push.send({
	        where: query,
	        data: {
	            alert: message,
				badge: 1,
	      		sound: 'default',
	      		type:"flight",
	      		objectId:objectId
	        }
	    }, { useMasterKey: true });
}
async function getAirlineInfo (IATAcode){

	const query = new Parse.Query("Airlines");
	query.equalTo("IATAcode",IATAcode);
	query.limit(1);
	//query.limit(1);
	const results = await query.find({useMasterKey:true});
	let ICAOcode = ""
	let data = Parse._encode(results)

	if(data.length>0){
		ICAOcode = data[0]['ICAOcode']	
	}
	return ICAOcode;	
};




// Parse.Cloud.define('setUserStatus', async (request) => {
// 	const query = new Parse.Query(Parse.User);
// 	query.equalTo("dataMigrated", false);
// 	query.limit(1000);
// 	const results = await query.find({useMasterKey:true});

// 	for (let i = 0; i < results.length; i++) {
// 		const object = results[i];
// 		//alert(object.id + ' - ' + object.get('playerName'));
// 		//console.log(object.id);
// 		//console.log(object.id)
		
// 		object.set('dataMigrated', true);
// 		object.save(null, { useMasterKey: true }).then((gameScore) => {
// 			// Execute any logic that should take place after the object is saved.
// 			console.log('Object saved: ' + gameScore.id);
// 		  }, (error) => {
// 			// Execute any logic that should take place if the save fails.
// 			// error is a Parse.Error with an error code and message.
// 			//alert('Failed to create new object, with error code: ' + error.message);
// 			console.log('Error '+error.message);
// 		  });;

// 	  }
// })

// Parse.Cloud.define("changeUserMigrationStatus", async (request) => {
// 	const query = new Parse.Query(Parse.User);
// 	query.equalTo("username", request.params.username);
// 	const results = await query.find({useMasterKey:true});

// 	const userObject = results[0];
// 	userObject.set('dataMigrated', true);


// 	userObject.save(null, { useMasterKey: true }).then((gameScore) => {
// 		// Execute any logic that should take place after the object is saved.
// 		console.log('Object saved: ' + gameScore.id);
// 		return true
// 	  }, (error) => {
// 		// Execute any logic that should take place if the save fails.
// 		// error is a Parse.Error with an error code and message.
// 		//alert('Failed to create new object, with error code: ' + error.message);
// 		console.log('Error '+error.message);
// 		return false
// 	  });

  


// 	// let sum = 0;
// 	// for (let i = 0; i < results.length; ++i) {
// 	//   sum += results[i].get("stars");
// 	// }
// 	// return sum / results.length;
//   });