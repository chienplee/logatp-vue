<template>
  <CardToolbox>
    <ContactPageheaderStyle>
      <sdPageHeader title="Crews">
        <template #subTitle>
          <a-input
            v-model:value="pageSettings.search"
            placeholder="Search by Name"
            @change="searchCrews"
          >
            <template #suffix>
              <sdFeatherIcons type="search" size="16" />
            </template>
          </a-input>
        </template>
        <template v-slot:buttons>
          <div class="page-header-actions">
            <router-link to="add-crew">
              <sdButton size="small" type="primary">
                <sdFeatherIcons type="plus" size="14" />
                Add Crew
              </sdButton></router-link
            >
          </div>
        </template>
      </sdPageHeader>
    </ContactPageheaderStyle>
  </CardToolbox>
  <a-spin :spinning="pageSettings.loader" class="" size="large">
  <Main>
    <a-row :gutter="25">
      <a-col
        v-for="user in searchCrews"
        :key="user.id"
        :lg="6"
        :md="8"
        :sm="12"
        :xs="24"
      >
        <sdCards headless>
          <CrewCard :user="user" />
        </sdCards>
      </a-col>
    </a-row>

  </Main>

  </a-spin>
</template>
<script>
import { defineComponent, reactive, onMounted, computed } from "vue";
import { Main, CardToolbox } from "../../styled";
import { ContactPageheaderStyle } from "../style";
import CrewCard from "./CrewCard.vue";
import crew from "../../../server/Crew.js";

export default defineComponent({
  components: {
    CrewCard,
    Main,
    CardToolbox,
    ContactPageheaderStyle,
  },
  setup() {
    const pageSettings = reactive({
      loader: true,
      users: [],
      search: "",
      limit:16,
      total:50,
      skip:0,
      temp:[],
      current:1,
      bottom:true,

      
    });

    const searchCrews = computed(() => {
      return pageSettings.users.filter((crew) => {
        return crew.firstName
          .toLowerCase()
          .includes(pageSettings.search.toLowerCase());
      });
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
            await getData();

        }
        if(currentScroll + modifier < documentHeight){
        console.log('else!',pageSettings.bottom)
        pageSettings.bottom=true          
        }

    }
    };
    onMounted(async () => {
      getData();
      getNextRecords();
      pageSettings.total= await crew.getCrewsLength();
      
    });
    const getData=async()=>{
      if(pageSettings.total==pageSettings.users.length){
        return
      }
      try {
        pageSettings.loader=true
        pageSettings.skip = (pageSettings.current - 1) * pageSettings.limit;
        crew.getCrewMembers(pageSettings.limit,pageSettings.skip).then((results) => {
          for (const object of results) {
            const firstName = object.get("firstName");
            const lastName = object.get("lastName");
            const Position = object.get("Position");
            const EmployeeId = object.get("EmployeeId");
            const Nationality = object.get("Nationality");
            const LicenceNumber = object.get("LicenceNumber");
            const crewid = object.id;

            pageSettings.temp.push({
              firstName: firstName,
              lastName: lastName,
              Position: Position,
              EmployeeId: EmployeeId,
              Nationality: Nationality,
              LicenceNumber: LicenceNumber,
              crewId: crewid,
            });
          }
      pageSettings.users.push(...pageSettings.temp);
      pageSettings.temp=[];

          pageSettings.loader=false
          pageSettings.current++;
        });
      } catch (error) {
        console.log(error);
        pageSettings.loader=false

      }
    };
    return {
      pageSettings,
      searchCrews,
      getNextRecords,
      getData
    };
  },
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
