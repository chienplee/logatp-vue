<template>
    <div>
      <CardToolbox>
        <ContactPageheaderStyle>
          <sdPageHeader title="Experiences">
            <template #subTitle></template>
            <template v-slot:buttons>
              <div class="page-header-actions">
                <router-link to="add-experiece">
                  <sdButton size="small" type="primary">
                    <sdFeatherIcons type="plus" size="14" />
                    Add Experience
                  </sdButton></router-link
                >
              </div>
            </template>
          </sdPageHeader>
        </ContactPageheaderStyle>
      </CardToolbox>
      <Main>
    <a-spin :spinning="formState.loader" class size="large">
        
    <a-row :gutter="25">





          <a-col
          v-for="experience in formState.data"
          :key="experience.id"
          :lg="6"
          :md="8"
          :sm="12"
          :xs="24"
        >
          <sdCards headless>
            
            <ContactCardWrapper >
                <router-link :to="{ name: 'experienceInfo', params: { expid: experience.id } }">
                  <div class="contact-card">
                    <figure>
                      <!-- <font-awesome-icon class="fa-5x" icon="fas fa-user-friends" /> -->
                      <font-awesome-icon class="fa-5x"  icon="fa-solid fa-location-arrow" />
                      <figcaption>
                        <h3> {{experience. name }} {{  }}</h3>
                        <span>{{ experience.startDate }}->{{ experience.endDate }}</span>
                      </figcaption>
                    </figure>
                    <!-- <div class="user-info">
                      <ul>
                        <li>
                          
                        <font-awesome-icon icon="fa-solid fa-id-badge" />
            
                          {{ experience. name }}
                        </li>
                        <li>
                        <font-awesome-icon icon="fa-solid fa-id-card" />
                          {{ experience. name }}
            
                        </li>
                        <li>
                          <sdFeatherIcons type="map-pin" size="16" />
            
                          
                          
            
                          {{ experience. name }}
            
                        </li>
                      </ul>
                    </div> -->
                  </div>
                </router-link>
              </ContactCardWrapper>
            
          </sdCards>
        </a-col>
      </a-row>
        </a-spin>

  
      </Main>
    </div>
  </template>
  
  <script>
  import { Main } from "../styled";
  import { defineComponent, onMounted, reactive } from "vue";
import experience from "../../server/experience"
 
  // import JsHelper from "../../helper/JsHelper";
  import { ContactCardWrapper } from "./style";

  export default defineComponent({
    name: "airplanes",
    components: {
      Main,
      ContactCardWrapper 
      
    },
    setup() {
      onMounted(async() => {
       await experience.getExperiences().then(res=>{
            // console.log(res)
            for (const object of res) {
          // console.log(object);
          const name = object.get("name");
          const startDate = object.get("startDate");
          const endDate = object.get("endDate");
          const id = object.id;
          // console.log(id)
          // const totalMinutes = object.get("totalMinutes");
          // const totalHours = object.get("totalHours");
          formState.data.push({
            name:name,
            startDate:startDate,
            endDate:endDate,
            id:id,
            // totalHours:totalHours,
            // totalMinutes:totalMinutes
            
          });
        }
        formState.loader=false

        })

        // console.log("onMounted");
   
      });
  
      const formState = reactive({
        data: [],
        fliterData:[],
        loader:true
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
  