<template>
  <Main>
    <sdPageHeader title="Summary">
      <template v-slot:buttons>
        <div class="page-header-actions">
          <datepicker
            DatePickerFormat="YYYY"
            v-model="summaryData.year"
            minimum-view="year"
            @changedYear="yearSelected()"
          ></datepicker>
        </div>
      </template>
    </sdPageHeader>

    <p>{{summaryData.year}}</p>

    <a-row :gutter="25">
      <a-col :xs="24">
        <sdCards title caption>
          <a-row :gutter="30">
            <a-col :xs="24" :md="12" :lg="8">
              <span>
                <font-awesome-icon class="icon" icon="fa-solid fa-hard-drive" />Total Hours
              </span>
              <span class="move-right">{{ summaryData.Hours }}</span>
              <a-divider />
            </a-col>
            <a-col :xs="24" :md="12" :lg="8">
              <span>
                <font-awesome-icon class="icon" icon="fa-solid fa-user" />PIC Hours
              </span>
              <span class="move-right">{{ summaryData.picHours }}</span>
              <a-divider />
            </a-col>
            <a-col :xs="24" :md="12" :lg="8">
              <span>
                <font-awesome-icon class="icon" icon="fa-solid fa-briefcase" />Flights
              </span>
              <span class="move-right">{{ summaryData.flights }}</span>
              <a-divider />
            </a-col>
            <a-col :xs="24" :md="12" :lg="8">
              <span>
                <font-awesome-icon class="icon" icon="fa-solid fa-thumbtack" />Airports
              </span>
              <span class="move-right">{{ summaryData.airports }}</span>
              <a-divider />
            </a-col>

            <a-col :xs="24" :md="12" :lg="8">
              <span>
                <font-awesome-icon class="icon" icon="fa-solid fa-plane" />Aircraft
              </span>
              <span class="move-right">{{ summaryData.aircradts }}</span>
              <a-divider />
            </a-col>
            <a-col :xs="24" :md="12" :lg="8">
              <span>
                <font-awesome-icon class="icon" icon="fa-solid fa-square-caret-up" />Takeoffs
              </span>
              <span class="move-right">{{ summaryData.takeoffs }}</span>
              <a-divider />
            </a-col>
            <a-col :xs="24" :md="12" :lg="8">
              <span>
                <font-awesome-icon class="icon" icon="fa-solid fa-square-caret-down" />Landings
              </span>
              <span class="move-right">{{ summaryData.landings }}</span>
              <a-divider />
            </a-col>
            <a-col :xs="24" :md="12" :lg="8">
              <span>
                <font-awesome-icon class="icon" icon="fa-solid fa-rotate-left" />Go Arounds
              </span>
              <span class="move-right">{{ summaryData.goArounds }}</span>
              <a-divider />
            </a-col>
            <a-col :xs="24" :md="12" :lg="8">
              <span>
                <font-awesome-icon icon="fa-solid fa-arrows-split-up-and-left" />
              </span>
              Divisions
              <span class="move-right">{{ summaryData.diversions }}</span>
              <a-divider />
            </a-col>
            <a-col :xs="24" :md="12" :lg="8">
              <span>
                <font-awesome-icon class="icon" icon="fa-solid fa-circle-down" />AutoLandings
              </span>
              <span class="move-right">{{ summaryData.autolands }}</span>
              <a-divider />
            </a-col>
          </a-row>
        </sdCards>
      </a-col>
    </a-row>

    <a-row :xs="24">
      <sdCards title="TOTALS " caption>
        <a-row :gutter="30">
          <a-col :xs="24" :md="12" :lg="8">
            <span>
              <font-awesome-icon class="icon" icon="fa-solid fa-users" />Total Passangers
            </span>
            <span class="move-right">{{ summaryData.totalPassangers }}</span>
            <a-divider />
          </a-col>
          <a-col :xs="24" :md="12" :lg="8">
            <span>
              <font-awesome-icon class="icon" icon="fa-solid fa-weight-scale" />Total Payload
            </span>
            <span class="move-right">{{ summaryData.totalpayload }}</span>
            <a-divider />
          </a-col>
          <a-col :xs="24" :md="12" :lg="8">
            <span>
              <font-awesome-icon icon="fa-solid fa-arrows-up-down" />Total
              Flight Plan Distance
            </span>
            <span class="move-right">
              {{
              summaryData.totapFlightPlanDistance
              }}
            </span>
            <a-divider />
          </a-col>
        </a-row>
      </sdCards>
    </a-row>
    <a-row :xs="24">
      <sdCards title="APPROCHES " caption>
        <a-row :gutter="30">
          <a-col :xs="24" :md="12" :lg="8">
            <span>ILS</span>
            <span class="move-right">{{ summaryData.aprchTypes.ILS }}</span>
            <a-divider />
          </a-col>
          <a-col :xs="24" :md="12" :lg="8">
            <span>RNP</span>
            <span class="move-right">{{ summaryData.aprchTypes.RNP }}</span>
            <a-divider />
          </a-col>
          <a-col :xs="24" :md="12" :lg="8">
            <span>LOC</span>
            <span class="move-right">{{ summaryData.aprchTypes.LOC }}</span>
            <a-divider />
          </a-col>
          <a-col :xs="24" :md="12" :lg="8">
            <span>LDA</span>
            <span class="move-right">{{ summaryData.aprchTypes.LDA }}</span>
            <a-divider />
          </a-col>
          <a-col :xs="24" :md="12" :lg="8">
            <span>VOR</span>
            <span class="move-right">{{ summaryData.aprchTypes.VOR }}</span>
            <a-divider />
          </a-col>
          <a-col :xs="24" :md="12" :lg="8">
            <span>NDB</span>
            <span class="move-right">{{ summaryData.aprchTypes.NDB }}</span>
            <a-divider />
          </a-col>

          <a-col :xs="24" :md="12" :lg="8">
            <span>PAR</span>
            <span class="move-right">{{ summaryData.aprchTypes.PAR }}</span>
            <a-divider />
          </a-col>
          <a-col :xs="24" :md="12" :lg="8">
            <span>Visual</span>
            <span class="move-right">{{ summaryData.visual }}</span>
            <a-divider />
          </a-col>
          <a-col :xs="24" :md="12" :lg="8">
            <span>Contact</span>
            <span class="move-right">
              {{
              summaryData.aprchTypes.Contact
              }}
            </span>
            <a-divider />
          </a-col>
          <a-col :xs="24" :md="12" :lg="8">
            <span>Circling</span>
            <span class="move-right">
              {{
              summaryData.aprchTypes.Circling
              }}
            </span>
            <a-divider />
          </a-col>
        </a-row>
      </sdCards>
    </a-row>
  </Main>
