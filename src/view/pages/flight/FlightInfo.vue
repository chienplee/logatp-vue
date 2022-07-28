<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="Flight Info">
      <div class="flightinfo-container">
        <div class="flightinfo-data">
          <label for="FlightDate">FlightDate</label>
          <input type="text" disabled v-model="flightInfo.flightDate" /><br />
          <label for="flightTime">Last Time:</label>
          <input
            type="text"
            disabled
            v-model="flightInfo.flightTime"
            id="flightTime"
            name="flightTime"
          />
        </div>
        <h1>AIRCRAFT</h1>
        <div class="flightinfo-data">
          <label for="Manufacturer ">Manufacturer </label>
          <input
            type="text"
            disabled
            v-model="aircraftInfo.manufacturer"
          /><br />
          <label for="Type">Type</label>
          <input
            type="text"
            disabled
            v-model="aircraftInfo.type"
            id="type"
            name="type"
          /><br />
          <label for="Registeration ">Registeration </label>
          <input type="text" disabled v-model="aircraftInfo.registeration" />
        </div>
          <h1>DEPARTURE AIRPORT</h1>
<div class="flightinfo-data">
          <label for="AirportName ">Airport Name </label>
          <input
            type="text"
            disabled
            v-model="departureInfo.airportName "
          /><br />
          <label for="IATA ">IATA </label>
          <input
            type="text"
            disabled
            v-model="departureInfo.iata"
            id="type"
            name="type"
          /><br />
          <label for="ICAO ">ICAO </label>
          <input type="text" disabled v-model="departureInfo.icao" /><br>
          <label for="Country">Country </label>
          <input type="text" disabled v-model="departureInfo.country" />
        </div>
          <h1>DESTINATION AIRPORT</h1>
        <div class="flightinfo-data">
          <label for="AirportName ">Airport Name </label>
          <input
            type="text"
            disabled
            v-model="destinationInfo.airportName "
          /><br />
          <label for="IATA ">IATA </label>
          <input
            type="text"
            disabled
            v-model="destinationInfo.iata"
            id="type"
            name="type"
          /><br />
          <label for="ICAO ">ICAO </label>
          <input type="text" disabled v-model="destinationInfo.icao" /><br>
          <label for="Country">Country </label>
          <input type="text" disabled v-model="destinationInfo.country" />
        </div>
          <h1>TIMES</h1>
        <div class="flightinfo-data">
          <label for="BlockOut">Block Out</label>
          <input
            type="text"
            disabled
            v-model="timesInfo.blockOut"
          /><br />
          <label for="BlockOff">Block Off </label>
          <input
            type="text"
            disabled
            v-model="timesInfo.blockOff"
            id="type"
            name="type"
          /><br />
          <label for="BlockOn">Block On</label>
          <input type="text" disabled v-model="timesInfo.blockOn" /><br>
          <label for="Block In">Block In </label>
          <input type="text" disabled v-model="timesInfo.blockIn" />
        </div>
        
          <h1>CALCULATED</h1>
          <div class="flightinfo-data">
          <label for="BlockTime">Block Time</label>
          <input
            type="text"
            disabled
            v-model="calculatedInfo.blockTime"
            id="type"
            name="type"
          /><br />
          <label for="BlockOn">Flight Time</label>
          <input type="text" disabled v-model="calculatedInfo.flightTime" /><br>
          <label for="Block In">Night Time</label>
          <input type="text" disabled v-model="calculatedInfo.nightTime" />
        </div>

      
          <h1>Settings</h1>
   <div class="flightinfo-data">
          
          <label for="PICTime">PIC Time</label>
          <input type="text" disabled v-model="settingsInfo.picTime " /><br>
          <label for=" PFTakeOff"> PF TakeOff</label>
          <input type="text" disabled v-model=" settingsInfo.pfTakeoff" />
          <br>
          <label for="Block In">PF Landing</label>
          <input type="text" disabled v-model="settingsInfo.pfLanding" /><br>
          <label for="Autoland">Autoland</label>
          <input type="text" disabled v-model="settingsInfo.autoland " /><br>
          <label for="GoAround">Go Around</label>
          <input type="text" disabled v-model="settingsInfo.goAround" /><br>
          <label for="Diverted">Diverted</label>
          <input type="text" disabled v-model="settingsInfo.diverted" />
        </div>
        
          <h1>EXTRAS</h1>
   <div class="flightinfo-data">
          
          <label for="approachType">approachType</label>
          <input type="text" disabled v-model=" extrasInfo.approachType" /><br>
          <label for="totalPassengers">totalPassengers</label>
          <input type="text" disabled v-model="extrasInfo.totalPassengers" /><br>
          <label for="totalPayload">totalPayload</label>
          <input type="text" disabled v-model="extrasInfo.totalPayload " /><br>
          <label for="flightPlanDistance">flightPlanDistance</label>
          <input type="text" disabled v-model="extrasInfo.flightPlanDistance " />
        </div>

         <h1>System Related</h1>
        <div class="flightinfo-data">
          <label for="LogAtpId">Log Atp Id</label>
          <input type="text" disabled v-model="systemInfo.logAtpId" /><br>
          <label for="totalPassengers">Cloud Id</label>
          <input type="text" disabled v-model="systemInfo.cloudId" /><br>
          <label for="totalPayload">totalPayload</label>
          <input type="text" disabled v-model="extrasInfo.totalPayload " /><br>
          <label for="FlightCreatedAt">Flight Created At</label>
          <input type="text" disabled v-model="systemInfo.flightCreated  " /><br>
