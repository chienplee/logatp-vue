<template>
  <Main>
    <sdCards title="Current Progress">
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
            :options="last63Days.chartOptions"
            :series="last63Days.series"
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
      </a-row>
    </sdCards>
    <sdCards title="Year Progress">
      <a-row :gutter="30">
        <a-col :lg="8" :md="8" :sm="24" :xs="24">
          <apexchart
            type="radialBar"
            height="280"
            :options="currentMonth.chartOptions"
            :series="currentMonth.series"
          ></apexchart>
        </a-col>
        <a-col :lg="8" :md="8" :sm="24" :xs="24">
          <apexchart
            type="radialBar"
            height="280"
            :options="currentYear.chartOptions"
            :series="currentYear.series"
          ></apexchart>
        </a-col>
        <a-col :lg="8" :md="8" :sm="24" :xs="24">
          <apexchart
            type="radialBar"
            height="280"
            :options="Quarter1.chartOptions"
            :series="Quarter1.series"
          ></apexchart>
        </a-col>
         <a-col :lg="8" :md="8" :sm="24" :xs="24">
          <apexchart
            type="radialBar"
            height="280"
            :options="Quarter2.chartOptions"
            :series="Quarter2.series"
          ></apexchart>
        </a-col>
          <a-col :lg="8" :md="8" :sm="24" :xs="24">
          <apexchart
            type="radialBar"
            height="280"
            :options="Quarter3.chartOptions"
            :series="Quarter3.series"
          ></apexchart>
        </a-col>
          <a-col :lg="8" :md="8" :sm="24" :xs="24">
          <apexchart
            type="radialBar"
            height="280"
            :options="Quarter4.chartOptions"
            :series="Quarter4.series"
          ></apexchart>
        </a-col>
        
      </a-row>
    </sdCards>
  </Main>
</template>
<script>
import { defineComponent, reactive, onMounted } from "vue";
import { Main } from "../styled";
import JsHelper from "../../helper/JsHelper";
import flight from "../../server/Flight";
import moment from "moment";