</template>
<script>
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
import moment from "moment";
import Summary from "../server/summary.js";
import JsHelper from "../helper/JsHelper";
import Datepicker from "vuejs3-datepicker";

import { Main } from "./styled";

export default defineComponent({
  components: {
    Main,
    Datepicker
  },
  setup() {
    onMounted(() => {
      getSummaryData();
    });

    const summaryData = reactive({
      selectedYear: 2022,
      aprchTypes: [],
      year: new Date(),
      Hours: 0,
      picHours: 0,
      flights: 0,
      airports: 0,
      aircradts: 0,
      takeoffs: 0,
      landings: 0,
      goArounds: 0,
      diversions: 0,
      autolands: 0,
      totalPassangers: 0,
      totalpayload: 0,
      totapFlightPlanDistance: 0,
      num: 0
    });
    const yearRange = ref(new Date());
    watch(summaryData.year, (currentValue, oldValue) => {
      console.log(currentValue);
      console.log(oldValue);
      summaryData.year = currentValue;
      getSummaryData();
    });
    const yearSelected = () => {
      console.log("sDy", summaryData.year);
      var y=summaryData.year
      console.log("changed",y)

      getSummaryData(y);
      // console.log("sDy-271", summaryData.year);
    };

    const getSummaryData = (y) => {
      y=summaryData.year
      console.log("y",y)

      console.log("yesr 275", y);
      console.log(moment(summaryData.year).format("yyyy"));
      Summary.getSummary(moment(summaryData.year).format("yyyy")).then(
        results => {
          summaryData.Hours = JsHelper.mintoHourswithMin(results.Hours);
          summaryData.flights = results.flights;
          summaryData.aircradts = JsHelper.fliterUniqvalue(
            results.aircrafts
          ).length;
          summaryData.airports = JsHelper.fliterUniqvalue(
            results.airports
          ).length;
          summaryData.landings = results.landings;
          summaryData.takeoffs = results.takeoffs;
          summaryData.picHours = JsHelper.mintoHourswithMin(results.picHours);
          summaryData.goArounds = results.goArounds;
          summaryData.diversions = results.diversions;
          summaryData.autolands = results.autolands;
          summaryData.totalPassangers = results.totalPassangers;
          summaryData.totalpayload = results.totalpayload;
          summaryData.totapFlightPlanDistance = results.totapFlightPlanDistance;
          summaryData.aprchTypes = JsHelper.frequencyofApproachType(
            results.approachTypes
          );

          console.log(results);
        }
      );
    };

    return {
      summaryData,
      yearRange,
      yearSelected,
      getSummaryData
    };
  }
});
</script>
<style scoped>
.move-right {
  float: right;
}
div >>> .ant-page-header-heading-extra {
  white-space: unset !important;
}
div >>> .vuejs3-datepicker__calendar {
  width: auto !important;
}
div >>> .vuejs3-datepicker__value {
  border-radius: unset !important;
  padding: 10px 15px !important;
  cursor: pointer !important;
  border: none !important;
}
</style>
