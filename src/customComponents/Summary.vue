<template>
  <Main>
    <a-spin :spinning="summaryData.loader" class size="large">
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
      <a-row :xs="24" >
        <sdCards title="AIRPORTS " caption> 
          <a-row :gutter="30" >
            <a-col 
              :xs="24"
              :md="12"
              :lg="8"
              v-for="[key] in Object.entries(summaryData.countAirports)"
              :key="key"
            >
              <span >
                <img
                  :src="summaryData.countAirports[key]['image']"
                  style="width: 10%; height: 30px"
                />
                {{key}}
              </span>
              <span class="move-right">{{summaryData.countAirports[key]["count"] }}</span>
              <a-divider />
            </a-col>
          </a-row>
        </sdCards>
      </a-row>
    </a-spin>
  </Main>
</template>
<script>
import JsHelper from "../helper/JsHelper";
import Parse from "parse";

import { defineComponent, onMounted, reactive, ref,  } from "vue";
import moment from "moment";
import Summary from "../server/summary.js";
import countries from "../helper/countryData.json";
import Datepicker from "vuejs3-datepicker";
import { Main } from "./styled";

export default defineComponent({
  components: {
    Main,
    Datepicker
  },
  setup() {
    onMounted(async () => {
      await getSummaryData();
      summaryData.loader=false
      
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
      num: 0,
      loader: true,
      countAirports: {},
      uniqAirportNames: [],
      data:false,

    });
    const yearRange = ref(new Date());
   
    const yearSelected = () => {
      // console.log("u",summaryData.uniqAirportNames)
      // console.log("c",summaryData.countAirports)

      // console.log("sDy", summaryData.year);
      var y = summaryData.year;
      // console.log("changed", y);

      getSummaryData(y);
      // console.log("sDy-271", summaryData.year);
    };

    const getSummaryData = async y => {
      summaryData.loader = true;
      summaryData.data = false;
      y = summaryData.year;
      console.log("y", y);

      // console.log("yesr 275", y);
      // console.log(moment(summaryData.year).format("yyyy"));
      await Summary.getSummary(moment(summaryData.year).format("yyyy")).then(
        results => {
                    // console.log("results",results);
                    summaryData.uniqAirportNames=[];
                     if(results.airportNames.length==0){
                        summaryData.countAirports = JsHelper.getItems1(summaryData.uniqAirportNames);
                        summaryData.data=true;

                      }
                    else{
                          for (var arr of results.airportNames) {
                                      // console.log("295",arr);
                                      if (arr) {
                                          const query = new Parse.Query("Airport");
                                          query.get(arr[0].id).then((obj)=>{
                                          query.get(arr[1].id).then((obj1)=>{
                                          summaryData.uniqAirportNames.push(
                                          {
                                            city: obj.get("city"),
                                            countryCode: countries[obj.get("countryCode")].image
                                          },

                                          {
                                            countryCode: countries[obj1.get("countryCode")].image,
                                            city: obj1.get("city")
                                          }

                                        );
                                          summaryData.countAirports = JsHelper.getItems1(summaryData.uniqAirportNames);
                                          if(summaryData.countAirports){
                                          summaryData.data=true;
                                          }

                                      });
                                      });
                                      }
                                      else{
                                        console.log("");
                                      }
                                    }
                        }
          
        
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

                // console.log(results);
              }
            );
            summaryData.loader =false;

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