export default defineComponent({
  components: {
    Main,
  },
  setup() {
    onMounted(() => {
      console.log(moment("2013-01-01T00:00:00.000").quarter());

      flight.getCurrentYearHours().then((results) => {
        var lt = 100 / (120 * 60);

        currentMonth.series[0] = results.Hours * lt;
        currentMonth.chartOptions.labels[0] = results.month;
        console.log("current month", results);
      });
      flight.getCurrentYearHours().then((results) => {
        var lt = 100 / (1000 * 60);
        currentYear.chartOptions.labels[0] = "Year" + " " + results.year;

        currentYear.series[0] = results.toalyear * lt;
        console.log("current year", results);
      });
       flight.getCurrentYearHours().then((results) => {
        var lt = 100 / (300 * 60);
        Quarter1.chartOptions.labels[0] =  results.year +" "+" 1st Quareter ";

        Quarter1.series[0] = results.Quarter1 * lt;
        // console.log("current year", results);
      });
      flight.getCurrentYearHours().then((results) => {
        var lt = 100 / (300 * 60);
        Quarter2.chartOptions.labels[0] =  results.year +" "+" 2nd Quareter ";

        Quarter2.series[0] = results.Quarter2 * lt;
        // console.log("current year", results);
      });
        flight.getCurrentYearHours().then((results) => {
        var lt = 100 / (300 * 60);
        Quarter3.chartOptions.labels[0] =  results.year +" "+" 3rd Quareter ";

        Quarter3.series[0] = results.Quarter3 * lt;
        // console.log("current year", results);
      });
        flight.getCurrentYearHours().then((results) => {
        var lt = 100 / (300 * 60);
        Quarter4.chartOptions.labels[0] =  results.year +" "+" 4th Quareter ";

        Quarter4.series[0] = results.Quarter4 * lt;
        // console.log("current year", results);
      });

      flight.getNdaysHours(7).then((results) => {
        var lt = 100 / (32 * 60);
        lastSevenDays.series[0] = results.Hours * lt;
        console.log("/", results.Hours * lt);
        console.log("7days", results);
      });
      flight.getNdaysHours(30).then((results) => {
        var lt = 100 / (120 * 60);

        last30Days.series[0] = results.Hours * lt;
        console.log("30days", results);
      });
      flight.getNdaysHours(63).then((results) => {
        var lt = 100 / (245 * 60);

        last63Days.series[0] = results.Hours * lt;
        console.log("30days", results);
      });
      flight.getNdaysHours(90).then((results) => {
        var lt = 100 / (300 * 60);

        last90Days.series[0] = results.Hours * lt;

        console.log("90day", results);
      });
      flight.getNdaysHours(183).then((results) => {
        var lt = 100 / (600 * 60);

        last183Days.series[0] = results.Hours * lt;

        console.log("183days", results);
      });
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
            track: {
              background: '#000',
              strokeWidth: '100%',
              margin: 0 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: true,
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function (val) {
                  var lt = 100 / (120 * 60);

                  return JsHelper.mintoHourswithMin(val / lt);
                },
              },
            },
          },
        },
        fill: {
          type: 'solid',
          colors: '#249efa'
        },
        labels: ["Last 30 Days"],
      },
    });
    const last63Days = reactive({
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
            track: {
              background: '#000',
              strokeWidth: '100%',
              margin: 0 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: true,
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function (val) {
                  var lt = 100 / (245 * 60);

                  return JsHelper.mintoHourswithMin(val / lt);
                },
              },
            },
          },
        },
        fill: {
          type: 'solid',
          colors: '#249efa'
        },
        labels: ["Last 63 Days"],
      },
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
              size: "60",
            },
            track: {
              background: '#000',
              strokeWidth: '100%',
              margin: 0 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: true,
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function (val) {
                  console.log("val", val);
                  var lt = 100 / (32 * 60);
                  return JsHelper.mintoHourswithMin(val / lt);
                },
              },
            },
          },
        },
         fill: {
          type: 'solid',
          colors: '#249efa'
        },
        labels: ["Last 7 Days"],
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
            track: {
              background: '#000',
              strokeWidth: '100%',
              margin: 0 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: true,
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function (val) {
                  var lt = 100 / (300 * 60);

                  return JsHelper.mintoHourswithMin(val / lt);
                },
              },
            },
          },
        },
         fill: {
          type: 'solid',
          colors: '#249efa'
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
            track: {
              background: '#000',
              strokeWidth: '100%',
              margin: 0 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: true,
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function (val) {
                  var lt = 100 / (600 * 60);

                  return JsHelper.mintoHourswithMin(val / lt);
                },
              },
            },
          },
        },
         fill: {
          type: 'solid',
          colors: '#249efa'
        },
        labels: ["Last 183 Days"],
      },
    });
    const currentMonth = reactive({
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
            track: {
              background: '#000',
              strokeWidth: '100%',
              margin: 0 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: true,
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function (val) {
                  var lt = 100 / (120 * 60);

                  return JsHelper.mintoHourswithMin(val / lt);
                },
              },
            },
          },
        },
         fill: {
          type: 'solid',
          colors: '#ebea22'
        },
        labels: [],
      },
    });
    const currentYear = reactive({
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
            track: {
              background: '#000',
              strokeWidth: '100%',
              margin: 0 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: true,
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function (val) {
                  var lt = 100 / (1000 * 60);

                  return JsHelper.mintoHourswithMin(val / lt);
                },
              },
            },
          },
        },
         fill: {
          type: 'solid',
          colors: '#ebea22'
        },
        labels: [],
      },
    });
    const Quarter1 = reactive({
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
            track: {
              background: '#000',
              strokeWidth: '100%',
              margin: 0 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: true,
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function (val) {
                  var lt = 100 / (300 * 60);

                  return JsHelper.mintoHourswithMin(val / lt);
                },
              },
            },
          },
        },
         fill: {
          type: 'solid',
          colors: '#ebea22'
        },
        labels: [],
      },
    });
     const Quarter2 = reactive({
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
            track: {
              background: '#000',
              strokeWidth: '100%',
              margin: 0 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: true,
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function (val) {
                  var lt = 100 / (300 * 60);

                  return JsHelper.mintoHourswithMin(val / lt);
                },
              },
            },
          },
        },
         fill: {
          type: 'solid',
          colors: '#ebea22'
        },
        labels: [],
      },
    });
     const Quarter3 = reactive({
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
            track: {
              background: '#000',
              strokeWidth: '100%',
              margin: 0 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: true,
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function (val) {
                  var lt = 100 / (300 * 60);

                  return JsHelper.mintoHourswithMin(val / lt);
                },
              },
            },
          },
        },
         fill: {
          type: 'solid',
          colors: '#ebea22'
        },
        labels: [],
      },
    });
     const Quarter4 = reactive({
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
            track: {
              background: '#000',
              strokeWidth: '100%',
              margin: 0 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: true,
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function (val) {
                  var lt = 100 / (300 * 60);

                  return JsHelper.mintoHourswithMin(val / lt);
                },
              },
            },
          },
        },
         fill: {
          type: 'solid',
          colors: '#ebea22'
        },
        labels: [],
      },
    });

    return {
      lastSevenDays,
      last30Days,
      last63Days,
      last90Days,
      last183Days,
      currentMonth,
      currentYear,
      Quarter1,
      Quarter2,
      Quarter3,
      Quarter4
    };
  },
});
</script>
