<template>
  <CardToolbox>
    <ContactPageheaderStyle>
      <sdPageHeader title="Carrer">
        <template #subTitle></template>
      </sdPageHeader>
    </ContactPageheaderStyle>
  </CardToolbox>

  <Main>
    <a-spin :spinning="careerData.loader" class size="large">
      <a-row :gutter="25">
        <a-col :xs="24">
          <sdCards title caption>
            <a-row :gutter="30">
              <a-col :xs="24" :md="12" :lg="8">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-hard-drive" />Total Hours
                </span>
                <span class="move-right">{{ careerData.Hours }}</span>
                <a-divider />
              </a-col>
              <a-col :xs="24" :md="12" :lg="8">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-user" />PIC Hours
                </span>
                <span class="move-right">{{ careerData.picHours }}</span>
                <a-divider />
              </a-col>
              <a-col :xs="24" :md="12" :lg="8">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-briefcase" />Flights
                </span>
                <span class="move-right">{{ careerData.flights }}</span>
                <a-divider />
              </a-col>
              <a-col :xs="24" :md="12" :lg="8">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-thumbtack" />Airports
                </span>
                <span class="move-right">{{ careerData.airports }}</span>
                <a-divider />
              </a-col>

              <a-col :xs="24" :md="12" :lg="8">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-plane" />Aircraft
                </span>
                <span class="move-right">{{ careerData.aircradts }}</span>
                <a-divider />
              </a-col>
              <a-col :xs="24" :md="12" :lg="8">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-square-caret-up" />Takeoffs
                </span>
                <span class="move-right">{{ careerData.takeoffs }}</span>
                <a-divider />
              </a-col>
              <a-col :xs="24" :md="12" :lg="8">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-square-caret-down" />Landings
                </span>
                <span class="move-right">{{ careerData.landings }}</span>
                <a-divider />
              </a-col>
              <a-col :xs="24" :md="12" :lg="8">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-rotate-left" />Go Arounds
                </span>
                <span class="move-right">{{ careerData.goArounds }}</span>
                <a-divider />
              </a-col>
              <a-col :xs="24" :md="12" :lg="8">
                <span>
                  <font-awesome-icon icon="fa-solid fa-arrows-split-up-and-left" />
                </span>
                Divisions
                <span class="move-right">{{ careerData.diversions }}</span>
                <a-divider />
              </a-col>
              <a-col :xs="24" :md="12" :lg="8">
                <span>
                  <font-awesome-icon class="icon" icon="fa-solid fa-circle-down" />AutoLandings
                </span>
                <span class="move-right">{{ careerData.autolands }}</span>
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
              <span class="move-right">{{ careerData.totalPassangers }}</span>
              <a-divider />
            </a-col>
            <a-col :xs="24" :md="12" :lg="8">
              <span>
                <font-awesome-icon class="icon" icon="fa-solid fa-weight-scale" />Total Payload
              </span>
              <span class="move-right">{{ careerData.totalpayload }}</span>
              <a-divider />
            </a-col>
            <a-col :xs="24" :md="12" :lg="8">
              <span>
                <font-awesome-icon icon="fa-solid fa-arrows-up-down" />Total
                Flight Plan Distance
              </span>
              <span class="move-right">
                {{
                careerData.totapFlightPlanDistance
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
              <span class="move-right">{{ careerData.aprchTypes.ILS }}</span>
              <a-divider />
            </a-col>
            <a-col :xs="24" :md="12" :lg="8">
              <span>RNP</span>
              <span class="move-right">{{ careerData.aprchTypes.RNP }}</span>
              <a-divider />
            </a-col>
            <a-col :xs="24" :md="12" :lg="8">
              <span>LOC</span>
              <span class="move-right">{{ careerData.aprchTypes.LOC }}</span>
              <a-divider />
            </a-col>
            <a-col :xs="24" :md="12" :lg="8">
              <span>LDA</span>
              <span class="move-right">{{ careerData.aprchTypes.LDA }}</span>
              <a-divider />
            </a-col>
            <a-col :xs="24" :md="12" :lg="8">
              <span>VOR</span>
              <span class="move-right">{{ careerData.aprchTypes.VOR }}</span>
              <a-divider />
            </a-col>
            <a-col :xs="24" :md="12" :lg="8">
              <span>NDB</span>
              <span class="move-right">{{ careerData.aprchTypes.NDB }}</span>
              <a-divider />
            </a-col>

            <a-col :xs="24" :md="12" :lg="8">
              <span>PAR</span>
              <span class="move-right">{{ careerData.aprchTypes.PAR }}</span>
              <a-divider />
            </a-col>
            <a-col :xs="24" :md="12" :lg="8">
              <span>Visual</span>
              <span class="move-right">{{ careerData.visual }}</span>
              <a-divider />
            </a-col>
            <a-col :xs="24" :md="12" :lg="8">
              <span>Contact</span>
              <span class="move-right">
                {{
                careerData.aprchTypes.Contact
                }}
              </span>
              <a-divider />
            </a-col>
            <a-col :xs="24" :md="12" :lg="8">
              <span>Circling</span>
              <span class="move-right">
                {{
                careerData.aprchTypes.Circling
                }}
              </span>
              <a-divider />
            </a-col>
          </a-row>
        </sdCards>
      </a-row>

      <a-row :xs="24">
        <sdCards title="AIRPORTS " caption>
          <a-row :gutter="30">
            <a-col
              :xs="24"
              :md="12"
              :lg="8"
              v-for="[key] in Object.entries(careerData.countAirports)"
              :key="key"
            >
              <span>
                <img
                  class="image"
                  :src="careerData.countAirports[key]['image']"
                  style="width: 10%; height: 30px"
                />
                {{key}}
              </span>
              <span class="move-right">{{careerData.countAirports[key]["count"] }}</span>

              <a-divider />
            </a-col>
          </a-row>
        </sdCards>
      </a-row>
    </a-spin>
  </Main>
</template>
<script>
import { defineComponent, onMounted, reactive } from "vue";
import Flight from "../../server/Flight";
import JsHelper from "../../helper/JsHelper.js";
import countries from "../../helper/countryData.json";
import { ContactPageheaderStyle } from "./style";
import { Main ,CardToolbox} from "../styled";

export default defineComponent({
  components: {
    Main,
    ContactPageheaderStyle,
    CardToolbox
  },
  setup() {
    onMounted(async () => {
      await Flight.getCareerData().then(results => {
        Flight.getFlightsForMap().then(res => {
          // console.log(res.airpots)
          for (var arr of res.airpots) {
            if (arr[0]) {
              // console.log(arr[0].get("city"));
              careerData.airplaneNames.push(
                {
                  city: arr[0].get("city"),
                  countryCode: countries[arr[0].get("countryCode")].image
                },

                {
                  countryCode: countries[arr[1].get("countryCode")].image,
                  city: arr[1].get("city")
                }
              );
            }
          }
          careerData.countAirports = JsHelper.getItems(
            careerData.airplaneNames
          );
        });
        careerData.Hours = JsHelper.mintoHourswithMin(results.Hours);
        careerData.flights = results.flights;
        careerData.aircradts = JsHelper.fliterUniqvalue(
          results.aircrafts
        ).length;
        // console.log(results.airports);
        careerData.airports = JsHelper.fliterUniqvalue(results.airports).length;

        careerData.landings = results.landings;
        careerData.takeoffs = results.takeoffs;
        careerData.picHours = JsHelper.mintoHourswithMin(results.picHours);
        careerData.goArounds = results.goArounds;
        careerData.diversions = results.diversions;
        careerData.autolands = results.autolands;
        careerData.totalPassangers = results.totalPassangers;
        careerData.totalpayload = results.totalpayload;
        careerData.totapFlightPlanDistance = results.totapFlightPlanDistance;
        careerData.aprchTypes = JsHelper.frequencyofApproachType(
          results.approachTypes
        );
        careerData.totalAirports = careerData.aprchTypes;

        // console.log(results);
        careerData.loader = false;
      });
    });

    const careerData = reactive({
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
      countAirports: [],
      totalAirports: [],
      airplaneNames: []
    });

    return {
      careerData
    };
  }
});
</script>
<style scoped>
.move-right {
  float: right;
}
</style>
