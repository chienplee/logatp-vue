<template>
  <CardToolbox>
    <ContactPageheaderStyle>
      <sdPageHeader title="Flights">
        <template #subTitle>
          <a-input v-model:value="pageSettings.searchFilter" placeholder="Search by Name">
            <template #suffix>
              <font-awesome-icon v-if="!pageSettings.searchFilter" icon="fas fa-search" />
              <font-awesome-icon
                v-else
                icon="fas fa-times"
                @click="pageSettings.searchFilter = ''"
              />
            </template>
          </a-input>
        </template>
      </sdPageHeader>
    </ContactPageheaderStyle>
  </CardToolbox>
  <a-spin :spinning="pageSettings.loader" class size="large">
    <Main>
        <a-row :gutter="25">
          <a-col v-for="flight in flightsDetails" :key="flight.id" :lg="6" :md="8" :sm="12" :xs="24">
            <router-link to="/flightinfo">
              <sdCards headless>
                <FlightCard :flight="flight" />
              </sdCards>
            </router-link>
          </a-col>
          
        </a-row>
    </Main>
  </a-spin>
</template>
<script>
import { defineComponent, reactive, onMounted, computed } from "vue";
import { Main, CardToolbox } from "../../styled";
import { ContactPageheaderStyle } from "../style";
import FlightCard from "./FlightCard.vue";
import Flight from "../../../server/Flight";
export default defineComponent({
  components: {
    FlightCard,
    Main,
    CardToolbox,
    ContactPageheaderStyle,
  },
  setup() {
    const pageSettings = reactive({
      loader: true,
      flightsDetails: [],
      searchFilter: "",
      current: 1,
      limit: 16,
      skip: 0,
      total: 100,
      bottom:true,
      temp:[]
    });
    // let flightsDetails = '';
    onMounted(async () => {
      await getFlightData(1);
      await getNextRecords();
      pageSettings.loader = false;
    });
    const getNextRecords = async () => {
      window.onscroll = async () => {
        let documentHeight = document.body.scrollHeight;
        let currentScroll = window.scrollY + window.innerHeight;
        // When the user is [modifier]px from the bottom, fire the event.
        let modifier = 50; 
        if(currentScroll + modifier > documentHeight && pageSettings.bottom) {
            
            console.log('You are at the bottom!',pageSettings.bottom)
            pageSettings.bottom=false
            await getFlightData(pageSettings.current);

        }
        if(currentScroll + modifier < documentHeight){
        console.log('else!',pageSettings.bottom)
        pageSettings.bottom=true          
        }

    }
    };
    const flightsDetails = computed(() => {
      return (
        pageSettings.flightsDetails &&
        pageSettings.flightsDetails.filter(fli => {
          return (
            (fli.flightNumber &&
              fli.flightNumber
                .toLowerCase()
                .includes(pageSettings.searchFilter.toLowerCase())) ||
            (fli.departure &&
              fli.departure
                .toLowerCase()
                .includes(pageSettings.searchFilter.toLowerCase())) ||
            (fli.destination &&
              fli.destination
                .toLowerCase()
                .includes(pageSettings.searchFilter.toLowerCase()))
          );
        })
      );
    });
    const getFlightData = async current => {
      if(pageSettings.total==pageSettings.flightsDetails.length)
        {
          return
        }
      pageSettings.loader=true;
      pageSettings.skip = (current - 1) * pageSettings.limit;
      var flightObj = await Flight.getFlights(
        pageSettings.limit,
        pageSettings.skip
      );
      pageSettings.total = await Flight.getFlightsLength();
      pageSettings.temp = flightObj.map(k => {
        return {
          departure: k.get("departure"),
          destination: k.get("destination"),
          blockTime: k.get("blockTime"),
          flightNumber: k.get("flightNumber"),
          flightDate: k.get("flightDate"),
          id: k.id
        };
      });
      pageSettings.flightsDetails.push(...pageSettings.temp);
      pageSettings.current++;
      pageSettings.loader=false;
    };
    const changed = async current => {
      console.log("changed");
      await getFlightData(current);
    };
    return {
      pageSettings,
      flightsDetails,
      changed,
      getFlightData,
      getNextRecords
    };
  }
});
</script>
<style scoped>
.flights {
  background: #dbdbd9;
  padding: 1%;
}
.search-box {
  background: #dbdbd9;
  min-height: 45px;
}
</style>