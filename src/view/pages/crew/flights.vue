<template>
  <a-row :gutter="25">
    <a-col
      v-for="flight in flightData.data"
      :key="flight.id"
      :lg="6"
      :md="8"
      :sm="12"
      :xs="24"
    >
      <router-link to="/flightinfo">
        <sdCards headless>
          <FlightCard :flight="flight" />
        </sdCards>
      </router-link>
    </a-col>
  </a-row>
</template>
<script>
import { defineComponent, onMounted, reactive } from "vue";
import flight from "../../../server/Flight";
import FlightCard from "../flight/FlightCard.vue";
import crew from "../../../server/Crew";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    FlightCard,
  },
  setup() {
    const flightData = reactive({
      data: [],
    });
    const router = useRoute();

    onMounted(async () => {
      // crew.getPointer(router.params.crewid).then((e)=>{console.log("e",e.get("firstName"))})
      crew.getPointer(router.params.crewid).then(async (e) => {
        var fname = e.get("firstName");
        var lname = e.get("lastName");
        var name = fname + " " + lname;

        console.log("name", name);
        var flightObj = await flight.getCrewMemberFlights(name);
        console.log("floghtobj", flightObj);
        // flightData.data = flightObj
        flightData.data = flightObj.map((k) => {
          return {
            departure: k.get("departure"),
            destination: k.get("destination"),
            blockTime: k.get("blockTime"),
            flightNumber: k.get("flightNumber"),
            flightDate: k.get("flightDate"),
            id: k.id,
          };
        });
      });
    });

    return {
      flightData,
    };
  },
});
</script>
