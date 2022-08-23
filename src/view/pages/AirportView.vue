<template>
  <Main>
    <a-form>
      <a-row :gutter="25">
        <a-col :xs="24">
          <sdCards title="Airport View">
            <a-row :gutter="30" class="center">
              <a-col>
                <h1>Enter an airport code to start</h1>
                <a-input
                  placeholder="Eg. KLAX"
                  v-model:value="formState.searchCity"
                />
                <sdButton @click="search()" type="primary" html-type="submit"
                  >Search</sdButton
                >
              </a-col>
            </a-row>
          </sdCards>
        </a-col>
      </a-row>
    </a-form>
 <!-- :center="{
          lat: marker.markerOptions.position.lat,
          lng: marker.markerOptions.position.lng,
        }" -->
    <sdCards>
      <GoogleMap
        v-if="formState.flag"
        api-key="AIzaSyBhjRdMR7Ibbe0AT6e7TQDEv7Q3y7Gjofg"
        style="width: 100%; height: 500px"
        :zoom="formState.zoom"
        :center="formState.center"
       
      >
        <Marker v-if="formState.marker" :options="marker.markerOptions" />
  
      </GoogleMap>
    </sdCards>
  </Main>
</template>
<script>
import { defineComponent, reactive, onMounted } from "vue";
import airports from "../../server/Airport";
import { Main } from "../styled";

import { GoogleMap, Marker } from "vue3-google-map";

export default defineComponent({
  components: {
    Main,
    GoogleMap,
    Marker,
    // InfoWindow
  },

  setup() {
    onMounted(() => {});
    const formState = reactive({
      searchCity: "",
      flag: true,
      zoom:1,
      center:{
        lat:44,
        lng:35
      },
      marker:false
    });

    const marker = reactive({
      markerOptions: {
        position: {
          lat: 0,
          lng: 0,
        },
        label: "",
        title: "",
      },
    });

    const search = () => {
      formState.flag = false;
      formState.zoom=16

      airports
        .getAirports(formState.searchCity.toUpperCase())
        .then((results) => {
          formState.marker=true
          console.log("res",results)
          formState.flag = true;
          console.log("sc", formState.searchCity);
        if(results){
            for (const i of results) {
            
              marker.markerOptions.position.lat = i.lat;
              marker.markerOptions.position.lng = i.long;
              formState.center.lat=i.lat
              formState.center.lng=i.long

              marker.markerOptions.label = i.city;
              console.log("m", marker);
            

            console.log(i.city);
          }
        }
        });
    };

    return {
      formState,
      search,
      marker,
    };
  },
});
</script>
<style scoped>
.center {
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>
