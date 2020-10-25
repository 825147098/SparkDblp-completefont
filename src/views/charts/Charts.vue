<template>
  <el-container>
    <div id="chart">

    </div>
    <br>
    <div id="chartc">

    </div>

    <el-button @click="testAuthor(xml)">xml</el-button>
  </el-container>

</template>

<script>

import axios from "axios";

export default {
  name: "Charts",

  data: function () {
    return {
      title: 'Response时间',
      legend: ['文章', '作者', '会议', '文章_C', '作者_C', '会议_C'],
      seriesData: [
        {
          name: '文章',
          type: 'line',
          symbol: 'line',
          symbolSize: 0,
          itemStyle: {
            // borderWidth: 3,
            borderColor: 'black',
            color: 'gray'
          },
          lineStyle: {
            color: 'gray',
            width: 2,
          },
          data: [[9286, 201], [13009, 3990], [777, 91], [3653, 2610], [0, 24], [216, 678], [69, 194], [619, 1710], [6420, 5390], [24, 109], [15253, 8360], [750, 586], [1, 68], [4971, 861], [20395, 6180], [23301, 4870], [27833, 7470], [34466, 8820], [29683, 6690], [21997, 2860]]
        },
        // {
        //     name: '作者',
        //     type: 'line',
        //     symbol: 'circle',
        //     symbolSize:8,
        //     itemStyle: {
        //         borderWidth: 3,
        //         borderColor: 'black',
        //         color: 'gray'
        //     },
        //     lineStyle: {
        //         color: 'gray',
        //         width: 2,
        //     },
        //     data: [[11695, 2540], [26099, 536], [2189, 168], [9173, 4990], [0, 51], [504, 677], [181, 180], [1429, 2080], [11701, 7050], [105, 105], [33066, 5010], [1346, 694], [4, 66], [2472, 3470], [40972, 23470], [36445, 12550], [59676, 15120], [57620, 17900], [57486, 17130], [33979, 8440]]
        // },
        // {
        //     name: '会议',
        //     type: 'line',
        //     symbol: 'triangle',
        //     symbolSize:8,
        //     itemStyle: {
        //         borderWidth: 3,
        //         borderColor: 'black',
        //         color: 'gray'
        //     },
        //     lineStyle: {
        //         color: 'gray',
        //         width: 2,
        //     },
        //     data: [[1513, 6260], [2210, 149], [429, 114], [1346, 4250], [0, 45], [167, 672], [55, 176], [394, 2080], [1630, 6990], [21, 202], [2394, 5210], [344, 738], [1, 58], [582, 3320], [2927, 17110], [2996, 18330], [3459, 13930], [3303, 14010], [3349, 10430], [2394, 8940]]
        // },
      ],

      seriesDataC: [
        {
          name: '文章_C',
          type: 'line',
          symbol: 'image://' + require('@/assets/dotted.jpg'),
          symbolSize: 0,
          itemStyle: {
            // borderWidth: 3,
            borderColor: 'black',
            color: 'gray'
          },
          lineStyle: {
            color: 'gray',
            type: 'dashed',
            width: 2,
          },
          data: [[9286, 161], [13009, 298], [777, 191.5], [3653, 311.5], [0, 35], [216, 177.5], [69, 93.5], [619, 139], [6420, 272], [24, 101.5], [15253, 251.5], [750, 92], [1, 43], [4971, 310], [20395, 563.5], [23301, 1190], [27833, 2030], [34466, 2755], [29683, 1780], [21997, 411.5]]
        },
        // {
        //     name: '作者_C',
        //     type: 'line',
        //     symbol: 'circle',
        //     symbolSize:8,
        //     itemStyle: {
        //         borderWidth: 3,
        //         borderColor: 'black',
        //         color: 'gray'
        //     },
        //     lineStyle: {
        //         color: 'gray',
        //         width: 2,
        //     },
        //     data: [[11695, 158.5], [26099, 490.5], [2189, 115.5], [9173, 152], [0, 24], [504, 106.5], [181, 51], [1429, 74], [11701, 343], [105, 59.5], [33066, 304], [1346, 15], [4, 37.5], [2472, 35], [40972, 250.5], [36445, 298], [59676, 473], [57620, 414], [57486, 239.5], [33979, 171]]
        // },
        // {
        //     name: '会议_C',
        //     type: 'line',
        //     symbol: 'triangle',
        //     symbolSize:8,
        //     itemStyle: {
        //         borderWidth: 3,
        //         borderColor: 'black',
        //         color: 'gray'
        //     },
        //     lineStyle: {
        //         color: 'gray',
        //         width: 2,
        //     },
        //     data: [[1513, 60.5], [2210, 108.5], [429, 110], [1346, 54.5], [0, 27], [167, 104.5], [55, 89], [394, 52], [1630, 196.5], [21, 50], [2394, 34.5], [344, 13], [1, 59], [582, 31], [2927, 79.5], [2996, 81], [3459, 100], [3303, 124], [3349, 50], [2394, 87.5]]
        // },
      ]


    }
  },

  methods: {
    setCharts() {
      var myChart = this.$echarts.init(document.getElementById('chart'),
          "light"
      )


      this.seriesData.map(function (item) {
        item.data = item.data.sort(function (a, b) {
          return a[0] - b[0]
        })

        let a = 49.9;
        let b = 0.451;
        item.data = item.data.map(function (item2) {
          let ln = Math.log(item2[0]);
          let lny = b * ln;
          // console.log(lny)
          return [ln, a * Math.exp(lny)];
        })

        return {
          name: item.name,
          type: item.type,
          data: item.data
        }
      })

      this.seriesDataC.map(function (item) {
        item.data = item.data.sort(function (a, b) {
          return a[0] - b[0]
        })

        let a = 3.229E-7;
        let b = 2.176;
        item.data = item.data.map(function (item2) {
          return [Math.log(item2[0]), a * Math.exp(b * Math.log(item2[0]))];
        })

        return {
          name: item.name,
          type: item.type,
          data: item.data
        }
      })
      // console.log(this.seriesData)
      this.seriesData.push(this.seriesDataC[0]);
      var option = {
        title: {
          text: this.title + '对比'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.legend
        },
        grid: {
          left: '5%',    // 组件离容器左侧的距离,百分比字符串或整型数字
          right: '8%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          name: 'ln(N)',
          min: 0,
          max: 12,
          step: 0.5,
          boundaryGap: false,
        },
        yAxis: {
          name: '时间/ms',
        },

        series: this.seriesData
      };

      myChart.setOption(option);

    },
    testAuthor(title) {
      let param = title;
      axios.get(this.$store.state.host + "/onlyDocs/search/findAllByTitleMatchesTextAuthorRefineList", {
        params: {
          title: title
        }
      }).then(res => {
        console.log(res);
      })
    },
    setChartcs() {
      var myChart = this.$echarts.init(document.getElementById('chartc'),
          "light"
      )


      this.seriesDataC.map(function (item) {
        item.data = item.data.sort(function (a, b) {
          return a[0] - b[0]
        })

        item.data = item.data.map(function (item2) {
          return [Math.log(item2[0]), item2[1]]
        })

        return {
          name: item.name,
          type: item.type,
          data: item.data
        }
      })
      // console.log(this.seriesData)
      var option = {
        title: {
          text: this.title + '(有缓存)'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.legend
        },
        grid: {
          left: '5%',    // 组件离容器左侧的距离,百分比字符串或整型数字
          right: '8%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          name: 'ln(N)',
          min: 0,
          max: 12,
          step: 0.5
        },
        yAxis: {
          name: '时间/ms',
        },
        series: this.seriesDataC
      };

      myChart.setOption(option);

    }
  },

  mounted() {
    this.setCharts()
    this.setChartcs()
  },

}
</script>

<style scoped>
#chart {
  height: 700px;
  width: 1000px;
  /*display: none;*/
}

#chartc {
  display: none;
  height: 700px;
  width: 1000px;
}
</style>
