<template>
  <div>
  <a-spin :spinning="formState.loader" class size="large">

    <CardToolbox>
      <ContactPageheaderStyle>
        <sdPageHeader title="Airplanes">
          <template #subTitle></template>
          <template v-slot:buttons>
            <div class="page-header-actions">
              <router-link to="add-airplane">
                <sdButton size="small" type="primary">
                  <sdFeatherIcons type="plus" size="14" />
                  Add Airplane
                </sdButton></router-link
              >
            </div>
          </template>
        </sdPageHeader>
      </ContactPageheaderStyle>
    </CardToolbox>

    <Main>
      <sdCards v-for="item in  formState.finalData" :key="item" :title="item.type">
        
          
          <p v-for="(obj,i) in item.registration" :key="i">
        <router-link :to="{ name: 'airplaneInfo', params: { planeid: item.planeid[i] } }">

            {{obj}}
            <span  v-if="item.isActive[i]" class="move-right">
              <font-awesome-icon icon="fa-solid fa-check" />
            </span>
        </router-link>

          </p>
   

      </sdCards>
    </Main>
</a-spin>

  </div>

</template>

<script>
import { Main ,CardToolbox} from "../styled";
import { defineComponent, onMounted, reactive } from "vue";
import Airplane from "../../server/Airplane";
import JsHelper from "../../helper/JsHelper";
import { ContactPageheaderStyle } from "./style";

export default defineComponent({
  name: "airplanes",
  components: {
    Main,
    ContactPageheaderStyle,
    CardToolbox
  },
  setup() {
    onMounted(async () => {
      // console.log("onMounted");
      await Airplane.getAircrafts().then(results => {
        // console.log("res", results);
        for (const object of results) {
          // console.log(object);
          const type = object.get("aircraftType");
          const registration = object.get("aircraftRegistration");
          const airplaneName = object.get("airplaneName");
          const planeid = object.id;
          const isActive = object.get("isActive");
          formState.data.push({
            type:type,
            registration:registration,
            airplaneName:airplaneName,
            planeid:planeid,
            isActive:isActive
          });
        }
      // console.log(JsHelper.filterAircraftTypes(formState.data))

      formState.fliterData=  JsHelper.filterAircraftTypes(formState.data)
      // console.log(JsHelper.filterAircraftTypes(formState.data))



        
        
      });
      for(const i in formState.fliterData){
        // console.log( )
        for(var j in formState.fliterData[i].registration ){
          // console.log(formState.fliterData[i].registration[j],i)
          // const arr=[]
         await Airplane.getCustomAirplanes(formState.fliterData[i].registration[j],i).then(results=>{
          // console.log(formState.fliterData[i].registration[j],i)
            // console.log(results)
            
            for(const object of results){
              const type = object.get("aircraftType");
          const registration = object.get("aircraftRegistration");
          const airplaneName = object.get("airplaneName");
          const planeid = object.id;
          const isActive = object.get("isActive");
            formState.airplanesData.push({
              type:type,
            registration:registration,
            airplaneName:airplaneName,
            planeid:planeid,
            isActive:isActive

            })
            // formState.airplanesData.push(arr)


            }
            // formState.airplanesData.push(arr)

          })
            // formState.airplanesData.push(arr)

          // console.log(formState.airplanesData)
          

        }
      }
      // console.log(formState.airplanesData)
      // console.log(JsHelper.filterAircraftTypes1(formState.airplanesData))
      formState.finalData=JsHelper.filterAircraftTypes1(formState.airplanesData)
      formState.loader=false



      // console.log(JsHelper.filterAircraftTypes(formState.data))
    });

    const formState = reactive({
      data: [],
      fliterData:[],
      loader:true,
      airplanesData:[],
      finalData:[]

    });

    return {
      formState
    };
  }
});
</script>
<style scoped>
.move-right {
  float: right;
}
</style>
