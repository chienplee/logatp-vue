

  <template>
  <!-- <p>{{realTrack.GetHistoricalTrackResult.data[0]}}</p>F -->
  <a-spin :spinning="realTrack.loader" class size="large">


  <GoogleMap
    api-key="AIzaSyBhjRdMR7Ibbe0AT6e7TQDEv7Q3y7Gjofg"
    style="width: 100%; height: 500px"
    :zoom="3"
  >
    <!-- <Polyline :options="lineDraw" /> -->

    <!-- <p v-for=" data in realTrack.GetHistoricalTrackResult.data" :key="data"> -->
    <CustomMarker
      v-for="data in realTrack.GetHistoricalTrackResult.data"
      :key="data"
      :options="{ position: data, anchorPoint: 'BOTTOM_CENTER' }"
      :zoom="0"
    >
      <Polyline :options="lineDraw" />

      <div style="text-align: center">
        <!-- <img src="../static/img/marker.jpg" width="30" height="30" style="margin-top: 8px" /> -->

        <!-- <img src="../static/img/project.png" width="30" height="30" style="margin-top: 8px" /> -->
        <a-tooltip placement="top">
          <template #title>
            <div>
              <h4>{{new Date(data.timestamp)}}</h4>
              <p>Altitude:{{data.altitude}},Groundspeed:{{data.groundspeed}}knots</p>
            </div>
          </template>
          <img src="../static/img/project.png" width="30" height="30" style="margin-top: 8px" />
        </a-tooltip>

        <!-- <font-awesome-icon icon="fa-solid fa-location-dot" /> -->
      </div>
    </CustomMarker>

    <!-- </p> -->
  </GoogleMap>
  </a-spin>
</template>
  
  <script>
import { defineComponent, reactive, onMounted } from "vue";
import { GoogleMap, CustomMarker, Polyline } from "vue3-google-map";
import PropTypes from "vue-types";
// import Parse from "parse";
import Flight from "../server/Flight";

