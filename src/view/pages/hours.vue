<template>
  <CardToolbox>
    <ContactPageheaderStyle>
      <sdPageHeader title="Hours">
        <template #subTitle></template>
      </sdPageHeader>
    </ContactPageheaderStyle>
  </CardToolbox>
  <Main>
    <a-spin :spinning="loaders.loader1" class size="large">
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
              :options="last365Days.chartOptions"
              :series="last365Days.series"
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
    </a-spin>
    <a-spin :spinning="loaders.loader2" class size="large">
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
    </a-spin>
  </Main>
</template>
<script>
import { defineComponent, reactive, onMounted } from "vue";
import { Main, CardToolbox } from "../styled";
import JsHelper from "../../helper/JsHelper";
import flight from "../../server/Flight";
// import moment from "moment";
import { ContactPageheaderStyle } from "./style";
import circularview from "../../server/circularview";

export default defineComponent({
  components: {
    Main,
    CardToolbox,
    ContactPageheaderStyle
  },
  setup() {
    onMounted(async () => {
      await circularview.getCircularViews().then(results => {
        // console.log(results);
        circularviews.td1 = results.totaldays1;
        circularviews.th1 = results.totalHours1;
        circularviews.td2 = results.totaldays2;
        circularviews.td3 = results.totaldays3;
        circularviews.td4 = results.totaldays4;
        circularviews.td5 = results.totaldays5;
        circularviews.th2 = results.totalHours2;
        circularviews.th3 = results.totalHours3;
        circularviews.th4 = results.totalHours4;
        circularviews.th5 = results.totalHours5;
        flight.getNdaysHours(circularviews.td1).then(results => {
          var lt = 100 / (circularviews.th1 * 60);
          lastSevenDays.series[0] = results.Hours * lt;
          lastSevenDays.chartOptions.labels[0] =
            "Last " + results.ndays + " Days";
          // console.log("7days", results);
        });
        flight.getNdaysHours(circularviews.td2).then(results => {
          last30Days.chartOptions.labels[0] = "Last " + results.ndays + " Days";
          var lt = 100 / (circularviews.th2 * 60);

          last30Days.series[0] = results.Hours * lt;
          // console.log("30days", results);
        });
        flight.getNdaysHours(circularviews.td3).then(results => {
          last90Days.chartOptions.labels[0] = "Last " + results.ndays + " Days";
          var lt = 100 / (circularviews.th3 * 60);

          last90Days.series[0] = results.Hours * lt;

          // console.log("90day", results);
        });
        flight.getNdaysHours(circularviews.td4).then(results => {
          last183Days.chartOptions.labels[0] =
            "Last " + results.ndays + " Days";
          var lt = 100 / (circularviews.th4 * 60);

          last183Days.series[0] = results.Hours * lt;

          // console.log("183days", results);
        });

        flight.getNdaysHours(circularviews.td5).then(results => {
          last365Days.chartOptions.labels[0] =
            "Last " + results.ndays + " Days";

          var lt = 100 / (circularviews.th5 * 60);

          last365Days.series[0] = results.Hours * lt;

          // console.log("365days", results);
        });
        loaders.loader1 = false;
      });
      await flight.getCurrentYearHours().then(results => {
        var lt = 100 / (120 * 60);

        currentMonth.series[0] = results.Hours * lt;
        currentMonth.chartOptions.labels[0] = results.month;
        // console.log("current month", results);
      });
      await flight.getCurrentYearHours().then(results => {
        var lt = 100 / (1000 * 60);
        currentYear.chartOptions.labels[0] = "Year" + " " + results.year;

        currentYear.series[0] = results.toalyear * lt;
        // console.log("current year", results);
      });
      await flight.getCurrentYearHours().then(results => {
        var lt = 100 / (300 * 60);
        Quarter1.chartOptions.labels[0] = results.year + " " + " 1st Quareter ";

        Quarter1.series[0] = results.Quarter1 * lt;
        // console.log("current year", results);
      });
      await flight.getCurrentYearHours().then(results => {
        var lt = 100 / (300 * 60);
        Quarter2.chartOptions.labels[0] = results.year + " " + " 2nd Quareter ";

        Quarter2.series[0] = results.Quarter2 * lt;
        // console.log("current year", results);
      });
      await flight.getCurrentYearHours().then(results => {
        var lt = 100 / (300 * 60);
        Quarter3.chartOptions.labels[0] = results.year + " " + " 3rd Quareter ";

        Quarter3.series[0] = results.Quarter3 * lt;
        // console.log("current year", results);
      });
      await flight.getCurrentYearHours().then(results => {
        var lt = 100 / (300 * 60);
        Quarter4.chartOptions.labels[0] = results.year + " " + " 4th Quareter ";

        Quarter4.series[0] = results.Quarter4 * lt;
        // console.log("current year", results);
        loaders.loader2 = false;
      });

      // await flight.getNdaysHours(63).then(results => {
      //   var lt = 100 / (245 * 60);

      //   last365Days.series[0] = results.Hours * lt;
      //   console.log("30days", results);
      // });
    });

    const loaders = reactive({
      laoder1: true
    });

    const circularviews = reactive({
      td1: "",
      td2: "",
      td3: "",
      td4: "",
      td5: "",
      th1: "",
      th2: "",
      th3: "",
      th4: "",
      th5: ""
    });
    const last30Days = reactive({
      series: [],
      chartOptions: {
        chart: {
          height: 100,
          type: "radialBar"
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "60"
            },
            track: {
              background: "#000",
              strokeWidth: "100%",
              margin: 0 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: true
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function(val) {
                  var lt = 100 / (circularviews.th2 * 60);

                  return JsHelper.mintoHourswithMin(val / lt);
                }
              }
            }
          }
        },
        fill: {
          type: "solid",
          colors: "#249efa"
        },
        labels: []
      }
    });
    const last365Days = reactive({
      series: [],
      chartOptions: {
        chart: {
          height: 100,
          type: "radialBar"
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "60"
            },
            track: {
              background: "#000",
              strokeWidth: "100%",
              margin: 0 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: true
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function(val) {
                  var lt = 100 / (circularviews.th5 * 60);

                  return JsHelper.mintoHourswithMin(val / lt);
                }
              }
            }
          }
        },
        fill: {
          type: "solid",
          colors: "#249efa"
        },
        labels: ["Last 63 Days"]
      }
    });

    const lastSevenDays = reactive({
      series: [],
      chartOptions: {
        chart: {
          height: 100,
          type: "radialBar"
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "60"
            },
            track: {
              background: "#000",
              strokeWidth: "100%",
              margin: 0 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: true
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function(val) {
                  // console.log("val", val);
                  var lt = 100 / (circularviews.th1 * 60);
                  return JsHelper.mintoHourswithMin(val / lt);
                }
              }
            }
          }
        },
        fill: {
          type: "solid",
          colors: "#249efa"
        },
        labels: []
      }
    });

    const last90Days = reactive({
      series: [],
      chartOptions: {
        chart: {
          height: 100,
          type: "radialBar"
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "60"
            },
            track: {
              background: "#000",
              strokeWidth: "100%",
              margin: 0 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: true
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function(val) {
                  var lt = 100 / (circularviews.th3 * 60);

                  return JsHelper.mintoHourswithMin(val / lt);
                }
              }
            }
          }
        },
        fill: {
          type: "solid",
          colors: "#249efa"
        },
        labels: ["Last 90 Days"]
      }
    });
    const last183Days = reactive({
      series: [],
      chartOptions: {
        chart: {
          height: 100,
          type: "radialBar"
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "60"
            },
            track: {
              background: "#000",
              strokeWidth: "100%",
              margin: 0 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: true
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function(val) {
                  var lt = 100 / (circularviews.th4 * 60);

                  return JsHelper.mintoHourswithMin(val / lt);
                }
              }
            }
          }
        },
        fill: {
          type: "solid",
          colors: "#249efa"
        },
        labels: ["Last 183 Days"]
      }
    });
    const currentMonth = reactive({
      series: [],
      chartOptions: {
        chart: {
          height: 100,
          type: "radialBar"
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "60"
            },
            track: {
              background: "#000",
              strokeWidth: "100%",
              margin: 0 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: true
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function(val) {
                  var lt = 100 / (120 * 60);

                  return JsHelper.mintoHourswithMin(val / lt);
                }
              }
            }
          }
        },
        fill: {
          type: "solid",
          colors: "#ebea22"
        },
        labels: []
      }
    });
    const currentYear = reactive({
      series: [],
      chartOptions: {
        chart: {
          height: 100,
          type: "radialBar"
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "60"
            },
            track: {
              background: "#000",
              strokeWidth: "100%",
              margin: 0 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: true
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function(val) {
                  var lt = 100 / (1000 * 60);

                  return JsHelper.mintoHourswithMin(val / lt);
                }
              }
            }
          }
        },
        fill: {
          type: "solid",
          colors: "#ebea22"
        },
        labels: []
      }
    });
    const Quarter1 = reactive({
      series: [],
      chartOptions: {
        chart: {
          height: 100,
          type: "radialBar"
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "60"
            },
            track: {
              background: "#000",
              strokeWidth: "100%",
              margin: 0 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: true
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function(val) {
                  var lt = 100 / (300 * 60);

                  return JsHelper.mintoHourswithMin(val / lt);
                }
              }
            }
          }
        },
        fill: {
          type: "solid",
          colors: "#ebea22"
        },
        labels: []
      }
    });
    const Quarter2 = reactive({
      series: [],
      chartOptions: {
        chart: {
          height: 100,
          type: "radialBar"
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "60"
            },
            track: {
              background: "#000",
              strokeWidth: "100%",
              margin: 0 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: true
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function(val) {
                  var lt = 100 / (300 * 60);

                  return JsHelper.mintoHourswithMin(val / lt);
                }
              }
            }
          }
        },
        fill: {
          type: "solid",
          colors: "#ebea22"
        },
        labels: []
      }
    });
    const Quarter3 = reactive({
      series: [],
      chartOptions: {
        chart: {
          height: 100,
          type: "radialBar"
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "60"
            },
            track: {
              background: "#000",
              strokeWidth: "100%",
              margin: 0 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: true
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function(val) {
                  var lt = 100 / (300 * 60);

                  return JsHelper.mintoHourswithMin(val / lt);
                }
              }
            }
          }
        },
        fill: {
          type: "solid",
          colors: "#ebea22"
        },
        labels: []
      }
    });
    const Quarter4 = reactive({
      series: [],
      chartOptions: {
        chart: {
          height: 100,
          type: "radialBar"
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "60"
            },
            track: {
              background: "#000",
              strokeWidth: "100%",
              margin: 0 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: true
              },
              value: {
                show: true,
                fontSize: "14px",
                formatter: function(val) {
                  var lt = 100 / (300 * 60);

                  return JsHelper.mintoHourswithMin(val / lt);
                }
              }
            }
          }
        },
        fill: {
          type: "solid",
          colors: "#ebea22"
        },
        labels: []
      }
    });

    return {
      lastSevenDays,
      last30Days,
      last365Days,
      last90Days,
      last183Days,
      currentMonth,
      currentYear,
      Quarter1,
      Quarter2,
      Quarter3,
      Quarter4,
      loaders,
      circularviews
    };
  }
});
</script>
