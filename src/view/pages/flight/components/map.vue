<template>
    <GoogleMap api-key="AIzaSyBhjRdMR7Ibbe0AT6e7TQDEv7Q3y7Gjofg" style="width: 100%; height: 500px" :center="markPointer[0]" :zoom="5">
        <Polygon :options="lineDraw" />
        <Marker v-for="op, index in markPointer" :key="index" :options="{ position: op }">
            <InfoWindow>
                <p><img :src="op.countryCode" style="width: 24px;margin-right: 10px;"/>{{op.label}}</p>
                <span>{{op.city}}, {{op.country}}</span>
            </InfoWindow>
        </Marker>
    </GoogleMap>
</template>

<script>
import { defineComponent } from 'vue'
import { GoogleMap, Polygon, Marker, InfoWindow } from "vue3-google-map";
import counties from "../../../../helper/countryData.json";

export default defineComponent({
    components: { GoogleMap, Polygon, Marker, InfoWindow },
    props:{
      departureAirport: {
        required: true
      },
      destinationAirport: {
        required: true
      }
    },
    setup(props) {
      const markPointer = [
        {
          lat: props.departureAirport && props.departureAirport.get('latitude'),
          lng: props.departureAirport && props.departureAirport.get('longitude'),
          label: props.departureAirport && props.departureAirport.get('airportName'),
          city: props.departureAirport && props.departureAirport.get('city'),
          country: props.departureAirport && props.departureAirport.get('country'),
          countryCode: props.departureAirport && counties[props.departureAirport.get('countryCode')].image,
        },
        {
          lat: props.destinationAirport && props.destinationAirport.get('latitude'),
          lng: props.destinationAirport && props.destinationAirport.get('longitude'),
          label: props.destinationAirport && props.destinationAirport.get('airportName'),
          city: props.destinationAirport && props.destinationAirport.get('city'),
          country: props.destinationAirport && props.destinationAirport.get('country'),
          countryCode: props.destinationAirport && counties[props.destinationAirport.get('countryCode')].image,
        },
      ];
        const lineDraw = {
          paths: markPointer,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
        };

        return {  markPointer, lineDraw };
    },
})
</script>