export default defineComponent({
  components: { GoogleMap, CustomMarker, Polyline },
  props: {
    id: {
      required: false,
      type: PropTypes.String
    }
  },
  setup(props) {
    //   const center = { lat: 52.36834, lng: 4.88635 }
    onMounted(async () => {
      // console.log(props.id);
      realTrack.loader=true
      const flight = await Flight.getFlight(props.id);
      const realTrackData = flight.get("realTrack");
      // console.log(realTrackData);
      if (realTrackData) {
        // console.log(JSON.parse(realTrackData).GetHistoricalTrackResult.data[0]);
        const getData = JSON.parse(realTrackData).GetHistoricalTrackResult.data;
        for (var i in getData) {
          // console.log(getData[i]);
          // console.log(getData[i].groundspeed)
          realTrack.GetHistoricalTrackResult.data.push({
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
      realTrack.loader=false


      // console.log(flight);
    });
    const center = {
      timestamp: 1664790837,
      lat: 39,
      lng: 34,
      groundspeed: 167,
      altitude: 10,
      altitudeStatus: "-",
      updateType: "TA",
      altitudeChange: "-"
    };
    const realTrack = reactive({
      loader:true,
      GetHistoricalTrackResult: {
        data: [

          // {
          //   timestamp: 1664790837,
          //   lat: 23.82837,
          //   lng: 90.40976,
          //   groundspeed: 167,
          //   altitude: 10,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664790857,
          //   lat: 23.81529,
          //   lng: 90.42033,
          //   groundspeed: 192,
          //   altitude: 16,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664790875,
          //   lat: 23.80193,
          //   lng: 90.43101,
          //   groundspeed: 212,
          //   altitude: 21,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664790940,
          //   lat: 23.74774,
          //   lng: 90.41738,
          //   groundspeed: 256,
          //   altitude: 53,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664790960,
          //   lat: 23.74635,
          //   lng: 90.38844,
          //   groundspeed: 279,
          //   altitude: 61,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664790990,
          //   lat: 23.74681,
          //   lng: 90.34541,
          //   groundspeed: 285,
          //   altitude: 77,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791020,
          //   lat: 23.74681,
          //   lng: 90.30182,
          //   groundspeed: 292,
          //   altitude: 93,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791037,
          //   lat: 23.74132,
          //   lng: 90.27949,
          //   groundspeed: 296,
          //   altitude: 99,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791067,
          //   lat: 23.71809,
          //   lng: 90.24123,
          //   groundspeed: 320,
          //   altitude: 109,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791097,
          //   lat: 23.69258,
          //   lng: 90.19977,
          //   groundspeed: 329,
          //   altitude: 122,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791127,
          //   lat: 23.6673,
          //   lng: 90.1577,
          //   groundspeed: 333,
          //   altitude: 136,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791157,
          //   lat: 23.64175,
          //   lng: 90.11485,
          //   groundspeed: 344,
          //   altitude: 148,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791187,
          //   lat: 23.6152,
          //   lng: 90.0706,
          //   groundspeed: 351,
          //   altitude: 159,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791217,
          //   lat: 23.5883,
          //   lng: 90.02544,
          //   groundspeed: 357,
          //   altitude: 171,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791247,
          //   lat: 23.56169,
          //   lng: 89.97752,
          //   groundspeed: 361,
          //   altitude: 182,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791278,
          //   lat: 23.53551,
          //   lng: 89.92944,
          //   groundspeed: 368,
          //   altitude: 192,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791308,
          //   lat: 23.5086,
          //   lng: 89.88083,
          //   groundspeed: 374,
          //   altitude: 202,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791339,
          //   lat: 23.48126,
          //   lng: 89.83186,
          //   groundspeed: 381,
          //   altitude: 210,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791382,
          //   lat: 23.44633,
          //   lng: 89.75585,
          //   groundspeed: 388,
          //   altitude: 224,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791412,
          //   lat: 23.4245,
          //   lng: 89.70107,
          //   groundspeed: 395,
          //   altitude: 231,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791442,
          //   lat: 23.40479,
          //   lng: 89.64605,
          //   groundspeed: 403,
          //   altitude: 238,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791472,
          //   lat: 23.38651,
          //   lng: 89.58597,
          //   groundspeed: 417,
          //   altitude: 242,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791513,
          //   lat: 23.34888,
          //   lng: 89.51346,
          //   groundspeed: 420,
          //   altitude: 251,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791543,
          //   lat: 23.3139,
          //   lng: 89.46157,
          //   groundspeed: 426,
          //   altitude: 257,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791573,
          //   lat: 23.2784,
          //   lng: 89.40918,
          //   groundspeed: 432,
          //   altitude: 263,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791603,
          //   lat: 23.24249,
          //   lng: 89.35655,
          //   groundspeed: 441,
          //   altitude: 266,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791623,
          //   lat: 23.21867,
          //   lng: 89.32165,
          //   groundspeed: 444,
          //   altitude: 269,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791643,
          //   lat: 23.19279,
          //   lng: 89.28375,
          //   groundspeed: 446,
          //   altitude: 273,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791673,
          //   lat: 23.15593,
          //   lng: 89.22991,
          //   groundspeed: 447,
          //   altitude: 279,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791704,
          //   lat: 23.11845,
          //   lng: 89.17526,
          //   groundspeed: 450,
          //   altitude: 284,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791734,
          //   lat: 23.08173,
          //   lng: 89.12184,
          //   groundspeed: 454,
          //   altitude: 287,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791764,
          //   lat: 23.04312,
          //   lng: 89.06581,
          //   groundspeed: 456,
          //   altitude: 292,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791780,
          //   lat: 23.02409,
          //   lng: 89.03773,
          //   groundspeed: 459,
          //   altitude: 293,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791822,
          //   lat: 22.98275,
          //   lng: 88.95238,
          //   groundspeed: 447,
          //   altitude: 306,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791852,
          //   lat: 22.95961,
          //   lng: 88.88748,
          //   groundspeed: 453,
          //   altitude: 310,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791882,
          //   lat: 22.94019,
          //   lng: 88.82441,
          //   groundspeed: 455,
          //   altitude: 315,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791912,
          //   lat: 22.91982,
          //   lng: 88.75904,
          //   groundspeed: 457,
          //   altitude: 320,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791931,
          //   lat: 22.90645,
          //   lng: 88.71536,
          //   groundspeed: 459,
          //   altitude: 323,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791951,
          //   lat: 22.89317,
          //   lng: 88.6721,
          //   groundspeed: 456,
          //   altitude: 327,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664791981,
          //   lat: 22.8727,
          //   lng: 88.60647,
          //   groundspeed: 455,
          //   altitude: 332,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664792011,
          //   lat: 22.85271,
          //   lng: 88.54371,
          //   groundspeed: 451,
          //   altitude: 338,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664792027,
          //   lat: 22.84163,
          //   lng: 88.50931,
          //   groundspeed: 452,
          //   altitude: 340,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664792068,
          //   lat: 22.80382,
          //   lng: 88.42651,
          //   groundspeed: 458,
          //   altitude: 342,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664792099,
          //   lat: 22.77294,
          //   lng: 88.36395,
          //   groundspeed: 458,
          //   altitude: 346,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664792131,
          //   lat: 22.74216,
          //   lng: 88.30096,
          //   groundspeed: 459,
          //   altitude: 350,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664792162,
          //   lat: 22.71046,
          //   lng: 88.23659,
          //   groundspeed: 460,
          //   altitude: 353,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664792192,
          //   lat: 22.6796,
          //   lng: 88.17439,
          //   groundspeed: 462,
          //   altitude: 357,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664792223,
          //   lat: 22.64906,
          //   lng: 88.11289,
          //   groundspeed: 462,
          //   altitude: 361,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664792253,
          //   lat: 22.61769,
          //   lng: 88.04983,
          //   groundspeed: 460,
          //   altitude: 365,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664792283,
          //   lat: 22.58743,
          //   lng: 87.98894,
          //   groundspeed: 459,
          //   altitude: 369,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664792313,
          //   lat: 22.55717,
          //   lng: 87.92838,
          //   groundspeed: 459,
          //   altitude: 372,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664792343,
          //   lat: 22.52715,
          //   lng: 87.8681,
          //   groundspeed: 458,
          //   altitude: 376,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664792373,
          //   lat: 22.49851,
          //   lng: 87.81087,
          //   groundspeed: 459,
          //   altitude: 379,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664792413,
          //   lat: 22.45694,
          //   lng: 87.72766,
          //   groundspeed: 464,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664792443,
          //   lat: 22.42561,
          //   lng: 87.66511,
          //   groundspeed: 464,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664792473,
          //   lat: 22.39481,
          //   lng: 87.60363,
          //   groundspeed: 465,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664792503,
          //   lat: 22.3643,
          //   lng: 87.54298,
          //   groundspeed: 465,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664792533,
          //   lat: 22.33479,
          //   lng: 87.48423,
          //   groundspeed: 465,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664792568,
          //   lat: 22.29881,
          //   lng: 87.41252,
          //   groundspeed: 464,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664792598,
          //   lat: 22.26755,
          //   lng: 87.35045,
          //   groundspeed: 464,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664792628,
          //   lat: 22.23706,
          //   lng: 87.29007,
          //   groundspeed: 465,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664792658,
          //   lat: 22.20505,
          //   lng: 87.22661,
          //   groundspeed: 466,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664792691,
          //   lat: 22.17255,
          //   lng: 87.16242,
          //   groundspeed: 469,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664792725,
          //   lat: 22.13571,
          //   lng: 87.08972,
          //   groundspeed: 473,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664792755,
          //   lat: 22.10408,
          //   lng: 87.0273,
          //   groundspeed: 475,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664792786,
          //   lat: 22.07214,
          //   lng: 86.96447,
          //   groundspeed: 477,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664792816,
          //   lat: 22.04025,
          //   lng: 86.9017,
          //   groundspeed: 477,
          //   altitude: 381,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664792846,
          //   lat: 22.01042,
          //   lng: 86.84113,
          //   groundspeed: 478,
          //   altitude: 381,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664792877,
          //   lat: 21.98547,
          //   lng: 86.76952,
          //   groundspeed: 481,
          //   altitude: 381,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664792909,
          //   lat: 21.96199,
          //   lng: 86.69836,
          //   groundspeed: 480,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664792939,
          //   lat: 21.93681,
          //   lng: 86.63189,
          //   groundspeed: 477,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664792970,
          //   lat: 21.90848,
          //   lng: 86.56363,
          //   groundspeed: 468,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664793013,
          //   lat: 21.86128,
          //   lng: 86.48118,
          //   groundspeed: 472,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664793046,
          //   lat: 21.82322,
          //   lng: 86.41479,
          //   groundspeed: 473,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664793076,
          //   lat: 21.78817,
          //   lng: 86.35422,
          //   groundspeed: 473,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664793106,
          //   lat: 21.75343,
          //   lng: 86.29451,
          //   groundspeed: 473,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664793156,
          //   lat: 21.69603,
          //   lng: 86.19648,
          //   groundspeed: 476,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664793188,
          //   lat: 21.65785,
          //   lng: 86.13121,
          //   groundspeed: 476,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664793218,
          //   lat: 21.62251,
          //   lng: 86.07094,
          //   groundspeed: 475,
          //   altitude: 381,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664793248,
          //   lat: 21.58753,
          //   lng: 86.0114,
          //   groundspeed: 472,
          //   altitude: 381,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664793276,
          //   lat: 21.55466,
          //   lng: 85.95362,
          //   groundspeed: 471,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664793307,
          //   lat: 21.52566,
          //   lng: 85.89198,
          //   groundspeed: 470,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664793349,
          //   lat: 21.48477,
          //   lng: 85.80387,
          //   groundspeed: 468,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664793383,
          //   lat: 21.452,
          //   lng: 85.73356,
          //   groundspeed: 468,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664793413,
          //   lat: 21.42224,
          //   lng: 85.66979,
          //   groundspeed: 469,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664793443,
          //   lat: 21.39327,
          //   lng: 85.60755,
          //   groundspeed: 468,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664793474,
          //   lat: 21.36347,
          //   lng: 85.54382,
          //   groundspeed: 469,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664793505,
          //   lat: 21.33197,
          //   lng: 85.47938,
          //   groundspeed: 469,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664793536,
          //   lat: 21.29849,
          //   lng: 85.4187,
          //   groundspeed: 469,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664793566,
          //   lat: 21.26506,
          //   lng: 85.35838,
          //   groundspeed: 469,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664793596,
          //   lat: 21.23262,
          //   lng: 85.29867,
          //   groundspeed: 470,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664793626,
          //   lat: 21.19938,
          //   lng: 85.23722,
          //   groundspeed: 469,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664793658,
          //   lat: 21.16333,
          //   lng: 85.17071,
          //   groundspeed: 469,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664793695,
          //   lat: 21.12452,
          //   lng: 85.09893,
          //   groundspeed: 469,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664793725,
          //   lat: 21.09212,
          //   lng: 85.03942,
          //   groundspeed: 469,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664793755,
          //   lat: 21.05933,
          //   lng: 84.9791,
          //   groundspeed: 469,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664793785,
          //   lat: 21.02623,
          //   lng: 84.91823,
          //   groundspeed: 469,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664793815,
          //   lat: 20.99377,
          //   lng: 84.85845,
          //   groundspeed: 471,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664793845,
          //   lat: 20.9608,
          //   lng: 84.79802,
          //   groundspeed: 471,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664793875,
          //   lat: 20.92776,
          //   lng: 84.73765,
          //   groundspeed: 472,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664793905,
          //   lat: 20.89467,
          //   lng: 84.67693,
          //   groundspeed: 472,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664793935,
          //   lat: 20.86173,
          //   lng: 84.61675,
          //   groundspeed: 472,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664793967,
          //   lat: 20.82645,
          //   lng: 84.55243,
          //   groundspeed: 472,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664794018,
          //   lat: 20.77063,
          //   lng: 84.45066,
          //   groundspeed: 470,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664794048,
          //   lat: 20.73766,
          //   lng: 84.39065,
          //   groundspeed: 469,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664794088,
          //   lat: 20.69359,
          //   lng: 84.31068,
          //   groundspeed: 469,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664794118,
          //   lat: 20.66052,
          //   lng: 84.25072,
          //   groundspeed: 469,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664794148,
          //   lat: 20.62767,
          //   lng: 84.19103,
          //   groundspeed: 470,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664794178,
          //   lat: 20.59457,
          //   lng: 84.13105,
          //   groundspeed: 471,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664794208,
          //   lat: 20.56096,
          //   lng: 84.06998,
          //   groundspeed: 471,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664794238,
          //   lat: 20.52791,
          //   lng: 84.01015,
          //   groundspeed: 472,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664794268,
          //   lat: 20.49413,
          //   lng: 83.94908,
          //   groundspeed: 473,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664794300,
          //   lat: 20.45943,
          //   lng: 83.8867,
          //   groundspeed: 474,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664794330,
          //   lat: 20.42587,
          //   lng: 83.82763,
          //   groundspeed: 476,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664794388,
          //   lat: 20.3584,
          //   lng: 83.70886,
          //   groundspeed: 476,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664794419,
          //   lat: 20.32352,
          //   lng: 83.6475,
          //   groundspeed: 476,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664794449,
          //   lat: 20.28951,
          //   lng: 83.58763,
          //   groundspeed: 476,
          //   altitude: 381,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664794525,
          //   lat: 20.2029,
          //   lng: 83.43547,
          //   groundspeed: 473,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664794555,
          //   lat: 20.16898,
          //   lng: 83.37578,
          //   groundspeed: 472,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664794585,
          //   lat: 20.13566,
          //   lng: 83.31732,
          //   groundspeed: 473,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664794619,
          //   lat: 20.09702,
          //   lng: 83.24978,
          //   groundspeed: 479,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664794649,
          //   lat: 20.06232,
          //   lng: 83.18907,
          //   groundspeed: 478,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664794679,
          //   lat: 20.02859,
          //   lng: 83.13005,
          //   groundspeed: 471,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664794710,
          //   lat: 19.99356,
          //   lng: 83.06895,
          //   groundspeed: 468,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "-"
          // },
          // {
          //   timestamp: 1664794764,
          //   lat: 19.93199,
          //   lng: 82.96181,
          //   groundspeed: 469,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664794803,
          //   lat: 19.88935,
          //   lng: 82.88775,
          //   groundspeed: 466,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664795883,
          //   lat: 18.62918,
          //   lng: 80.76959,
          //   groundspeed: 471,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "C"
          // },
          // {
          //   timestamp: 1664796087,
          //   lat: 18.24578,
          //   lng: 80.55376,
          //   groundspeed: 456,
          //   altitude: 380,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664796276,
          //   lat: 17.87341,
          //   lng: 80.39947,
          //   groundspeed: 463,
          //   altitude: 375,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664796307,
          //   lat: 17.81071,
          //   lng: 80.37362,
          //   groundspeed: 467,
          //   altitude: 369,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664796338,
          //   lat: 17.74873,
          //   lng: 80.34798,
          //   groundspeed: 472,
          //   altitude: 364,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664796372,
          //   lat: 17.67854,
          //   lng: 80.31898,
          //   groundspeed: 475,
          //   altitude: 358,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664796570,
          //   lat: 17.28722,
          //   lng: 80.14737,
          //   groundspeed: 439,
          //   altitude: 306,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664796597,
          //   lat: 17.25604,
          //   lng: 80.10031,
          //   groundspeed: 433,
          //   altitude: 298,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664796655,
          //   lat: 17.24405,
          //   lng: 79.98216,
          //   groundspeed: 426,
          //   altitude: 278,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664796685,
          //   lat: 17.24263,
          //   lng: 79.92067,
          //   groundspeed: 420,
          //   altitude: 268,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664796716,
          //   lat: 17.24162,
          //   lng: 79.86111,
          //   groundspeed: 412,
          //   altitude: 259,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664796746,
          //   lat: 17.24118,
          //   lng: 79.80096,
          //   groundspeed: 406,
          //   altitude: 249,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664796776,
          //   lat: 17.24081,
          //   lng: 79.74157,
          //   groundspeed: 402,
          //   altitude: 239,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664796809,
          //   lat: 17.24044,
          //   lng: 79.67604,
          //   groundspeed: 395,
          //   altitude: 229,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664796839,
          //   lat: 17.24006,
          //   lng: 79.61969,
          //   groundspeed: 386,
          //   altitude: 221,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664796869,
          //   lat: 17.2397,
          //   lng: 79.56612,
          //   groundspeed: 379,
          //   altitude: 213,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664796899,
          //   lat: 17.23927,
          //   lng: 79.50923,
          //   groundspeed: 380,
          //   altitude: 201,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664796929,
          //   lat: 17.23883,
          //   lng: 79.45187,
          //   groundspeed: 408,
          //   altitude: 193,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664796965,
          //   lat: 17.23828,
          //   lng: 79.37945,
          //   groundspeed: 422,
          //   altitude: 186,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664796995,
          //   lat: 17.23778,
          //   lng: 79.32001,
          //   groundspeed: 396,
          //   altitude: 181,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664797026,
          //   lat: 17.23718,
          //   lng: 79.26523,
          //   groundspeed: 364,
          //   altitude: 179,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664797062,
          //   lat: 17.23652,
          //   lng: 79.20564,
          //   groundspeed: 322,
          //   altitude: 174,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664797100,
          //   lat: 17.23604,
          //   lng: 79.14739,
          //   groundspeed: 311,
          //   altitude: 167,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664797130,
          //   lat: 17.23564,
          //   lng: 79.10245,
          //   groundspeed: 303,
          //   altitude: 158,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664797160,
          //   lat: 17.23522,
          //   lng: 79.05938,
          //   groundspeed: 294,
          //   altitude: 149,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664797190,
          //   lat: 17.2348,
          //   lng: 79.01725,
          //   groundspeed: 285,
          //   altitude: 140,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664797221,
          //   lat: 17.23438,
          //   lng: 78.97748,
          //   groundspeed: 281,
          //   altitude: 131,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664797242,
          //   lat: 17.22432,
          //   lng: 78.9478,
          //   groundspeed: 290,
          //   altitude: 125,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664797273,
          //   lat: 17.20249,
          //   lng: 78.91308,
          //   groundspeed: 288,
          //   altitude: 118,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664797307,
          //   lat: 17.1768,
          //   lng: 78.87374,
          //   groundspeed: 275,
          //   altitude: 112,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664797345,
          //   lat: 17.15017,
          //   lng: 78.83367,
          //   groundspeed: 272,
          //   altitude: 104,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664797361,
          //   lat: 17.13867,
          //   lng: 78.8166,
          //   groundspeed: 269,
          //   altitude: 100,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664797378,
          //   lat: 17.12992,
          //   lng: 78.79767,
          //   groundspeed: 256,
          //   altitude: 96,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664797399,
          //   lat: 17.13346,
          //   lng: 78.77344,
          //   groundspeed: 237,
          //   altitude: 91,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664797419,
          //   lat: 17.14947,
          //   lng: 78.75986,
          //   groundspeed: 220,
          //   altitude: 88,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664797437,
          //   lat: 17.16856,
          //   lng: 78.75814,
          //   groundspeed: 210,
          //   altitude: 85,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664797467,
          //   lat: 17.1974,
          //   lng: 78.75882,
          //   groundspeed: 209,
          //   altitude: 77,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664797496,
          //   lat: 17.22451,
          //   lng: 78.75912,
          //   groundspeed: 207,
          //   altitude: 71,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664797515,
          //   lat: 17.24104,
          //   lng: 78.75231,
          //   groundspeed: 209,
          //   altitude: 66,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664797533,
          //   lat: 17.24556,
          //   lng: 78.73487,
          //   groundspeed: 221,
          //   altitude: 63,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // },
          // {
          //   timestamp: 1664797558,
          //   lat: 17.23662,
          //   lng: 78.70988,
          //   groundspeed: 215,
          //   altitude: 59,
          //   altitudeStatus: "-",
          //   updateType: "TA",
          //   altitudeChange: "D"
          // }



        ]
      }
    });
    const lineDraw = {
      path: realTrack.GetHistoricalTrackResult.data,
      // strokeColor: "#FF0000",
      // strokeOpacity: 0.8,
      // strokeWeight: 2,
      // fillColor: "#FF0000",
      // fillOpacity: 0.35,
      geodesic: true,
      strokeColor: "#7B68EE",
      strokeOpacity: 1.0,
      strokeWeight: 2
    };
    return { center, realTrack, lineDraw };
  }
});
</script>
  