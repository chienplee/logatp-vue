<template>
  <div>
    <sdPageHeader title="Airplane Information">
      <template v-slot:buttons>
        <div class="page-header-actions">
          <router-link :to="{ name: 'editPlane', params: { planeId: formState.planeId } }">
            <sdButton size="small" type="primary">
              <sdFeatherIcons type="edit" size="14" />Edit Airplane
            </sdButton>
          </router-link>
        </div>
      </template>
    </sdPageHeader>
    <Main>
  <a-spin :spinning="formState.loader" class size="large">

      <a-tabs v-model:activeKey="activeKey" type="card">
        <a-tab-pane key="1" tab="Airplane Info">
          <a-row :gutter="25">
            <a-col :lg="24" :md="24" :sm="24" :xs="24">
              <sdCards>
                <a-row>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <label>Active</label>
                  </a-col>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <span><a-switch @change="onChange()" v-model:checked="formState.active" /></span>
                  </a-col>
               </a-row>
              </sdCards>
            </a-col>
            
            <a-col :lg="24" :md="24" :sm="24" :xs="24">
              <sdCards>
                <a-row>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <label>Manufacturer</label>
                  </a-col>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <span>{{formState.Manufacturer }}</span>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <label>Type</label>
                  </a-col>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <span>{{ formState.type }}</span>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <label>Registaton</label>
                  </a-col>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <span>{{formState.registration }}</span>
                  </a-col>
                </a-row>
              </sdCards>
            </a-col>
            <a-col :lg="24" :md="24" :sm="24" :xs="24">
              <sdCards>
                <a-row>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <label>LOGATPID</label>
                  </a-col>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <span>{{formState.LOGATPID}}</span>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <label>CloudID</label>
                  </a-col>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <span>{{formState.CloudId}}</span>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <label>CreatedAt</label>
                  </a-col>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <span>{{ formState.CreatedAt }}</span>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <label>UpdatedAt</label>
                  </a-col>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <span>{{ formState.UpdatedAt }}</span>
                  </a-col>
                </a-row>
              </sdCards>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Flights">
          <div class="" v-if="formState.flightsData">
            <a-row :gutter="25">
              <a-col  v-for="flight in formState.flightsData" :key="flight.id" :lg="6" :md="8" :sm="12" :xs="24">
                <router-link to="/flightinfo">
                  <sdCards headless>
                    <FlightCard :flight="flight" />
                  </sdCards>
                </router-link>
              </a-col>
            </a-row>
          </div>
          <div v-else>
            <p>No Data</p>
          </div>
        </a-tab-pane>
      </a-tabs>
      </a-spin>
    </Main>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from "vue";
// import Parse from "parse";
import { useRoute } from "vue-router";
import { Main } from "../../styled";
import Airplane from "../../../server/Airplane";
import Parse from "parse";
import FlightCard from "../flight/FlightCard.vue"
import moment from "moment";
export default defineComponent({
  components: {
    Main,
    FlightCard
  },
  setup() {
    const router = useRoute();

    const formState = reactive({
      planeId: router.params.planeid,
      flightsData:[],
      loader:true
    });

    onMounted(async () => {
      // console.log("hello");
      await Airplane.getPointer(formState.planeId).then(async object => {
        formState.type = object.get("aircraftType");
        formState.registration = object.get("aircraftRegistration");
        formState.airplaneName = object.get("airplaneName");
        // formState.createdAt = object.get("createdAt");
        // formState.createdAt = moment(object.get("createdAt")).format("DD-MMMM-YYYY");

        formState.active=object.get('isActive')
        // formState.Manuacturer=object.get('Manufacturer')
        const aircraftPointer = object.get("aircraftPointer")
        const query = new Parse.Query("Aircraft");
        query.get(aircraftPointer.id).then((res)=>{
          // console.log(res)
          // console.log(res.get("manufacturer"))
    
          formState.Manufacturer=res.get("manufacturer")
        })
        // console.log(aircraftPointer.get("manufacturer"))
        // var manufacturer=aircraftPointer.get("manufacturer")
        // formState.Manuacturer=manufacturer
         const createdAt = object.get("createdAt");
          const updatedAt = object.get("updatedAt");
          const logAtpId = object.get("realmID");
          // console.log(logAtpId)
          const CloudID = object.id;
        formState.CreatedAt =moment(createdAt).format("DD-MMMM-YYYY ");

                  formState.CloudId = CloudID;
          formState.LOGATPID = logAtpId;
          formState.updatedAt=moment(updatedAt).format("DD-MMMM-YYYY ");
         await Airplane.getFlightsOfManufacture(object.get("aircraftRegistration")).then((res)=>{
            formState.flightsData=res.map((k)=>{
              return {
            departure: k.get("departure"),
            destination: k.get("destination"),
            blockTime: k.get("blockTime"),
            flightNumber: k.get("flightNumber"),
            flightDate: k.get("flightDate"),
            id: k.id,
          };

            })
        // console.log(res)
        formState.loader = false
        
      })

 
      
       
      });

    });
    const onChange = ()=>{
      // console.log(formState.active)
      // console.log("clicked to update")
        // console.log(formState.planeId)
      var query = new Parse.Query("AirPlane");
      query.get(formState.planeId).then(async(obj)=>{
        obj.set("isActive",formState.active)
        

        await obj.save().then(()=>{
          
        },(error)=>{
          console.log(error)
        })
        



      })
    }
    return {
      formState,
      activeKey: ref("1"),
      Manuacturer:"",
      type: "",
      registration: "",
      airplaneName: "",
      LOGATPID: "",
      CloudId: "",
      CreatedAt: "",
      UpdatedAt: "",
      active:"",
      onChange,
      
      
    };
  }
});
</script>
