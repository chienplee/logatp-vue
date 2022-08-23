<template>
  <CardToolbox>
    <ContactPageheaderStyle>
      <sdPageHeader title="Dashboard">
        <template #subTitle>
        </template>
      </sdPageHeader>
    </ContactPageheaderStyle>
  </CardToolbox>
    <Main>
      <sdCards>
        <a-row :gutter="30">
          <a-col
            v-for="user in overviewData.users"
            :key="user"
            :lg="4"
            :md="4"
            :sm="6"
            :xs="24"
          >
            <sdCards>
              <Overview :user="user" />
            </sdCards>
          </a-col>
        </a-row>
      </sdCards>

      <sdCards>
        <a-row :gutter="30">
          <a-col :lg="8" :md="8" :sm="24" :xs="24">
            <apexchart
              type="radialBar"
              height="280"
              :options="lastSevenDays.chartOptions"
              :series="lastSevenDays.series"
            ></apexchart>
          </a-col>
          
          <a-col :lg="8" :md="8" :sm="24" :xs="24">
            <apexchart
              type="radialBar"
              height="280"
              :options="last30Days.chartOptions"
              :series="last30Days.series"
            ></apexchart>
          </a-col>
          
          <a-col :lg="8" :md="8" :sm="24" :xs="24">
            <apexchart
              type="radialBar"
              height="280"
              :options="last90Days.chartOptions"
              :series="last90Days.series"
            ></apexchart>
          </a-col>
          
          <a-col :lg="8" :md="8" :sm="24" :xs="24">
            <apexchart
              type="radialBar"
              height="280"
              :options="last183Days.chartOptions"
              :series="last183Days.series"
            ></apexchart>
          </a-col>
          <a-col :lg="8" :md="8" :sm="24" :xs="24">
            <apexchart
              type="radialBar"
              height="280"
              :options="last365Days.chartOptions"
              :series="last365Days.series"
            ></apexchart>
          </a-col>
        </a-row>


      </sdCards>
      <a-row :gutter="30">
        <sdCards title="LAST 5 FLIGHTS">
          <a-table
            :columns="lastFiveFlightData.columns"
            :data-source="lastFiveFlightData.data"
            :pagination="false"
          >
            <template v-slot:name:text>
              <a>{{ text }}</a>
            </template>
          </a-table>
        </sdCards>
      </a-row>
    </Main>
</template>
<script>
import { defineComponent, onMounted, reactive } from "vue";
import { Main, CardToolbox } from "../styled";
import Overview from "./Dashboard/overview.vue";
import { ContactPageheaderStyle } from "./style"

import flight from "../../server/Flight.js";
import JsHelper from "../../helper/JsHelper.js";

