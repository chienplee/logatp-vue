<template>
  <CardToolbox>
    <ContactPageheaderStyle>
      <sdPageHeader title="Flight Information">
        <template v-slot:buttons>
          <div class="page-header-actions">
            <router-link :to="{ name: 'editFlight', params: { flightId: id } }">
              <sdButton size="small" type="primary">
                <sdFeatherIcons type="edit" size="14" />Edit Flight
              </sdButton>
            </router-link>
          </div>
        </template>
      </sdPageHeader>
      <!-- <template #buttons>
          <sdButton class="btn-add_new" size="default" type="primary" key="1">
            <a to="#">Edit</a>
          </sdButton>
        </template>
      </sdPageHeader>-->
    </ContactPageheaderStyle>
  </CardToolbox>

  <Main>
    <a-spin :spinning="flightReactive.loader" class size="large">
      <a-tabs v-model:activeKey="activeKey" type="card">
        <a-tab-pane key="1" tab="Flight Info">
          <FlightCard
            v-if="flightReactive.flight"
            :flight="flightReactive.flight"
            :destinationAirport="flightReactive.destinationAirport"
            :departureAirport="flightReactive.departureAirport"
          ></FlightCard>
        </a-tab-pane>
        <a-tab-pane key="2" tab="TimeLine" force-render>
          <a-row :gutter="25">
            <a-col :lg="24" :md="24" :sm="24" :xs="24">
              <sdCards headless>
                <a-timeline v-if="flightReactive.flight">
                  <a-timeline-item>
                    <p>{{dateFullFormat(flightReactive.outTime)}}</p>
                    <p>Push Back</p>
                    <p
                      class="left"
                    >{{getDuration(flightReactive.outTime, flightReactive.offTime)}} Taxi Time</p>
                  </a-timeline-item>
                  <a-timeline-item>
                    <p>{{dateFullFormat(flightReactive.offTime)}}</p>
                    <p>Takeoff from {{flightReactive.departureAirport && flightReactive.departureAirport.get('airportName')}}</p>
                    <p
                      class="left"
                    >{{getDuration(flightReactive.offTime, flightReactive.onTime)}} Flight Time</p>
                  </a-timeline-item>
                  <a-timeline-item>
                    <p>{{dateFullFormat(flightReactive.onTime)}}</p>
                    <p>Landing at {{flightReactive.destinationAirport && flightReactive.destinationAirport.get('airportName')}}</p>
                    <p
                      class="left"
                    >{{getDuration(flightReactive.onTime, flightReactive.inTime)}} Taxi Time</p>
                  </a-timeline-item>
                  <a-timeline-item>
                    <p>{{dateFullFormat(flightReactive.inTime)}}</p>
                    <p>Arrived at Gate</p>
                  </a-timeline-item>
                </a-timeline>
              </sdCards>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="3" tab="Crew">
          <a-row :gutter="25">
            <a-col :lg="24" :md="24" :sm="24" :xs="24">
              <a-divider orientation="left">Pilot In Command</a-divider>
              <sdCards>
                <CrewCard :crew="flightReactive.pilotInCommandPointer" />
              </sdCards>
              <a-divider orientation="left">Crew2</a-divider>
              <sdCards>
                <CrewCard :crew="flightReactive.crew2Pointer" />
              </sdCards>
              <a-divider orientation="left">Crew3</a-divider>
              <sdCards>
                <CrewCard :crew="flightReactive.crew3Pointer" />
              </sdCards>
              <a-divider orientation="left">Crew4</a-divider>
              <sdCards>
                <CrewCard :crew="flightReactive.crew4Pointer" />
              </sdCards>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="4" tab="Notes">
          <a-row :gutter="25">
            <a-col :lg="24" :md="24" :sm="24" :xs="24">
              <sdCards>{{flightReactive.flight.get('notes')}}</sdCards>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="5" tab="Map">
          <a-row :gutter="25">
            <a-col :lg="24" :md="24" :sm="24" :xs="24">
              <sdCards>
                <MapCard
                  :departureAirport="flightReactive.departureAirport"
                  :destinationAirport="flightReactive.destinationAirport"
                ></MapCard>
              </sdCards>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="6" tab="Real Flight Info" v-if="flightReactive.pro">
 
         
       
        <proFlightInfo :id="id" />
        </a-tab-pane>
        <a-tab-pane key="7" tab="Real Track" v-if="flightReactive.pro">
          <a-row :gutter="25">
            <a-col :lg="24" :md="24" :sm="24" :xs="24">
              <sdCards>
                
                <RealTrack :id="id" />
              </sdCards>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </a-spin>
  </Main>
