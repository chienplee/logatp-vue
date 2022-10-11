<template>
  <div>
    <a-spin :spinning="state.loader" class size="large">
      <a-row :gutter="25">
        <a-col :lg="24" :md="24" :sm="24" :xs="24">
          <a-divider orientation="left">INFORMATION</a-divider>
          <!-- <p v-if="state.data[0].ident">{{state.data[0].ident}}</p> -->

          <sdCards>
            <a-row :gutter="25">
              <a-col :lg="24" :md="24" :sm="24" :xs="24">
                <sdCards headless>
                  <a-row>
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <label>Identification</label>
                    </a-col>
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <!-- <span v-if="state.data[0].ident">{{state.data[0].ident}}</span> -->
                      <span>{{state.identification}}</span>
                    </a-col>
                  </a-row>
                  <a-row class="mt-5">
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <label>Airline</label>
                    </a-col>
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <span>{{state.Airline}}</span>
                      <!-- <span v-if="state.data[0].airline">{{state.data[0].airline}}</span> -->
                    </a-col>
                  </a-row>
                  <a-row class="mt-5">
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <label>Codeshares</label>
                    </a-col>
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <span>{{state.Codeshares}}</span>
                      <!-- <span v-if="state.data[0].codeshares">{{state.data[0].codeshares}}</span> -->
                    </a-col>
                  </a-row>
                </sdCards>
              </a-col>
            </a-row>
          </sdCards>
          <a-divider orientation="left">AIRCRAFT</a-divider>
          <sdCards>
            <a-row :gutter="25">
              <a-col :lg="24" :md="24" :sm="24" :xs="24">
                <sdCards headless>
                  <a-row>
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <label>Type</label>
                    </a-col>
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <span>{{state.type}}</span>
                      <!-- <span v-if="state.data[0].aircrafttype">{{state.data[0].aircrafttype}}</span> -->
                    </a-col>
                  </a-row>
                  <a-row class="mt-5">
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <label>Tail Number</label>
                    </a-col>
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <span>{{state.tailNumber}}</span>

                      <!-- <span v-if="state.data[0].tailnumber">{{state.data[0].tailnumber}}</span> -->
                    </a-col>
                  </a-row>
                </sdCards>
              </a-col>
            </a-row>
          </sdCards>
          <a-divider orientation="left">FLIGHT PLAN</a-divider>
          <sdCards>
            <a-row :gutter="25">
              <a-col :lg="24" :md="24" :sm="24" :xs="24">
                <sdCards headless>
                  <a-row>
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <label>Filed ETE</label>
                    </a-col>
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <span>{{state.filedete}}</span>
                    </a-col>
                  </a-row>
                  <a-row class="mt-5">
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <label>Filed Initial Altitude</label>
                    </a-col>
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <span>{{state.filedInitialAltitude}}</span>
                    </a-col>
                  </a-row>
                  <a-row class="mt-5">
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <label>Filed Distance</label>
                    </a-col>
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <span>{{state.filedDistance}}</span>
                    </a-col>
                  </a-row>
                  <a-row class="mt-5">
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <label>Filed Route</label>
                    </a-col>
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <span>{{state.filesRoute}}</span>
                    </a-col>
                  </a-row>
                </sdCards>
              </a-col>
            </a-row>
          </sdCards>
          <a-divider orientation="left">FILED</a-divider>
          <sdCards>
            <a-row :gutter="25">
              <a-col :lg="24" :md="24" :sm="24" :xs="24">
                <sdCards headless>
                  <a-row>
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <label>Filed Departure Time</label>
                    </a-col>
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <span>{{state.filesDepTile}}</span>
                    </a-col>
                  </a-row>
                  <a-row class="mt-5">
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <label>Filed Arrival Time</label>
                    </a-col>
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <span>{{state.filedArrivalTime}}</span>
                    </a-col>
                  </a-row>
                </sdCards>
              </a-col>
            </a-row>
          </sdCards>
          <a-divider orientation="left">ACTUAL</a-divider>
          <sdCards>
            <a-row :gutter="25">
              <a-col :lg="24" :md="24" :sm="24" :xs="24">
                <sdCards headless>
                  <a-row>
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <label>Actual Out Time</label>
                    </a-col>
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <span>{{state.actualOutTime}}</span>
                    </a-col>
                  </a-row>
                  <a-row class="mt-5">
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <label>Actual Off Time</label>
                    </a-col>
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <span>{{state.actualOffTime}}</span>
                    </a-col>
                  </a-row>
                  <a-row class="mt-5">
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <label>Actual On Time</label>
                    </a-col>
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <span>{{state.actualOnTime}}</span>
                    </a-col>
                  </a-row>
                  <a-row class="mt-5">
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <label>Actual In Time</label>
                    </a-col>
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <span>{{state.actualinTime}}</span>
                    </a-col>
                  </a-row>
                </sdCards>
              </a-col>
            </a-row>
          </sdCards>
          <a-divider orientation="left">REAL TRACK</a-divider>
          <sdCards>
            <a-row :gutter="25">
              <a-col :lg="24" :md="24" :sm="24" :xs="24">
                <sdCards headless>
                  <a-row>
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                        <a-button type="primary" @click="showModal">Flight Data</a-button>

                    </a-col>
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <span>{{}}</span>
                    </a-col>
                  </a-row>
                </sdCards>
              </a-col>
            </a-row>
          </sdCards>
          <a-divider orientation="left">DATA</a-divider>
          <sdCards>
            <a-row :gutter="25">
              <a-col :lg="24" :md="24" :sm="24" :xs="24">
                <sdCards headless>
                  <a-row>
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <label>Status</label>
                    </a-col>
                    <a-col :lg="4" :md="6" :sm="12" :xs="12">
                      <span>{{state.status}}</span>

                      <!-- <span v-if="state.data[0].status">{{state.data[0].status}}</span> -->
                    </a-col>
                  </a-row>
                </sdCards>
              </a-col>
            </a-row>
          </sdCards>
        </a-col>
      </a-row>
      <a-modal v-model:visible="visible" title="Flight Data" @ok="handleOk" :width="700"  >
        <a-list item-layout="horizontal" :data-source="flightRealTrack.data">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta
                 
                >
                  <template #title>
                    <!-- <h1>{{ new Date(item.timestamp) }}<h1/> <br/> -->
                      <h3>{{ new Date(item.timestamp)}}</h3> 
                    <span>Altitude:{{item.altitude}}feets</span> <br />
                    <span>Groundspeed:{{item.groundspeed}}knots</span> <br />
                    <span>Location:Latitude {{item.lat}} Lingitude {{item.lng}}</span>

                  </template>
                  <template #avatar>
                    <!-- <img src="../static/img/project.png" width="30px" height="30px"/> -->
                    <a-avatar size="large" :src="state.image"   />
                    <!-- <a-avatar shape="square" size="large"  icon="fa-solid fa-arrow-pointer" />
                     -->

                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        
      </a-modal>
    </a-spin>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, ref } from "vue";
