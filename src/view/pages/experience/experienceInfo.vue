<template>
    <div>
      <sdPageHeader title="Experience Information">
        <template v-slot:buttons>
          <div class="page-header-actions">
            <sdButton size="small" type="primary" @click="deleteExp()">
              <sdFeatherIcons type="delete" size="14" />Delete Experience
            </sdButton>
            <router-link :to="{ name: 'editExperience', params: { expid: formState.expid } }">
              <sdButton size="small" type="primary">
                <sdFeatherIcons type="edit" size="14" />Edit Experience
              </sdButton>
            </router-link>
          </div>
        </template>
      </sdPageHeader>
      <Main>
    <a-spin :spinning="formState.loader" class size="large">
        <a-row :gutter="25">
            <a-col :xs="24">
              <sdCards title="GENERAL" caption>
                <a-row :gutter="30">
                  <a-col :xs="24" :md="12" :lg="8">
                    <span>
                     Experience Title
                    </span>
                    <span class="move-right">{{ formState.name }}</span>
                    <a-divider />
                  </a-col>
                  <a-col :xs="24" :md="12" :lg="8">
                    <span>
                     Begin Date
                    </span>
                    <span class="move-right">{{ formState.startDate }}</span>
                    <a-divider />
                  </a-col>
                  <a-col :xs="24" :md="12" :lg="8">
                    <span>
                    End Date
                    </span>
                    <span class="move-right">{{ formState.endDate }}</span>
                    <a-divider />
                  </a-col>
                  
                </a-row>
              </sdCards>
            </a-col>
          </a-row>
          <a-row :gutter="25">
            <a-col :xs="24">
              <sdCards title="HOURS CARRIED FORWARD" caption>
                <a-row :gutter="30">
                  <a-col :xs="24" :md="12" :lg="8">
                    <span>
                     Total Hours
                    </span>
                    <span class="move-right">{{ formState.totalHours }}</span>
                    <a-divider />
                  </a-col>
             
                  
                </a-row>
              </sdCards>
            </a-col>
          </a-row>
          <a-row :gutter="25">
            <a-col :xs="24">
              <sdCards title="NOTE" caption>
                <a-row :gutter="30">
                  <a-col :xs="24" :md="12" :lg="8">
                    <span>
        Note
                    </span>
                    <span class="move-right">{{ formState.note }}</span>
                    <a-divider />
                  </a-col>
             
                  
                </a-row>
              </sdCards>
            </a-col>
          </a-row>
       
        </a-spin>
      </Main>
    </div>
  </template>
  
  <script>
  import { defineComponent, onMounted, reactive, ref } from "vue";
  // import Parse from "parse";
  import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

  import { Main } from "../../styled";
  import experience from "../../../server/experience";
//   import Parse from "parse";
  import JsHelper from "../../../helper/JsHelper";
  export default defineComponent({
    components: {
      Main,
      
    },
    setup() {
      const router = useRoute();
    const router1 = useRouter();

  
      const formState = reactive({
        expid: router.params.expid,
        flightsData:[],
        loader:true
      });
      const deleteExp = async()=>{
        // console.log("delete")
        await experience.deleteObj(formState.expid).then(()=>{
        router1.push("/experiences");

        })
        
      }
  
      onMounted(async () => {
        // console.log("hello");
       await experience.getPointer(formState.expid).then(async object =>{
            // console.log(object)
            formState.name = object.get("name");
        formState.startDate = object.get("startDate");
        formState.endDate = object.get("endDate");
        formState.note = object.get("note");
        // formState.totalMinutes=object.get('totalMinutes')
        formState.totalHours=JsHelper.mintoHourswithMin(object.get('totalMinutes'))


        })
        formState.loader=false
 
  
      });
      
 
      return {
        formState,
        activeKey: ref("1"),
        deleteExp
        
        
        
      };
    }
  });
  </script>
  <style scoped>
    .move-right {
        float: right;
      }
  </style>
  