export default defineComponent({
  components: { Main, Overview, ContactPageheaderStyle, CardToolbox },
  setup() {
    const aicrafts = reactive({
      uniqueAircrafts: [],
      uniqueArports: [],
    });

    onMounted(async () => {
      flight.getLastFiveFlightsRecored().then((results) => {
        for (const obj of results) {
          lastFiveFlightData.data.push({
            DATE: obj.DATE,
            key: obj.id,
            DeparturetoDestination: obj.DeparturetoDestination,
            FlightNumber: obj.FlightNumber,
            BlockTime: obj.BlockTime,
          });
        }
      });

      flight.getDashboardData().then((results) => {
        overviewData.users[1].data = results.length;
        aicrafts.uniqueAircrafts = JsHelper.fliterUniqvalue(results.aircrafts)
        overviewData.users[5].data = aicrafts.uniqueAircrafts.length;
        aicrafts.uniqueArports = JsHelper.fliterUniqvalue(results.airports)
        overviewData.users[2].data = aicrafts.uniqueArports.length;
        console.log(results.Hours);
        overviewData.users[0].data = results.HourswithMinutes;
        overviewData.users[3].data = results.PFTakeoff;
        overviewData.users[4].data = results.PFLanding;

        // console.log("hourswithmin",results.HourswithMinutes)
      });

      flight.getNdaysHours(7).then((results) => {
        var lt = (100)/(32*60)
        lastSevenDays.series[0] = results.Hours*lt;
        console.log("/",results.Hours*lt)
        console.log("7days", results);

      });
      flight.getNdaysHours(30).then((results) => {
        var lt = (100)/(120*60)

        last30Days.series[0] = results.Hours*lt;
        console.log("30days", results);
      });
      flight.getNdaysHours(90).then((results) => {
        var lt = (100)/(300*60)

        last90Days.series[0] = results.Hours*lt;

        console.log("90day", results);
      });
      flight.getNdaysHours(183).then((results) => {
        var lt = (100)/(600*60)

        last183Days.series[0] = results.Hours*lt;

        console.log("183days", results);
      });
      flight.getNdaysHours(365).then((results) => {
        var lt = (100)/(1000*60)

        last365Days.series[0] = results.Hours*lt;

        console.log("365days", results);
      });
    });

    const overviewData = reactive({
      users: [
        {
          data: 0,
          title: "Hours",
          icon: "fa-solid fa-clock",
        },
        {
          data: 0,
          title: "Flights",
          icon: "fa-solid fa-business-time",
        },
        {
          data: 0,
          title: "Airports",
          icon: "fa-solid fa-location-dot",
        },
        {
          data: 0,
          title: "Takeoffs",
          icon: "fa-solid fa-plane-departure",
        },
        {
          data: 0,
          title: "Landings",
          icon: "fa-solid fa-plane-arrival",
        },
        {
          data: 0,
          title: "Aircraft",
          icon: "fa-solid fa-jet-fighter-up",
        },
      ],
    });

    const lastSevenDays = reactive({
      series: [],
      chartOptions: {
        chart: {
          height: 100,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '60',
            },
            dataLabels: {
              name: {
                show: true,
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function (val) {
                  console.log("val",val)
                  var lt = (100)/(32*60)
                  return JsHelper.mintoHourswithMin(val/lt);
                },
              },
            },
          },
        },
        labels: ["Last 7 Days"],
      },
    });
    const last30Days = reactive({
      series: [],
      chartOptions: {
        chart: {
          height: 100,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "60",
            },
            dataLabels: {
              name: {
                show: true,
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function (val) {
        var lt = (100)/(120*60)

                  return JsHelper.mintoHourswithMin(val/lt);
                },
              },
            },
          },
        },
        labels: ["Last 30 Days"],
      },
    });
    const last90Days = reactive({
      series: [],
      chartOptions: {
        chart: {
          height: 100,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "60",
            },
            dataLabels: {
              name: {
                show: true,
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function (val) {
        var lt = (100)/(300*60)

                  return JsHelper.mintoHourswithMin(val/lt);
                },
              },
            },
          },
        },
        labels: ["Last 90 Days"],
      },
    });
    const last183Days = reactive({
      series: [],
      chartOptions: {
        chart: {
          height: 100,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "60",
            },
            dataLabels: {
              name: {
                show: true,
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function (val) {
        var lt = (100)/(600*60)

                  return JsHelper.mintoHourswithMin(val/lt);
                },
              },
            },
          },
        },
        labels: ["Last 183 Days"],
      },
    });
    const last365Days = reactive({
      series: [],
      chartOptions: {
        chart: {
          height: 100,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "60",
            },
            dataLabels: {
              name: {
                show: true,
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function (val) {
        var lt = (100)/(1000*60)

                  return JsHelper.mintoHourswithMin(val/lt);
                },
              },
            },
          },
        },
        labels: ["Last 365 Days"],
      },
    });
    const lastFiveFlightData = reactive({
      data: [
        // {
        //   key: '1',
        //   DATE:"",
        //   DeparturetoDestination: 'HYD -> DEL',
        //   FlightNumber: 32,
        //   BlockTime: '25:38',
        // },
        // {
        //   key: '2',
        //    DATE:"",
        //   DeparturetoDestination: 'HYD -> DEL',
        //   FlightNumber: 32,
        //   BlockTime: '25:38',
        // },
        // {
        //   key: '3',
        //    DATE:"",
        //   DeparturetoDestination: 'HYD -> DEL',
        //   FlightNumber: 32,
        //   BlockTime: '25:38',
        // },
        // {
        //   key: '4',
        //    DATE:"23-06-2022",
        //   DeparturetoDestination: 'HYD -> DEL',
        //   FlightNumber: 32,
        //   BlockTime: '25:38',
        // },
      ],
      columns: [
        {
          title: "DATE",
          dataIndex: "DATE",
          key: "DATE",
        },
        {
          title: "DeparturetoDestination",
          dataIndex: "DeparturetoDestination",
          key: "DeparturetoDestination",
        },
        {
          title: "FlightNumber",
          dataIndex: "FlightNumber",
          key: "FlightNumber",
        },
        {
          title: "BlockTime",
          dataIndex: "BlockTime",
          key: "BlockTime",
        },
      ],
    });
    return {
      lastSevenDays,
      overviewData,
      lastFiveFlightData,
      last30Days,
      last90Days,
      last183Days,
      last365Days,
      aicrafts,
    };
  },
});
</script>