import PropTypes from "vue-types";
// import Parse from "parse";
import Flight from "../server/Flight";

export default defineComponent({
  props: {
    id: {
      required: false,
      type: PropTypes.String
    }
  },
  components: {},
  setup(props) {
    onMounted(async () => {
      state.loader = true;
      const flight = await Flight.getFlight(props.id);

      var flightInformation = JSON.parse(flight.get("flightInfo"))
        .FlightInfoStatusResult;
      state.data = flightInformation.flights;

      // console.log(flightInformation);
      state.identification = flightInformation.flights[0].ident;
      state.Airline = flightInformation.flights[0].airline;
      state.Codeshares = flightInformation.flights[0].codeshares;
      state.type = flightInformation.flights[0].aircrafttype;
      state.tailNumber = flightInformation.flights[0].tailnumber;
      state.status = flightInformation.flights[0].status;
     
      const realTrackData = flight.get("realTrack");
      if (realTrackData) {
        const getData = JSON.parse(realTrackData).GetHistoricalTrackResult.data;
        for (var i in getData) {
          
            flightRealTrack.data.push({
            timestamp: getData[i].timestamp,
            lat: getData[i].latitude,
            lng: getData[i].longitude,
            groundspeed: getData[i].groundspeed,
            altitude: getData[i].altitude,
            altitudeStatus: getData[i].altitudeStatus,
            updateType: getData[i].updateType,
            altitudeChange: getData[i].altitudeChange
          });
        }
      }

      state.loader = false;
    });

    const state = reactive({
      data: {},
      identification: "",
      Airline: "",
      Codeshares: "",
      type: "",
      tailNumber: "",
      filedete: "",
      filedInitialAltitude: "",
      filedDistance: "",
      filesRoute: "",
      filesDepTile: "",
      filedArrivalTime: "",
      actualOffTime: "",
      actualOnTime: "",
      actualOutTime: "",
      actualinTime: "",
      flightData: "",
      status: "",
      image:require("../static/img/mappointer.png")
    });
    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = e => {
      console.log(e);
      visible.value = false;
    };

   const flightRealTrack = reactive({
    data: [
  
  
]
   })
    return {
      state,
      visible,
      showModal,
      handleOk,
      flightRealTrack
    };
  }
});
</script>
