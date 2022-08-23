<template>
  <Main>
    <sdCards title="Map">
      <a-tabs :tab-position="tabPosition" v-model:activeKey="activeKey1">
        <a-tab-pane key="1" type="card">
          <template #tab>
            <span>
              <font-awesome-icon class="icon" icon="fa-solid fa-map" />Map
            </span>
          </template>
          <sdCards>
            <GoogleMap
              api-key="AIzaSyBhjRdMR7Ibbe0AT6e7TQDEv7Q3y7Gjofg"
              style="width: 100%; height: 500px"
              :zoom="2"
            >
              <MarkerCluster  >
                <p v-for="(marker,index) in formState.markerpointer" :key="index">
                  <Polyline :options="{path:marker}" />
                  <Marker
                    v-for="(location, i) in marker"
                    :options="{ position: location, }"
                    :key="i"
                  >
                   <InfoWindow>
                  <p><img :src="location.countryCode" style="width: 24px;margin-right: 10px;"/>{{location.label}}</p>
                <span>{{location.city}}, {{location.country}}</span>
                  </InfoWindow>
                  </Marker>
                 
                </p>
              </MarkerCluster>
            </GoogleMap>
          </sdCards>
        </a-tab-pane>
        <a-tab-pane key="2" type="card">
          <template #tab>
            <span>
              <font-awesome-icon class="icon" icon="fa-solid fa-globe" />Earth
            </span>
          </template>
          h
        </a-tab-pane>
      </a-tabs>
    </sdCards>

    <!-- <p>{{formState.markerpointer.length}}</p> -->
  </Main>
</template>

<script>
import { defineComponent, ref, onMounted, reactive } from "vue";
import { Main } from "../styled";
// import { GoogleMap } from "vue3-google-map";
import countries from "../../helper/countryData.json"
import Flight from "../../server/Flight";
import {
  GoogleMap,
  Marker,
  MarkerCluster,
  Polyline,
  InfoWindow
} from "vue3-google-map";

export default defineComponent({
  components: {
    Main,
    Marker,
    GoogleMap,
    MarkerCluster,
    Polyline,
    InfoWindow
  },
  setup() {
    const tabPosition = ref("left");
    onMounted(() => {
      Flight.getFlightsForMap().then(res => {
        // console.log(res.airpots)
        for (var arr of res.airpots) {
          if (arr[0]) {
            console.log(arr[0].get("city"));
            formState.markerpointer.push([
              {
                lat: arr[0].get("latitude"),
                lng: arr[0].get("longitude"),
                label: arr[0].get("airportName"),
                country: arr[0].get("country"),
                countryCode: countries[arr[0].get("countryCode")].image,
                city: arr[0].get("city")
              },
              {
                lat: arr[1].get("latitude"),
                lng: arr[1].get("longitude"),
                label: arr[1].get("airportName"),
                country: arr[1].get("country"),
                countryCode: countries[arr[1].get("countryCode")].image,
                city: arr[1].get("city")
              }
            ]);
          }
        }
      });
    });

    const formState = reactive({
      flight: "",
      markerpointer: []
    });
    return {
      activeKey1: ref("1"),
      tabPosition,
      formState
    };
  }
});
</script>
