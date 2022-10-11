<template>
  <CardToolbox>
    <ContactPageheaderStyle>
      <sdPageHeader title="Currency">
        <template #subTitle></template>
      </sdPageHeader>
    </ContactPageheaderStyle>
  </CardToolbox>
  <Main>
    <a-spin :spinning="formState.loader" class size="large">
      <a-row :gutter="25">
        <a-col :xs="24">
          <sdCards title="LAST 3 TAKEOFFS" caption>
            <a-row :gutter="30">
              <a-col :xs="24" :md="12" :lg="8">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-square-caret-up" />
                  {{
                  formState.recentTakeoofs[0]
                  ? formState.recentTakeoofs[0].dep
                  : "No Data"
                  }}
                </span>

                <span class="move-right">
                  {{
                  formState.recentTakeoofs[0]
                  ? formState.recentTakeoofs[0].date
                  : "No Data"
                  }}
                </span>
                <a-divider />
              </a-col>
              <a-col :xs="24" :md="12" :lg="8">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-square-caret-up" />
                  {{
                  formState.recentTakeoofs[1]
                  ? formState.recentTakeoofs[1].dep
                  : "No Data"
                  }}
                </span>

                <span class="move-right">
                  {{
                  formState.recentTakeoofs[1]
                  ? formState.recentTakeoofs[1].date
                  : "No Data"
                  }}
                </span>
                <a-divider />
              </a-col>
              <a-col :xs="24" :md="12" :lg="8">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-square-caret-up" />
                  {{
                  formState.recentTakeoofs[2]
                  ? formState.recentTakeoofs[2].dep
                  : "No Data"
                  }}
                </span>
                <span class="move-right">
                  {{
                  formState.recentTakeoofs[2]
                  ? formState.recentTakeoofs[2].date
                  : "No Data"
                  }}
                </span>
                <a-divider />
              </a-col>
              <a-col :xs="24" :md="12" :lg="8">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-square-caret-up" />Takeoff Expiry Date
                </span>
                <span class="move-right">{{ formState.takeoffExpiry }}</span>
                <a-divider />
              </a-col>
            </a-row>
          </sdCards>
        </a-col>

        <a-col :xs="24">
          <sdCards title="LAST 3 LANDINGS" caption>
            <a-row :gutter="30">
              <a-col :xs="24" :md="12" :lg="8">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-square-caret-down" />
                  {{
                  formState.recentLandings[0]
                  ? formState.recentLandings[0].des
                  : "No Data"
                  }}
                </span>
                
                <span
                  class="move-right"
                >
              
                {{
                  formState.recentLandings[0]
                  ? formState.recentLandings[0].date
                  : "No Data"
                  }}
              </span>
                <a-divider />
              </a-col>
              <a-col :xs="24" :md="12" :lg="8">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-square-caret-down" />
                  {{
                  formState.recentLandings[1]
                  ? formState.recentLandings[0].des
                  : "No Data"
                  }}
                </span>
                <span class="move-right">
                  {{
                  formState.recentLandings[1]
                  ? formState.recentLandings[1].date
                  : "No Data"
                  }}
                </span>
                <a-divider />
              </a-col>
              <a-col :xs="24" :md="12" :lg="8">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-square-caret-down" />
                  {{
                  formState.recentLandings[2]
                  ? formState.recentLandings[2].des
                  : "No Data"
                  }}
                </span>
                <span class="move-right">
                  {{
                  formState.recentLandings[2]
                  ? formState.recentLandings[2].date
                  : "No Data"
                  }}
                </span>
                <a-divider />
              </a-col>
              <a-col :xs="24" :md="12" :lg="8">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-square-caret-down" />Landing Expiry Date
                </span>
                <span class="move-right">{{formState.takeoffExpiry}}</span>
                <a-divider />
              </a-col>
            </a-row>
          </sdCards>
        </a-col>
        <a-col :xs="24">
          <sdCards title="RECENT TAKEOFFS" caption>
            <a-row :gutter="30">
              <a-col :xs="24" :md="12" :lg="8">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-square-caret-up" />
                  {{ formState.m1name }}
                </span>
                <span class="move-right">{{ formState.m1T }}</span>
                <a-divider />
              </a-col>
              <a-col :xs="24" :md="12" :lg="8">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-square-caret-up" />
                  {{ formState.m2name }}
                </span>
                <span class="move-right">{{ formState.m2T }}</span>
                <a-divider />
              </a-col>
              <a-col :xs="24" :md="12" :lg="8">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-square-caret-up" />
                  {{ formState.m3name }}
                </span>
                <span class="move-right">{{ formState.m3T }}</span>
                <a-divider />
              </a-col>
            </a-row>
          </sdCards>
        </a-col>
        <a-col :xs="24">
          <sdCards title="RECENT LANDINGS" caption>
            <a-row :gutter="30">
              <a-col :xs="24" :md="12" :lg="8">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-square-caret-down" />
                  {{ formState.m1name }}
                </span>
                <span class="move-right">{{ formState.m1L }}</span>
                <a-divider />
              </a-col>
              <a-col :xs="24" :md="12" :lg="8">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-square-caret-down" />
                  {{ formState.m2name }}
                </span>
                <span class="move-right">{{ formState.m2L }}</span>
                <a-divider />
              </a-col>
              <a-col :xs="24" :md="12" :lg="8">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-square-caret-down" />
                  {{ formState.m3name }}
                </span>
                <span class="move-right">{{ formState.m3L }}</span>
                <a-divider />
              </a-col>
            </a-row>
          </sdCards>
        </a-col>
      </a-row>
    </a-spin>
  </Main>
</template>
<script>
import { defineComponent, onMounted, reactive } from "vue";
import { Main, CardToolbox } from "../styled";
import flight from "../../server/Flight";
import moment from "moment";
moment.suppressDeprecationWarnings = true;
import { ContactPageheaderStyle } from "./style";

export default defineComponent({
  components: {
    Main,
    CardToolbox,
    ContactPageheaderStyle
  },
  setup() {
    onMounted(async () => {

      await flight.getRecentTakeoffsLandings().then(results => {
        formState.m1name = results.m1name;
        formState.m2name = results.m2name;
        formState.m3name = results.m3name;
        formState.m1T = results.m1T;
        formState.m2T = results.m2T;
        formState.m3T = results.m3T;
        formState.m1L = results.m1L;
        formState.m2L = results.m2L;
        formState.m3L = results.m3L;
        formState.recentTakeoofs = results.recentTakeoffs;
        formState.recentLandings = results.recentLandings;
        if (results.dates.length > 0) {
          var takeoffExpirydaye = results.dates[results.dates.length - 1];
          formState.takeoffExpiry = moment(takeoffExpirydaye)
            .add({ days: 90 })
            .format("MMMM Do YYYY");
          // console.log("ff", moment(takeoffExpirydaye).add({ days: 90 }));
        }
        formState.loader = false;
        // console.log("res", results);
      });
    });

    const formState = reactive({
      m1name: "",
      m2name: "",
      m3name: "",
      m1T: 0,
      m2T: 0,
      m3T: 0,
      m1L: 0,
      m2L: 0,
      m3L: 0,
      recentTakeoofs: [],
      recentLandings: [],
      takeoffExpiry: "No Data",
      landingExpiry: "",
      loader: true
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
