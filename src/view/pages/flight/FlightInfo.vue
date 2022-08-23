<template>
  <CardToolbox>
    <ContactPageheaderStyle>
      <sdPageHeader title="Flight Information">
      <template v-slot:buttons>
        <div class="page-header-actions">
          <router-link :to="{ name: 'edit', params: { flightId: id } }">
            <sdButton size="small" type="primary">
              <sdFeatherIcons type="edit" size="14" />
              Edit Flight
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
      </sdPageHeader> -->
    </ContactPageheaderStyle>
  </CardToolbox>

  <Main>
    
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="Flight Info">
        <FlightCard v-if="flightReactive.flight" 
          :flight="flightReactive.flight"
          :destinationAirport="flightReactive.destinationAirport"
          :departureAirport="flightReactive.departureAirport"

        ></FlightCard>

      </a-tab-pane>
      <a-tab-pane key="2" tab="TimeLine" force-render>
        <a-row :gutter="25">
          <a-col :lg="24" :md="24" :sm="24" :xs="24">
            <sdCards headless>
            
              <a-timeline v-if="flightReactive.flight" >
                <a-timeline-item>
                  <p>{{dateFullFormat(flightReactive.outTime)}}</p>
                  <p>Push Back</p>
                  <p class="left">{{getDuration(flightReactive.outTime, flightReactive.offTime)}} Taxi Time</p>
                </a-timeline-item>
                <a-timeline-item>
                  <p>{{dateFullFormat(flightReactive.offTime)}}</p>
                  <p>Takeoff from {{flightReactive.departureAirport && flightReactive.departureAirport.get('airportName')}}</p>
                  <p class="left">{{getDuration(flightReactive.offTime, flightReactive.onTime)}} Flight Time</p>
                </a-timeline-item>
                <a-timeline-item>
                  <p>{{dateFullFormat(flightReactive.onTime)}}</p>
                  <p>Landing at {{flightReactive.destinationAirport && flightReactive.destinationAirport.get('airportName')}}</p>
                  <p class="left">{{getDuration(flightReactive.onTime, flightReactive.inTime)}} Taxi Time</p>
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
              <CrewCard :crew="flightReactive.pilotInCommandPointer"/>
            </sdCards>
            <a-divider orientation="left">Crew2</a-divider>
            <sdCards>
              <CrewCard :crew="flightReactive.crew2Pointer"/>
            </sdCards>
            <a-divider orientation="left">Crew3</a-divider>
            <sdCards>
              <CrewCard :crew="flightReactive.crew3Pointer"/>
            </sdCards>
            <a-divider orientation="left">Crew4</a-divider>
            <sdCards>
              <CrewCard :crew="flightReactive.crew4Pointer"/>
            </sdCards>
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-tab-pane key="4" tab="Notes">
        <a-row :gutter="25">
          <a-col :lg="24" :md="24" :sm="24" :xs="24">
            <sdCards>
              {{flightReactive.flight.get('notes')}}
            </sdCards>
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-tab-pane key="5" tab="Map">
        <a-row :gutter="25">
          <a-col :lg="24" :md="24" :sm="24" :xs="24">
            <sdCards>
              <MapCard :departureAirport="flightReactive.departureAirport" :destinationAirport="flightReactive.destinationAirport"></MapCard>
            </sdCards>
          </a-col>
        </a-row>
      </a-tab-pane>
    </a-tabs>
  </Main>
</template>
<script>
import { defineComponent, ref, reactive, onMounted, inject } from "vue";
import { Main, CardToolbox} from "../../styled";
import { ContactPageheaderStyle } from "../style"
import CrewCard from "./components/crew.vue"
import FlightCard from "./components/flightDetails.vue"
import MapCard from "./components/map.vue"
import { useRoute } from "vue-router";
import Flight from "../../../server/Flight"
import moment from "moment";

export default defineComponent({
  components:{
    FlightCard,
    Main,
    CrewCard,
    ContactPageheaderStyle,
    CardToolbox,
    MapCard
  },
  setup() {
    const dateFullFormat = inject('dateFullFormat');
    const router = useRoute();
    let id = router.params.flightId;
    const flightReactive = reactive({
      flight: '',
      pilotInCommandPointer: '',
      crew2Pointer: '',
      crew3Pointer: '',
      crew4Pointer: '',
      departureAirport: '',
      destinationAirport: '',
      outTime: '',
      offTime: '',
      onTime: '',
      inTime:''
    })
    
    onMounted( async () => {
      flightReactive.flight = await Flight.getFlight(id);
      flightReactive.pilotInCommandPointer = flightReactive.flight.get('pilotInCommandPointer')
      flightReactive.crew2Pointer = flightReactive.flight.get('crew2Pointer')
      flightReactive.crew3Pointer = flightReactive.flight.get('crew3Pointer')
      flightReactive.crew4Pointer = flightReactive.flight.get('crew4Pointer')
      flightReactive.departureAirport = flightReactive.flight.get('departureAirport')
      flightReactive.destinationAirport = flightReactive.flight.get('destinationAirport')
      flightReactive.outTime = flightReactive.flight.get('outTime')
      flightReactive.offTime = flightReactive.flight.get('offTime')
      flightReactive.onTime = flightReactive.flight.get('onTime')
      flightReactive.inTime = flightReactive.flight.get('inTime')
    })

    const getDuration = (f, l) => {
      var fTime = moment(f);
      var lTime = moment(l);

      var duration = moment.duration(lTime.diff(fTime));
      var minutes = duration.asMinutes();
      if(minutes >= 60 ){
        return Math.floor(minutes / 60) + ':' + Math.round(minutes % 60, 2)
      }else{
        return minutes
      }
    }

    return {
      activeKey: ref("1"),
      id,
      flightReactive,
      dateFullFormat,
      getDuration
    };
  },
});
</script>
<style>

</style>
