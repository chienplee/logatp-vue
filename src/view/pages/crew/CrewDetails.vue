<template>
  <div>
    <sdPageHeader title="Crew Information">
      <template v-slot:buttons>
        <div class="page-header-actions">
          <router-link :to="{ name: 'editCrew', params: { crewid: formState.id } }">
            <sdButton size="small" type="primary">
              <sdFeatherIcons type="edit" size="14" />Edit Crew
            </sdButton>
          </router-link>
        </div>
      </template>
    </sdPageHeader>
    <Main>
  <a-spin :spinning="formState.loader" class size="large">

      <a-tabs v-model:activeKey="activeKey" type="card">
        <a-tab-pane key="1" tab="Crew Info">
          <a-row :gutter="25">
            <a-col :lg="24" :md="24" :sm="24" :xs="24">
              <sdCards>
                <a-row>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <label>First Name</label>
                  </a-col>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <span>{{ formState.firstName }}</span>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <label>Last Name</label>
                  </a-col>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <span>{{ formState.lastName }}</span>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <label>Position</label>
                  </a-col>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <span>{{ formState.position }}</span>
                  </a-col>
                </a-row>
              </sdCards>
            </a-col>
            <a-col :lg="24" :md="24" :sm="24" :xs="24">
              <sdCards>
                <a-row>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <label>EmployeedId</label>
                  </a-col>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <span>{{ formState.EmployeedId }}</span>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <label>Licence Number</label>
                  </a-col>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <span>{{ formState.LicenceNumber }}</span>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <label>Nationality</label>
                  </a-col>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <span>{{ formState.Nationality }}</span>
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
          <a-row :gutter="25">
            <a-col :lg="24" :md="24" :sm="24" :xs="24">
              <sdCards>
                <flights />
              </sdCards>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="3" tab="Note">
          <a-row :gutter="25">
            <a-col :lg="24" :md="24" :sm="24" :xs="24">
              <sdCards>
                <a-row>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <label>Note</label>
                  </a-col>
                  <a-col :lg="4" :md="6" :sm="12" :xs="12">
                    <span>{{ formState.Note }}</span>
                  </a-col>
                </a-row>
              </sdCards>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
      </a-spin>
    </Main>
  </div>
</template>

<script>
import Counties from "../../../helper/countryData.json";
import { defineComponent, onMounted, reactive, ref } from "vue";
// import Parse from "parse";
import { useRoute } from "vue-router";
import { Main } from "../../styled";
import moment from "moment";
import crew from "../../../server/Crew.js";
import flights from "./flights.vue";

export default defineComponent({
  components: {
    Main,
    flights
  },
  setup() {
    const router = useRoute();
    const countryData = Counties;
    const formState = reactive({
      id: router.params.crewid,
      firstName: "",
      lastName: "",
      position: "",
      EmployeedId: "",
      Nationality: "",
      LicenceNumber: "",
      LOGATPID: "",
      CloudId: "",
      CreatedAt: "",
      UpdatedAt: "",
      Thisisme: false,
      Note: "",
      loader:true
    });

    onMounted(async() => {
      // const dateFrom = moment(Date.now() - 7 * 24 * 3600 * 1000).format(
      //   "YYYY-MM-DD"
      // );
      // const dateTo = moment(Date.now()).format("YYYY-MM-DD");
      // console.log("dateFrom", dateFrom, "dateTo", dateTo);
     await crew.getPointer(formState.id).then(
        obj => {
          const firstName = obj.get("firstName");
          const lastName = obj.get("lastName");
          const Position = obj.get("Position");
          const EmployeedId = obj.get("EmployeeId");
          const LicenceNumber = obj.get("LicenceNumber");
          const Nationality = countryData[obj.get("Nationality")].name;
          const createdAt = obj.get("createdAt");
          const updatedAt = obj.get("updatedAt");
          const logAtpId = obj.get("realmId");
          const CloudID = obj.id;
          // console.log(logAtpId, CloudID);

          formState.CreatedAt = moment(createdAt).format("DD-MMMM-YYYY ");
          formState.UpdatedAt = moment(updatedAt).format("DD-MMMM-YYYY ");
          // console.log("createdAt",createdAt)
          // console.log("updatedAt",updatedAt)
          const Note = obj.get("Note");
          formState.firstName = firstName;
          formState.lastName = lastName;
          formState.position = Position;
          formState.EmployeedId = EmployeedId;
          formState.Note = Note;
          formState.LicenceNumber = LicenceNumber;
          formState.Nationality = Nationality;
          formState.CloudId = CloudID;
          formState.LOGATPID = logAtpId;
          formState.loader=false        },
        error => {
          console.log(error);
        }
      );
    });
    return {
      formState,
      activeKey: ref("1"),
      countryData
    };
  }
});
</script>
