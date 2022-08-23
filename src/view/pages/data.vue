<template>
   <Main>
    <sdCards title="">
      <a-tabs :tab-position="tabPosition" v-model:activeKey="activeKey1">
        <a-tab-pane key="1" type="card">
          <template #tab>
            <span>
              <font-awesome-icon
                    class="icon"
                    icon="fa-solid fa-clock"
                  />Hours
            </span>
          </template>
          <BasicLine />
          <br />
          <BasicLine />

        
        </a-tab-pane>
        <a-tab-pane key="2" type="card">
          <template #tab>
            <span>
              <font-awesome-icon class="icon" icon="fa-solid fa-plane" />
              Airplanes
            </span>
          </template>
          h
        </a-tab-pane>
          <a-tab-pane key="3" type="card">
          <template #tab>
            <span>
              <font-awesome-icon class="icon" icon="fa-solid fa-cart-flatbed-suitcase" />
              Airports
            </span>
          </template>
          h
        </a-tab-pane>
          <a-tab-pane key="4" type="card">
          <template #tab>
            <span>
              <font-awesome-icon class="icon" icon="fa-solid fa-cloud-sun" />
              Day and Night Time
            </span>
          </template>
          h
        </a-tab-pane>
          <a-tab-pane key="5" type="card">
          <template #tab>
            <span>
              <font-awesome-icon class="icon" icon="fa-solid fa-location-arrow" />
              Last Visits
            </span>
          </template>
          h
        </a-tab-pane>
          <a-tab-pane key="6" type="card">
          <template #tab>
            <span>
              <font-awesome-icon class="icon" icon="fa-solid fa-rotate-left" />
              Go Arounds
            </span>
          </template>
          <Sdcards>
          <a-row>
          <a-col :xs="24" :md="12" :lg="8">
                <span>
                  
                  Go Arounds
                </span>
                <span class="move-right">{{ 0 }}</span>
                <a-divider />
              </a-col>
              </a-row>
          </Sdcards>
        </a-tab-pane>
          <a-tab-pane key="7" type="card">
          <template #tab>
            <span>
              <font-awesome-icon class="icon" icon="fa-solid fa-arrows-split-up-and-left" />
              Diversions
            </span>
          </template>
          <Sdcards>
          <a-row>
          <a-col :xs="24" :md="12" :lg="8">
                <span>
                  Diversions
                  
                </span>
                <span class="move-right">{{ 0 }}</span>
                <a-divider />
              </a-col>
              </a-row>
          </Sdcards>
        </a-tab-pane>
          <a-tab-pane key="8" type="card">
          <template #tab>
            <span>
              <font-awesome-icon class="icon" icon="fa-solid fa-circle-down" />
              AutoLands
            </span>
          </template>
          <Sdcards>
          <a-row>
          <a-col :xs="24" :md="12" :lg="8">
                <span>
                  
                  AutoLands
                </span>
                <span class="move-right">{{ 0 }}</span>
                <a-divider />
              </a-col>
              </a-row>
          </Sdcards>
        </a-tab-pane>
      </a-tabs>
    </sdCards>

    <sdCards>
          <a-tabs :tab-position="tabPosition" v-model:activeKey="activeKey2">
        <a-tab-pane key="1" type="card">
          <template #tab>
            <span>
              <font-awesome-icon
                    class="icon"
                    icon="fa-solid fa-clock"
                  />Block Times
            </span>
          </template>
        
        </a-tab-pane>
         <a-tab-pane key="2" type="card">
          <template #tab>
            <span>
              <font-awesome-icon
                    class="icon"
                    icon="fa-solid fa-clock"
                  />Flight Times
            </span>
          </template>
        
        </a-tab-pane>
        </a-tabs>

    </sdCards>
   </Main>
</template>
<script>
import { defineComponent ,ref,onMounted,reactive} from 'vue'
import { Main } from "../styled";
import BasicLine from "../../components/apexcharts/line-chart/BasicLine.vue"
export default defineComponent({
    components:{
        Main,
        BasicLine

    },
    setup() {
   onMounted(()=>{

     
   })

   const dataState = reactive({
    goArounds:0,
    diversions:0,
    landings:0
   })

   const tabPosition = ref('left');
    return {
      activeKey1: ref("1"),
      activeKey2: ref("1"),
      tabPosition,
      dataState
    };
        
    },
})
</script>
<style scoped>
.move-right {
  float: right;
}
</style>
