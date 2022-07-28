<script>
import Chart from 'chart.js';
import VueTypes from 'vue-types';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChartJs',
  props: {
    type: VueTypes.string.def('bar'),
    class: VueTypes.string.isRequired.def('bar'),
    style: VueTypes.object.def({ marginBottom: '20px' }),
    labels: VueTypes.arrayOf(VueTypes.string).def([
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]),
    height: VueTypes.number.def(190),
    datasets: VueTypes.arrayOf(VueTypes.object).def([
      {
        data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
        backgroundColor: '#001737',
        barPercentage: 0.6,
      },
      {
        data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
        backgroundColor: '#1ce1ac',
        barPercentage: 0.6,
      },
    ]),
    options: VueTypes.object.def({
      maintainAspectRatio: true,
      responsive: true,
      legend: {
        display: false,
        labels: {
          display: false,
        },
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              color: '#e5e9f2',
            },
            ticks: {
              beginAtZero: true,
              fontSize: 10,
              fontColor: '#182b49',
              max: 80,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              beginAtZero: true,
              fontSize: 11,
              fontColor: '#182b49',
            },
          },
        ],
      },
    }),
  },
  data() {
    return {
      chartType: this.type,
      chartData: {
        labels: this.labels,
        datasets: this.datasets,
      },
      chartOptions: this.options,
    };
  },
  methods: {
    chartConstructor(chartType, chartData, chartOptions) {
      const chartElement = document.querySelector('.' + this.class);
      new Chart(chartElement, {
        type: chartType,
        data: chartData,
        options: chartOptions,
      });
    },
  },
  mounted() {
    let { chartType, chartData, chartOptions } = this;
    this.chartConstructor(chartType, chartData, chartOptions);
  },
  render() {
    return <canvas class={this.class} style={this.style} height={this.height}></canvas>;
  },
});
</script>