</template>
<script>
import { defineComponent, ref, reactive, onMounted, inject } from "vue";
import { Main, CardToolbox } from "../../styled";
import { ContactPageheaderStyle } from "../style";
import CrewCard from "./components/crew.vue";
import FlightCard from "./components/flightDetails.vue";
import MapCard from "./components/map.vue";
import { useRoute } from "vue-router";
import Flight from "../../../server/Flight";
import moment from "moment";
import user from "../../../server/user";
import RealTrack from "../../../customComponents/RealTrack.vue"
import proFlightInfo from "../../../customComponents/proFlightInfo.vue"

export default defineComponent({
  components: {
    FlightCard,
    Main,
    CrewCard,
    ContactPageheaderStyle,
    CardToolbox,
    MapCard,
    RealTrack,
    proFlightInfo
  },
  setup() {
    const dateFullFormat = inject("dateFullFormat");
    const router = useRoute();
    let id = router.params.flightId;
    const flightReactive = reactive({
      flight: "",
      pilotInCommandPointer: "",
      crew2Pointer: "",
      crew3Pointer: "",
      crew4Pointer: "",
      departureAirport: "",
      destinationAirport: "",
      outTime: "",
      offTime: "",
      onTime: "",
      inTime: "",
      loader: true,
      pro: false,
      flightInfo:{}
    });

    onMounted(async () => {
      const currentUser = await user.getCurrentUser();
      console.log(currentUser.get("ProUser"));
      console.log(currentUser.get("deleted"));

      
      flightReactive.flight = await Flight.getFlight(id);
      if (flightReactive.flight.get("proFlight") === true){
        flightReactive.pro = true;
      }
      

      
      // console.log(flightReactive.flight)
      flightReactive.pilotInCommandPointer = flightReactive.flight.get(
        "pilotInCommandPointer"
      );
      flightReactive.crew2Pointer = flightReactive.flight.get("crew2Pointer");
      flightReactive.crew3Pointer = flightReactive.flight.get("crew3Pointer");
      flightReactive.crew4Pointer = flightReactive.flight.get("crew4Pointer");
      flightReactive.departureAirport = flightReactive.flight.get(
        "departureAirport"
      );
      flightReactive.destinationAirport = flightReactive.flight.get(
        "destinationAirport"
      );
      flightReactive.outTime = flightReactive.flight.get("outTime");
      flightReactive.offTime = flightReactive.flight.get("offTime");
      flightReactive.onTime = flightReactive.flight.get("onTime");
      flightReactive.inTime = flightReactive.flight.get("inTime");
      flightReactive.loader = false;
    });

    const getDuration = (f, l) => {
      var fTime = moment(f);
      var lTime = moment(l);

      var duration = moment.duration(lTime.diff(fTime));
      var minutes = duration.asMinutes();
      if (minutes >= 60) {
        return Math.floor(minutes / 60) + ":" + Math.round(minutes % 60, 2);
      } else {
        return minutes;
      }
    };
    const realTrack = reactive({
  
      
  GetHistoricalTrackResult: {
    data: [
      {
        "timestamp": 1664790837,
        "latitude": 23.82837,
        "longitude": 90.40976,
        "groundspeed": 167,
        "altitude": 10,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664790857,
        "latitude": 23.81529,
        "longitude": 90.42033,
        "groundspeed": 192,
        "altitude": 16,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664790875,
        "latitude": 23.80193,
        "longitude": 90.43101,
        "groundspeed": 212,
        "altitude": 21,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664790940,
        "latitude": 23.74774,
        "longitude": 90.41738,
        "groundspeed": 256,
        "altitude": 53,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664790960,
        "latitude": 23.74635,
        "longitude": 90.38844,
        "groundspeed": 279,
        "altitude": 61,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664790990,
        "latitude": 23.74681,
        "longitude": 90.34541,
        "groundspeed": 285,
        "altitude": 77,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791020,
        "latitude": 23.74681,
        "longitude": 90.30182,
        "groundspeed": 292,
        "altitude": 93,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791037,
        "latitude": 23.74132,
        "longitude": 90.27949,
        "groundspeed": 296,
        "altitude": 99,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791067,
        "latitude": 23.71809,
        "longitude": 90.24123,
        "groundspeed": 320,
        "altitude": 109,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791097,
        "latitude": 23.69258,
        "longitude": 90.19977,
        "groundspeed": 329,
        "altitude": 122,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791127,
        "latitude": 23.6673,
        "longitude": 90.1577,
        "groundspeed": 333,
        "altitude": 136,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791157,
        "latitude": 23.64175,
        "longitude": 90.11485,
        "groundspeed": 344,
        "altitude": 148,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791187,
        "latitude": 23.6152,
        "longitude": 90.0706,
        "groundspeed": 351,
        "altitude": 159,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791217,
        "latitude": 23.5883,
        "longitude": 90.02544,
        "groundspeed": 357,
        "altitude": 171,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791247,
        "latitude": 23.56169,
        "longitude": 89.97752,
        "groundspeed": 361,
        "altitude": 182,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791278,
        "latitude": 23.53551,
        "longitude": 89.92944,
        "groundspeed": 368,
        "altitude": 192,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791308,
        "latitude": 23.5086,
        "longitude": 89.88083,
        "groundspeed": 374,
        "altitude": 202,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791339,
        "latitude": 23.48126,
        "longitude": 89.83186,
        "groundspeed": 381,
        "altitude": 210,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791382,
        "latitude": 23.44633,
        "longitude": 89.75585,
        "groundspeed": 388,
        "altitude": 224,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791412,
        "latitude": 23.4245,
        "longitude": 89.70107,
        "groundspeed": 395,
        "altitude": 231,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791442,
        "latitude": 23.40479,
        "longitude": 89.64605,
        "groundspeed": 403,
        "altitude": 238,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791472,
        "latitude": 23.38651,
        "longitude": 89.58597,
        "groundspeed": 417,
        "altitude": 242,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791513,
        "latitude": 23.34888,
        "longitude": 89.51346,
        "groundspeed": 420,
        "altitude": 251,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791543,
        "latitude": 23.3139,
        "longitude": 89.46157,
        "groundspeed": 426,
        "altitude": 257,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791573,
        "latitude": 23.2784,
        "longitude": 89.40918,
        "groundspeed": 432,
        "altitude": 263,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791603,
        "latitude": 23.24249,
        "longitude": 89.35655,
        "groundspeed": 441,
        "altitude": 266,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791623,
        "latitude": 23.21867,
        "longitude": 89.32165,
        "groundspeed": 444,
        "altitude": 269,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791643,
        "latitude": 23.19279,
        "longitude": 89.28375,
        "groundspeed": 446,
        "altitude": 273,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791673,
        "latitude": 23.15593,
        "longitude": 89.22991,
        "groundspeed": 447,
        "altitude": 279,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791704,
        "latitude": 23.11845,
        "longitude": 89.17526,
        "groundspeed": 450,
        "altitude": 284,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791734,
        "latitude": 23.08173,
        "longitude": 89.12184,
        "groundspeed": 454,
        "altitude": 287,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791764,
        "latitude": 23.04312,
        "longitude": 89.06581,
        "groundspeed": 456,
        "altitude": 292,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791780,
        "latitude": 23.02409,
        "longitude": 89.03773,
        "groundspeed": 459,
        "altitude": 293,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791822,
        "latitude": 22.98275,
        "longitude": 88.95238,
        "groundspeed": 447,
        "altitude": 306,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791852,
        "latitude": 22.95961,
        "longitude": 88.88748,
        "groundspeed": 453,
        "altitude": 310,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791882,
        "latitude": 22.94019,
        "longitude": 88.82441,
        "groundspeed": 455,
        "altitude": 315,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791912,
        "latitude": 22.91982,
        "longitude": 88.75904,
        "groundspeed": 457,
        "altitude": 320,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791931,
        "latitude": 22.90645,
        "longitude": 88.71536,
        "groundspeed": 459,
        "altitude": 323,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791951,
        "latitude": 22.89317,
        "longitude": 88.6721,
        "groundspeed": 456,
        "altitude": 327,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664791981,
        "latitude": 22.8727,
        "longitude": 88.60647,
        "groundspeed": 455,
        "altitude": 332,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664792011,
        "latitude": 22.85271,
        "longitude": 88.54371,
        "groundspeed": 451,
        "altitude": 338,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664792027,
        "latitude": 22.84163,
        "longitude": 88.50931,
        "groundspeed": 452,
        "altitude": 340,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664792068,
        "latitude": 22.80382,
        "longitude": 88.42651,
        "groundspeed": 458,
        "altitude": 342,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664792099,
        "latitude": 22.77294,
        "longitude": 88.36395,
        "groundspeed": 458,
        "altitude": 346,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664792131,
        "latitude": 22.74216,
        "longitude": 88.30096,
        "groundspeed": 459,
        "altitude": 350,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664792162,
        "latitude": 22.71046,
        "longitude": 88.23659,
        "groundspeed": 460,
        "altitude": 353,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664792192,
        "latitude": 22.6796,
        "longitude": 88.17439,
        "groundspeed": 462,
        "altitude": 357,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664792223,
        "latitude": 22.64906,
        "longitude": 88.11289,
        "groundspeed": 462,
        "altitude": 361,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664792253,
        "latitude": 22.61769,
        "longitude": 88.04983,
        "groundspeed": 460,
        "altitude": 365,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664792283,
        "latitude": 22.58743,
        "longitude": 87.98894,
        "groundspeed": 459,
        "altitude": 369,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664792313,
        "latitude": 22.55717,
        "longitude": 87.92838,
        "groundspeed": 459,
        "altitude": 372,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664792343,
        "latitude": 22.52715,
        "longitude": 87.8681,
        "groundspeed": 458,
        "altitude": 376,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664792373,
        "latitude": 22.49851,
        "longitude": 87.81087,
        "groundspeed": 459,
        "altitude": 379,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664792413,
        "latitude": 22.45694,
        "longitude": 87.72766,
        "groundspeed": 464,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664792443,
        "latitude": 22.42561,
        "longitude": 87.66511,
        "groundspeed": 464,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664792473,
        "latitude": 22.39481,
        "longitude": 87.60363,
        "groundspeed": 465,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664792503,
        "latitude": 22.3643,
        "longitude": 87.54298,
        "groundspeed": 465,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664792533,
        "latitude": 22.33479,
        "longitude": 87.48423,
        "groundspeed": 465,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664792568,
        "latitude": 22.29881,
        "longitude": 87.41252,
        "groundspeed": 464,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664792598,
        "latitude": 22.26755,
        "longitude": 87.35045,
        "groundspeed": 464,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664792628,
        "latitude": 22.23706,
        "longitude": 87.29007,
        "groundspeed": 465,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664792658,
        "latitude": 22.20505,
        "longitude": 87.22661,
        "groundspeed": 466,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664792691,
        "latitude": 22.17255,
        "longitude": 87.16242,
        "groundspeed": 469,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664792725,
        "latitude": 22.13571,
        "longitude": 87.08972,
        "groundspeed": 473,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664792755,
        "latitude": 22.10408,
        "longitude": 87.0273,
        "groundspeed": 475,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664792786,
        "latitude": 22.07214,
        "longitude": 86.96447,
        "groundspeed": 477,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664792816,
        "latitude": 22.04025,
        "longitude": 86.9017,
        "groundspeed": 477,
        "altitude": 381,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664792846,
        "latitude": 22.01042,
        "longitude": 86.84113,
        "groundspeed": 478,
        "altitude": 381,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664792877,
        "latitude": 21.98547,
        "longitude": 86.76952,
        "groundspeed": 481,
        "altitude": 381,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664792909,
        "latitude": 21.96199,
        "longitude": 86.69836,
        "groundspeed": 480,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664792939,
        "latitude": 21.93681,
        "longitude": 86.63189,
        "groundspeed": 477,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664792970,
        "latitude": 21.90848,
        "longitude": 86.56363,
        "groundspeed": 468,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664793013,
        "latitude": 21.86128,
        "longitude": 86.48118,
        "groundspeed": 472,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664793046,
        "latitude": 21.82322,
        "longitude": 86.41479,
        "groundspeed": 473,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664793076,
        "latitude": 21.78817,
        "longitude": 86.35422,
        "groundspeed": 473,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664793106,
        "latitude": 21.75343,
        "longitude": 86.29451,
        "groundspeed": 473,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664793156,
        "latitude": 21.69603,
        "longitude": 86.19648,
        "groundspeed": 476,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664793188,
        "latitude": 21.65785,
        "longitude": 86.13121,
        "groundspeed": 476,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664793218,
        "latitude": 21.62251,
        "longitude": 86.07094,
        "groundspeed": 475,
        "altitude": 381,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664793248,
        "latitude": 21.58753,
        "longitude": 86.0114,
        "groundspeed": 472,
        "altitude": 381,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664793276,
        "latitude": 21.55466,
        "longitude": 85.95362,
        "groundspeed": 471,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664793307,
        "latitude": 21.52566,
        "longitude": 85.89198,
        "groundspeed": 470,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664793349,
        "latitude": 21.48477,
        "longitude": 85.80387,
        "groundspeed": 468,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664793383,
        "latitude": 21.452,
        "longitude": 85.73356,
        "groundspeed": 468,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664793413,
        "latitude": 21.42224,
        "longitude": 85.66979,
        "groundspeed": 469,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664793443,
        "latitude": 21.39327,
        "longitude": 85.60755,
        "groundspeed": 468,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664793474,
        "latitude": 21.36347,
        "longitude": 85.54382,
        "groundspeed": 469,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664793505,
        "latitude": 21.33197,
        "longitude": 85.47938,
        "groundspeed": 469,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664793536,
        "latitude": 21.29849,
        "longitude": 85.4187,
        "groundspeed": 469,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664793566,
        "latitude": 21.26506,
        "longitude": 85.35838,
        "groundspeed": 469,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664793596,
        "latitude": 21.23262,
        "longitude": 85.29867,
        "groundspeed": 470,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664793626,
        "latitude": 21.19938,
        "longitude": 85.23722,
        "groundspeed": 469,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664793658,
        "latitude": 21.16333,
        "longitude": 85.17071,
        "groundspeed": 469,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664793695,
        "latitude": 21.12452,
        "longitude": 85.09893,
        "groundspeed": 469,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664793725,
        "latitude": 21.09212,
        "longitude": 85.03942,
        "groundspeed": 469,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664793755,
        "latitude": 21.05933,
        "longitude": 84.9791,
        "groundspeed": 469,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664793785,
        "latitude": 21.02623,
        "longitude": 84.91823,
        "groundspeed": 469,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664793815,
        "latitude": 20.99377,
        "longitude": 84.85845,
        "groundspeed": 471,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664793845,
        "latitude": 20.9608,
        "longitude": 84.79802,
        "groundspeed": 471,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664793875,
        "latitude": 20.92776,
        "longitude": 84.73765,
        "groundspeed": 472,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664793905,
        "latitude": 20.89467,
        "longitude": 84.67693,
        "groundspeed": 472,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664793935,
        "latitude": 20.86173,
        "longitude": 84.61675,
        "groundspeed": 472,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664793967,
        "latitude": 20.82645,
        "longitude": 84.55243,
        "groundspeed": 472,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664794018,
        "latitude": 20.77063,
        "longitude": 84.45066,
        "groundspeed": 470,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664794048,
        "latitude": 20.73766,
        "longitude": 84.39065,
        "groundspeed": 469,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664794088,
        "latitude": 20.69359,
        "longitude": 84.31068,
        "groundspeed": 469,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664794118,
        "latitude": 20.66052,
        "longitude": 84.25072,
        "groundspeed": 469,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664794148,
        "latitude": 20.62767,
        "longitude": 84.19103,
        "groundspeed": 470,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664794178,
        "latitude": 20.59457,
        "longitude": 84.13105,
        "groundspeed": 471,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664794208,
        "latitude": 20.56096,
        "longitude": 84.06998,
        "groundspeed": 471,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664794238,
        "latitude": 20.52791,
        "longitude": 84.01015,
        "groundspeed": 472,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664794268,
        "latitude": 20.49413,
        "longitude": 83.94908,
        "groundspeed": 473,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664794300,
        "latitude": 20.45943,
        "longitude": 83.8867,
        "groundspeed": 474,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664794330,
        "latitude": 20.42587,
        "longitude": 83.82763,
        "groundspeed": 476,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664794388,
        "latitude": 20.3584,
        "longitude": 83.70886,
        "groundspeed": 476,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664794419,
        "latitude": 20.32352,
        "longitude": 83.6475,
        "groundspeed": 476,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664794449,
        "latitude": 20.28951,
        "longitude": 83.58763,
        "groundspeed": 476,
        "altitude": 381,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664794525,
        "latitude": 20.2029,
        "longitude": 83.43547,
        "groundspeed": 473,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664794555,
        "latitude": 20.16898,
        "longitude": 83.37578,
        "groundspeed": 472,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664794585,
        "latitude": 20.13566,
        "longitude": 83.31732,
        "groundspeed": 473,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664794619,
        "latitude": 20.09702,
        "longitude": 83.24978,
        "groundspeed": 479,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664794649,
        "latitude": 20.06232,
        "longitude": 83.18907,
        "groundspeed": 478,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664794679,
        "latitude": 20.02859,
        "longitude": 83.13005,
        "groundspeed": 471,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664794710,
        "latitude": 19.99356,
        "longitude": 83.06895,
        "groundspeed": 468,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "-"
      },
      {
        "timestamp": 1664794764,
        "latitude": 19.93199,
        "longitude": 82.96181,
        "groundspeed": 469,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664794803,
        "latitude": 19.88935,
        "longitude": 82.88775,
        "groundspeed": 466,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664795883,
        "latitude": 18.62918,
        "longitude": 80.76959,
        "groundspeed": 471,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "C"
      },
      {
        "timestamp": 1664796087,
        "latitude": 18.24578,
        "longitude": 80.55376,
        "groundspeed": 456,
        "altitude": 380,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664796276,
        "latitude": 17.87341,
        "longitude": 80.39947,
        "groundspeed": 463,
        "altitude": 375,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664796307,
        "latitude": 17.81071,
        "longitude": 80.37362,
        "groundspeed": 467,
        "altitude": 369,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664796338,
        "latitude": 17.74873,
        "longitude": 80.34798,
        "groundspeed": 472,
        "altitude": 364,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664796372,
        "latitude": 17.67854,
        "longitude": 80.31898,
        "groundspeed": 475,
        "altitude": 358,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664796570,
        "latitude": 17.28722,
        "longitude": 80.14737,
        "groundspeed": 439,
        "altitude": 306,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664796597,
        "latitude": 17.25604,
        "longitude": 80.10031,
        "groundspeed": 433,
        "altitude": 298,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664796655,
        "latitude": 17.24405,
        "longitude": 79.98216,
        "groundspeed": 426,
        "altitude": 278,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664796685,
        "latitude": 17.24263,
        "longitude": 79.92067,
        "groundspeed": 420,
        "altitude": 268,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664796716,
        "latitude": 17.24162,
        "longitude": 79.86111,
        "groundspeed": 412,
        "altitude": 259,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664796746,
        "latitude": 17.24118,
        "longitude": 79.80096,
        "groundspeed": 406,
        "altitude": 249,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664796776,
        "latitude": 17.24081,
        "longitude": 79.74157,
        "groundspeed": 402,
        "altitude": 239,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664796809,
        "latitude": 17.24044,
        "longitude": 79.67604,
        "groundspeed": 395,
        "altitude": 229,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664796839,
        "latitude": 17.24006,
        "longitude": 79.61969,
        "groundspeed": 386,
        "altitude": 221,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664796869,
        "latitude": 17.2397,
        "longitude": 79.56612,
        "groundspeed": 379,
        "altitude": 213,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664796899,
        "latitude": 17.23927,
        "longitude": 79.50923,
        "groundspeed": 380,
        "altitude": 201,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664796929,
        "latitude": 17.23883,
        "longitude": 79.45187,
        "groundspeed": 408,
        "altitude": 193,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664796965,
        "latitude": 17.23828,
        "longitude": 79.37945,
        "groundspeed": 422,
        "altitude": 186,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664796995,
        "latitude": 17.23778,
        "longitude": 79.32001,
        "groundspeed": 396,
        "altitude": 181,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664797026,
        "latitude": 17.23718,
        "longitude": 79.26523,
        "groundspeed": 364,
        "altitude": 179,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664797062,
        "latitude": 17.23652,
        "longitude": 79.20564,
        "groundspeed": 322,
        "altitude": 174,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664797100,
        "latitude": 17.23604,
        "longitude": 79.14739,
        "groundspeed": 311,
        "altitude": 167,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664797130,
        "latitude": 17.23564,
        "longitude": 79.10245,
        "groundspeed": 303,
        "altitude": 158,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664797160,
        "latitude": 17.23522,
        "longitude": 79.05938,
        "groundspeed": 294,
        "altitude": 149,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664797190,
        "latitude": 17.2348,
        "longitude": 79.01725,
        "groundspeed": 285,
        "altitude": 140,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664797221,
        "latitude": 17.23438,
        "longitude": 78.97748,
        "groundspeed": 281,
        "altitude": 131,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664797242,
        "latitude": 17.22432,
        "longitude": 78.9478,
        "groundspeed": 290,
        "altitude": 125,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664797273,
        "latitude": 17.20249,
        "longitude": 78.91308,
        "groundspeed": 288,
        "altitude": 118,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664797307,
        "latitude": 17.1768,
        "longitude": 78.87374,
        "groundspeed": 275,
        "altitude": 112,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664797345,
        "latitude": 17.15017,
        "longitude": 78.83367,
        "groundspeed": 272,
        "altitude": 104,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664797361,
        "latitude": 17.13867,
        "longitude": 78.8166,
        "groundspeed": 269,
        "altitude": 100,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664797378,
        "latitude": 17.12992,
        "longitude": 78.79767,
        "groundspeed": 256,
        "altitude": 96,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664797399,
        "latitude": 17.13346,
        "longitude": 78.77344,
        "groundspeed": 237,
        "altitude": 91,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664797419,
        "latitude": 17.14947,
        "longitude": 78.75986,
        "groundspeed": 220,
        "altitude": 88,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664797437,
        "latitude": 17.16856,
        "longitude": 78.75814,
        "groundspeed": 210,
        "altitude": 85,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664797467,
        "latitude": 17.1974,
        "longitude": 78.75882,
        "groundspeed": 209,
        "altitude": 77,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664797496,
        "latitude": 17.22451,
        "longitude": 78.75912,
        "groundspeed": 207,
        "altitude": 71,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664797515,
        "latitude": 17.24104,
        "longitude": 78.75231,
        "groundspeed": 209,
        "altitude": 66,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664797533,
        "latitude": 17.24556,
        "longitude": 78.73487,
        "groundspeed": 221,
        "altitude": 63,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      },
      {
        "timestamp": 1664797558,
        "latitude": 17.23662,
        "longitude": 78.70988,
        "groundspeed": 215,
        "altitude": 59,
        "altitudeStatus": "-",
        "updateType": "TA",
        "altitudeChange": "D"
      }
    ]
  }

    })

    return {
      activeKey: ref("1"),
      id,
      flightReactive,
      dateFullFormat,
      getDuration,
      realTrack
    };
  }
});
</script>
<style>
</style>
