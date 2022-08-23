<template>
    <CardToolbox>
      <ContactPageheaderStyle>
        <sdPageHeader title="Flights">
          <template #subTitle>
            <a-input v-model:value="pageSettings.searchFilter"  placeholder="Search by Name">
              <template #suffix>
                <font-awesome-icon v-if="!pageSettings.searchFilter" icon="fas fa-search" />
                <font-awesome-icon v-else icon="fas fa-times" @click="pageSettings.searchFilter = ''"/>
              </template>
            </a-input>
          </template>
        </sdPageHeader>
      </ContactPageheaderStyle>
    </CardToolbox>
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
</template>
<script>
import { defineComponent, reactive, onMounted, computed } from 'vue'
import { Main, CardToolbox  } from "../../styled";
import { ContactPageheaderStyle } from "../style"
import FlightCard from './FlightCard.vue'
import Flight from "../../../server/Flight"

export default defineComponent({
    components:{
        FlightCard,
        Main,
        CardToolbox,
        ContactPageheaderStyle
    },
    setup() {
      const pageSettings = reactive({
          loader : false,
          flightsDetails: [],
          searchFilter: '' 
      })
      // let flightsDetails = '';
      onMounted(async () => {
        var flightObj = await Flight.getFlights()
        pageSettings.flightsDetails = flightObj.map((k) => {
          return {
            departure: k.get('departure'),
            destination: k.get('destination'),
            blockTime: k.get('blockTime'),
            flightNumber: k.get('flightNumber'),
            flightDate: k.get('flightDate'),
            id: k.id
          }
        })
      }); 

      const flightsDetails = computed(() => {
        return pageSettings.flightsDetails && pageSettings.flightsDetails.filter((fli) => {
                return fli.flightNumber && fli.flightNumber.toLowerCase().includes(pageSettings.searchFilter.toLowerCase()) ||
                fli.departure && fli.departure.toLowerCase().includes(pageSettings.searchFilter.toLowerCase()) ||
                fli.destination && fli.destination.toLowerCase().includes(pageSettings.searchFilter.toLowerCase());
        });
      });
      
        return {
            pageSettings,
            flightsDetails
        }
    },
})
</script>
<style scoped>
.flights{
    background: #dbdbd9;
    padding:1%
}
.search-box{
    background: #dbdbd9;
    min-height: 45px;

}
</style>