<label for="LastUpdatedAt">Last Updated At</label>
          <input type="text" disabled v-model="systemInfo.lastUpdated" />
        </div>
      </div>
    </a-tab-pane>
    <a-tab-pane key="2" tab="TimeLine" force-render>Content of Tab Pane 2

      <a-timeline>
        <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
        <a-timeline-item
          >Solve initial network problems 2015-09-01</a-timeline-item
        >
        <a-timeline-item>Technical testing 2015-09-01</a-timeline-item>
        <a-timeline-item
          >Network problems being solved 2015-09-01</a-timeline-item
        >
      </a-timeline>
    </a-tab-pane>
    <a-tab-pane key="3" tab="Crew">
      <div class="crew-container"> 
        <div class="crew-container">
      <h1>Pilot In Command</h1>
      <DisplayCrew/>
        </div>
      <h1>Crew2</h1>
      <DisplayCrew/>
      <h1>Crew3</h1>
      <DisplayCrew/>
      <h1>Crew4</h1>
      <DisplayCrew/>
      </div>
    </a-tab-pane>
    <a-tab-pane key="4" tab="Notes">
      <input type="textArea" placeholder="Notes" disabled />
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import { defineComponent, reactive, ref } from "vue";
import DisplayCrew from '../../../customComponents/DisplayCrew.vue'
export default defineComponent({
  components:{
    DisplayCrew
  },
  setup() {
    const flightInfo = reactive({
      flightDate: "10 July 2022",
      flightNumber: "AA1318",
    });
    const aircraftInfo = reactive({
      manufacturer: "",
      type: "B77",
      registeration: "N123",
    });
    const departureInfo = reactive({
      airportName: "Los Angeles International Airport",
      iata: "LAX",
      icao: "KLAX",
      country: "United States",
    });
    const destinationInfo = reactive({
      airportName: "San Fransisco International Airport",
      iata: "SFO",
      icao: "KSFO",
      country: "United States",
    });
    const timesInfo = reactive({
      blockOut: "0600Z",
      blockOff: "0800Z",
      blockOn: "0900Z",
      blockIn: "1000Z",
    });
    const calculatedInfo = reactive({
      blockTime: "4:00",
      flightTime: "1:00",
      nightTime: "400",
    });
    const settingsInfo = reactive({
      picTime: "Yes",
      pfTakeoff: "No",
      pfLanding: "No",
      autoland: "No",
      goAround: "No",
      diverted: "NO",
    });
    const extrasInfo = reactive({
      approachType: "VOR",
      totalPassengers: "258",
      totalPayload: "0.0",
      flightPlanDistance: "0",
    });
    const systemInfo = reactive({
      logAtpId: "nd9ZtojwZhCX4by",
      cloudId: "FwuCf0lKCr",
      flightCreated: "11-JUL-2022 at 1:05:18 PML",
      lastUpdated: "11-JUL-2022 at 1:05:18 PML",
    });
    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return {
      flightInfo,
      aircraftInfo,
      departureInfo,
      destinationInfo,
      timesInfo,
      calculatedInfo,
      extrasInfo,
      settingsInfo,
      systemInfo,
      onFinish,
      onFinishFailed,
      activeKey: ref("1"),
    };
  },
});
</script>
<style>
.flightinfo-container {
  background: #dbdbd9;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
}
.flightinfo-data {
  background: #fff;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
}
span {
  display: block;
}
.label,
.data {
  display: inline;
}
label {
  background: none;
  font-weight: 700;
}
input {
  border: none;
  margin: 10px;
}
/* .label{
  color:black;
  font-weight: 700;
} */
h1{

}
.crew-container{
  
  background: #dbdbd9;
  margin:5px;
  padding:5px;
  border-radius: 15px;
}
</style>
