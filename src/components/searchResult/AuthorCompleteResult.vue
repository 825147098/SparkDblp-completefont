<template>
  <!--    人名精确搜素结果-->
  <el-container>
    <el-main style="padding-top: 0; max-width: 850px">
      <PublicationList :plist="authorPublicationList" :total="total"/>
    </el-main>
    <!--        右侧细化列表-->
    <el-aside class="asideCon">
      <!--                    数量统计-->
      <!--                    输入栏-->
      <div class="refine-by">
        <p><b>按搜索词优化</b></p>
        <el-input size="mini"
                  v-model="refineInput"
                  style="width: 180px">
        </el-input>
      </div>
<!--      <RefineList show-name="已经使用的过滤器"
                  :item-click-callback="it=>removeFilter(it)"
                  :item-show-function="it=>it"
                  :limit-init="30"
                  :list="RSQLArrayList"/>
      <RefineList show-name="按照作者细化"
                  :item-click-callback="it=>commitAndRefresh(`author._VALUE==\'${it._VALUE}\'`)"
                  :item-show-function="it=>`${it._VALUE}(${it.num})`"
                  :limit-init="10"
                  v-loading="loadFlag.author"
                  :list="authorList"/>
      <RefineList show-name="按照类型细化"
                  :item-click-callback="it=>commitAndRefresh(`type==\'${it._VALUE}\'`)"
                  :item-show-function="it=>`${it.show}(${it.num})`"
                  :limit-init="10"
                  v-loading="loadFlag.type"
                  :list="typeList"/>
      <RefineList show-name="按照年份细化"
                  :item-click-callback="it=>commitAndRefresh(`year==\'${it._VALUE}\'`)"
                  :item-show-function="it=>`${it._VALUE}(${it.num})`"
                  :limit-init="10"
                  v-loading="loadFlag.year"
                  :list="yearList"/>
      <RefineList show-name="按照会议细化"
                  :item-click-callback="it=>commitAndRefresh(`prefix2==\'${it._VALUE}\'`)"
                  :item-show-function="it=>`${it.prefix2 ? it.prefix2 : it._VALUE}(${it.num})`"
                  :limit-init="10"
                  v-loading="loadFlag.venue"
                  :list="venueList"/>   -->
      <RefineList show-name="已经使用的过滤器"
                  :item-show-function="it=>it"
                  :limit-init="30"/>
      <RefineList show-name="按照作者细化"
                  :item-show-function="it=>`${it._VALUE}(${it.num})`"
                  :limit-init="10"
                  v-loading="loadFlag.author"
                  :list="authorList"/>
      <RefineList show-name="按照类型细化"
                  :item-show-function="it=>`${it.show}(${it.num})`"
                  :limit-init="10"
                  v-loading="loadFlag.type"
                  :list="typeList"/>
      <RefineList show-name="按照年份细化"
                  :item-show-function="it=>`${it._VALUE}(${it.num})`"
                  :limit-init="10"
                  v-loading="loadFlag.year"
                  :list="yearList"/>
      <RefineList show-name="按照会议细化"
                  :item-show-function="it=>`${it.prefix2 ? it.prefix2 : it._VALUE}(${it.num})`"
                  :limit-init="10"
                  v-loading="loadFlag.venue"
                  :list="venueList"/>
    </el-aside>
    <!--        关系图弹窗-->
    <el-dialog
        :visible.sync="dialogVisible"
        fullscreen="true"
        center>
      <!--            <div>-->
      <div id="autGraph" class="autGraph"></div>
      <!--            </div>-->
    </el-dialog>
  </el-container>
</template>

<script>
import axios from 'axios';
import _ from "lodash"
import {cumulativeStdNormalProbability} from 'simple-statistics'
import PublicationList from "@/components/searchResult/PublicationList";

export default {
  name: "AuthorCompleteResult",
  components: {
    PublicationList
  },
  data: function () {
    return {
      author: '',
      page: 0,
      //搜索参数
      //折叠面板标记
      //书籍标记
      //书籍信息
      authorPublicationList: [],
      total: 0,
      loadFlag: {
        publication: true,
        author: true,
        year: true,
        type: true,
        venue: true
      },
      size: '',
      pageDetail: '',
      flagRefine: '-',
      refineActiveName: '1',
      flag: '-',
      activeName: '1',
      dataFlag: false,
      //过滤结果列表
      filterList: [],
      yearList: [],
      //输入栏数据
      refineInput: '',
      //类型信息
      typeList: [],
      typeNameList: [],
      //类型标记
      typeLoadFlag: true,
      typeDataFlag: false,
      //作者数据
      authorList: [],
      autTestList: [],
      //作者标记
      autLoadFlag: true,
      autDataFlag: false,
      autSqlSize: '',
      authorNumCount: 0,
      autArrCount: 0,

      //会议数据
      venueList: [],
      venTestList: [],

      venNumCount: 0,
      venLoadFlag: true,
      venSqlSize: 0,
      venArrCount: 0,

      //筛选条件
      filterObj: {
        venue: '',
        authors: [],
        search: '',
        'Book and Theses': false,
        "Editorshop": false,
        'Informal Publications': false,
        'Parts in Books or Collections': false,
        'Journals Article': false,
        'Conference and Workshop Papers': false,
        size: 0,
        flag: false
      },

      nodeList: [],
      linkList: [],
      dialogVisible: false,

    }
  },

  methods: {
    //数据处理函数
    getPubData(name) {
      axios.get(this.$store.state.host + "/onlyDocs/search/findPageByAuthor__VALUE", {
        params: {
          author: name,
          size: 1000
        }
      }).then(res => {
        if (_(res.data).has("_embedded.onlyDocs")) {
          this.authorPublicationList = res.data._embedded.onlyDocs
          this.total = res.data.page.totalElements;
        }
        // this.filterList = this.authorPublicationList;

        // console.log(this.waitList)

        // this.changeType();
        this.initial()
        this.handleCheckAllChange()
      }).catch(error => {
        console.log(error);
      })
    },
    //列表调用
    /*    pubSort() {
          // this.groupBy();
          // this.sortYear();
          // this.dataFlag = true
          // this.loadFlag = false
        },*/
    //修改折叠面板标记
    /*    changeFalg() {
          if (this.flag === '-')
            this.flag = '+';
          else
            this.flag = '-';
        },*/
    //细化列表标记
    /*    changeRefineFalg() {
          if (this.flagRefine === '-')
            this.flagRefine = '+';
          else
            this.flagRefine = '-';
        },*/

    //type列表处理函数
/*    handleCheckAllChange() {
      this.typeList = (this.typeNameList || []).map(function (item) {
        return item.label;
      })
      // this.setTypeArray()
    },*/
    //type列表清空
    /*    handleDeleteAllChange() {
          this.typeList = [];
          // this.setTypeArray()
        },*/
    //获取type选项参数
    getTypeData() {
      let data = this.authorPublicationList;
      let arr = []
      for (let i = 0; i < data.length; i++) {

        arr.push({_VALUE: data[i].type});

      }
      let sort = this.group_signal(arr, "_VALUE");
      let arrlist = [];

      for (let item in sort) {
        arrlist.push({type: item})
      }

      this.typeNameList = arrlist.map(function (item) {
        return {
          "type": item.type,
          "label": item.type
        };
      })

      this.typeLoadFlag = false;
    },

    //作者方法
    getAuthorData() {
      this.autLoadFlag = true;
      let cont = 0;
      this.autArrCount = 0;

      let data = this.filterList;
      let arr = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].author != null) {
          for (let j = 0; j < data[i].author.length; j++) {
            arr.push({_VALUE: data[i].author[j]._VALUE, title: data[i].title});
          }
        } else {
          for (let j = 0; j < data[i].editor.length; j++) {
            arr.push({_VALUE: data[i].editor[j]._VALUE, title: data[i].title});
          }
        }
      }
      let sort = this.group_signal(arr, "_VALUE");
      let arrlist = [];

      for (let item in sort) {
        arrlist.push({_VALUE: item, num: sort[item].length, title: sort[item][0].title})
      }

      // console.log(arrlist)
      //数据清洗
      this.autTestList = arrlist.map(function (item) {

        return {
          "_VALUE": item._VALUE,
          "img": "el-icon-circle-plus",
          "index": cont++,
          "show": false,
          "num": item.num,
          "title": item.title
        };
      });

      this.autTestList = this.autTestList.sort(function (a, b) {
        return b.num - a.num;
      })

      for (let i = 0; i < this.autTestList.length; i++) {
        if (this.filterObj.authors.length == 0)
          break;
        else {
          if (this.filterObj.authors.indexOf(this.autTestList[i]._VALUE) != -1) {
            this.autTestList[i].show = true;
            this.autTestList[i].img = "el-icon-remove";
          }
        }
      }

      if (this.autArrCount + 10 < this.autTestList.length) {
        this.authorList = this.autTestList.slice(this.autArrCount, this.autArrCount + 10);
        this.autArrCount += 10;
      } else {
        this.authorList = this.autTestList.slice(this.autArrCount);
        this.autArrCount += this.autTestList.length;
      }

      this.autSqlSize = this.autTestList.length;

      this.authorNumCount = cont;
      this.autLoadFlag = false;
    },
    //作者获取更多
    getMoreAutData() {
      this.autLoadFlag = true;

      if (this.autArrCount + 10 < this.autTestList.length) {
        this.authorList = this.authorList.concat(this.autTestList.slice(this.autArrCount, this.autArrCount + 10));
        this.autArrCount += 10;
      } else {
        this.authorList = this.autTestList;
        this.autArrCount += this.autTestList.length;
      }

      this.autLoadFlag = false;
    },
    //鼠标移入
    /*mouseAutEnter(index) {
      if (this.authorList[index].img === "el-icon-circle-plus")
        this.authorList[index].show = true;
    },*/
    //鼠标移出
    /*mouseAutLeave(index) {
      if (this.authorList[index].img === "el-icon-circle-plus")
        this.authorList[index].show = false;
    },*/
    //作者选中
    /*    addAuthorToInput(index) {
          if (this.authorList[index].img === "el-icon-circle-plus") {
            this.authorList[index].show = true;
            this.authorList[index].img = "el-icon-remove";

            this.filterObj.authors.push(this.authorList[index]._VALUE)


          } else {
            this.authorList[index].show = false;
            this.authorList[index].img = "el-icon-circle-plus";

            this.filterObj.authors.splice(this.filterObj.authors.indexOf(this.authorList[index]._VALUE), 1)

          }

          this.filterObj.flag = true;
        },*/

    //过滤函数
    listFilter() {
      //会议过滤
      let venArr = [];
      let ven = this.filterObj.venue;
      let len = this.authorPublicationList.length
      for (let i = 0; i < len; i++) {
        if (ven === '') {
          venArr = this.authorPublicationList;
          break;
        } else {
          if (ven == this.authorPublicationList[i].journal || ven == this.authorPublicationList[i].booktitle) {
            // console.log(this.waitList[i].booktitle)
            venArr.push(this.authorPublicationList[i])
          }
        }
      }
      //作者过滤
      len = venArr.length;
      let autArr = [];
      for (let i = 0; i < len; i++) {
        if (this.filterObj.authors.length == 0) {
          autArr = venArr;
          break;
        } else {
          // console.log(this.filterObj.authors + venArr[i].author[j]._VALUE)
          if (venArr[i].author != null) {
            for (let j = 0; j < venArr[i].author.length; j++) {
              if (this.filterObj.authors.indexOf(venArr[i].author[j]._VALUE) != -1) {
                // console.log(this.filterObj.authors.indexOf(venArr[i].author[j]._VALUE))
                autArr.push(venArr[i]);
                break;
              }
            }
          }
          if (venArr[i].editor != null) {
            for (let j = 0; j < venArr[i].editor.length; j++) {
              if (this.filterObj.authors.indexOf(venArr[i].editor[j]._VALUE) != -1) {
                // console.log(this.filterObj.authors.indexOf(venArr[i].author[j]._VALUE))
                autArr.push(venArr[i]);
                break;
              }
            }
          }
        }
      }
      // console.log(autArr)
      //类型过滤
      let typeArr = [];
      len = autArr.length;
      for (let i = 0; i < len; i++) {
        if (this.filterObj[autArr[i].type]) {
          typeArr.push(autArr[i]);
        }
      }
      //搜索内容过滤
      let searchArr = [];
      len = typeArr.length;
      for (let i = 0; i < len; i++) {
        if (this.refineInput == '') {
          searchArr = typeArr;
          break;
        } else {
          let str = JSON.stringify(typeArr[i])
          if (str.indexOf(this.refineInput) != -1) {
            searchArr.push(typeArr[i]);
          }
        }
      }

      this.filterList = searchArr;
      this.filterObj.size = searchArr.length

      // console.log(this.filterList)
    },


    //初始化数据
    initial() {
      this.dataFlag = false;
      this.loadFlag = true;

      this.pubSort()

      this.getTypeData()

      this.getAuthorData();

      this.getVenueData();
    },

    //关系图
    setEchartsOption() {
      var myChart = this.$echarts.init(document.getElementById('autGraph'),
          "light"
      )

      this.getNode();
      this.getLink();

      var categories = [];

      for (let i = 0; i < this.filterList.length; i++) {
        categories[i] = {
          name: this.filterList[i].title
        }
      }

      categories[this.filterList.length] = {
        name: this.name
      }

      // var option = {
      //     title: {
      //         text: "协作者关系"
      //     },
      //     tooltip: {},
      //     animationDurationUpdate: 1500,
      //     animationEasingUpdate: 'quinticInOut',
      //     series: [
      //         {
      //             type: 'graph',
      //             layout: 'none',
      //             symbolSize: 50,
      //             roam: true,
      //             label: {
      //                 show: true
      //             },
      //             edgeSymbol: ['circle', 'arrow'],
      //             edgeSymbolSize: [0, 0],
      //             edgeLabel: {
      //                 fontSize: 12
      //             },
      //             data: this.nodeList,
      //             links: this.linkList,
      //             lineStyle: {
      //                 opacity: 0.9,
      //                 width: 2,
      //                 symbolSize: [0,0],
      //                 curveness: 0
      //             }
      //         }
      //     ]
      // }
      var option = {
        title: {
          text: '协作者关系',
          subtext: 'Default layout',
          top: 'bottom',
          left: 'right'
        },
        tooltip: {},
        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: '20',
          // selectedMode: 'single',
          data: categories.map(function (a) {
            return a.name;
          })
        },
        animation: false,
        series: [
          {
            // name: 'Les Miserables',
            type: 'graph',
            layout: 'force',
            data: this.nodeList,
            links: this.linkList,
            categories: categories,
            roam: true,
            label: {
              position: 'right'
            },
            force: {
              repulsion: 100
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

      //节点拖拽固定
      myChart.on('mouseup', function (params) {
        var option = myChart.getOption();
        option.series[0].data[params.dataIndex].x = params.event.offsetX;
        option.series[0].data[params.dataIndex].y = params.event.offsetY;
        option.series[0].data[params.dataIndex].fixed = true;
        myChart.setOption(option);
      });

    },
    //关系图节点
    getNode() {
      // let x = 400;
      // let y = 300;
      // let num = 360 / this.autTestList.length;
      // let cont = 0;
      let aut = this.name

      console.log(cumulativeStdNormalProbability(1));
      // console.log(standardNormalTable(1));

      //去除主作者的协助人统计数据
      let dataList = this.autTestList
          .filter(item => item._VALUE !== aut)
          .map(it => it.num);

      let sum = dataList
          .reduce((sum, it) => sum += it);

      let num = this.autTestList
          .map(it => it.num)
          .reduce(num => num += 1);

      let E_X = sum / num;
      let E_X2 = dataList
          .reduce((sum, it) => sum += (it * it)) / num;

      let DX = E_X2 - E_X * E_X;

      this.nodeList = this.autTestList.map(function (item) {
        if (item._VALUE === aut) {
          return {
            name: item._VALUE,
            x: null,
            y: null,
            symbolSize: 70,
            value: item.num,
            itemStyle: null,
            draggable: true,
            category: item._VALUE,
          }
        } else {
          // cont ++;
          return {
            name: item._VALUE,
            x: null,
            y: null,
            symbolSize: 25 * cumulativeStdNormalProbability((item.num - E_X) / DX),
            value: item.num,
            category: item.title,
            itemStyle: null,
            draggable: true,
          }
        }
      })
      // console.log(this.nodeList)
    },
    //关系图连线
    getLink() {
      let data = this.filterList;
      let arr = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].author != null) {
          for (let j = 0; j < data[i].author.length; j++) {
            for (let k = j + 1; k < data[i].author.length; k++) {
              arr.push({source: data[i].author[j]._VALUE, target: data[i].author[k]._VALUE});
            }
          }
        } else {
          for (let j = 0; j < data[i].editor.length; j++) {
            for (let k = j + 1; k < data[i].editor.length; k++) {
              arr.push({source: data[i].editor[j]._VALUE, target: data[i].editor[k]._VALUE});
            }
          }
        }
      }
      this.linkList = arr;
    },

    //弹窗控制
    openDialog() {

      this.dialogVisible = true;

      setTimeout(() => {
        this.setEchartsOption();
      }, 300)
    }


  },

  watch: {
    //类型列表监控
    typeList: function () {
      this.filterObj["Book and Theses"] = this.filterObj.Editorshop = this.filterObj["Conference and Workshop Papers"] =
          this.filterObj["Informal Publications"] = this.filterObj["Journals Article"] =
              this.filterObj["Parts in Books or Collections"] = false;

      let len = this.typeList.length;
      for (let i = 0; i < len; i++) {
        this.filterObj[this.typeList[i]] = true;
      }

      this.filterObj.flag = true
    },
    //细化搜索监控
    refineInput: function () {
      this.filterObj.search = this.refineInput;
      this.filterObj.flag = true
    },
    //过滤条件选中监控
    'filterObj.flag': function () {
      if (this.filterObj.flag) {
        this.listFilter();
        this.filterObj.flag = false
        this.initial()

      }

    },

    name: function (newValue) {
      this.getPubData(newValue)
    }


  },

  computed: {},

  props: ['name'],

  mounted() {
    // this.getPubData();
    console.log(this.name);
    this.getPubData(this.name);
    // this.setEchartsOption();
  }
}
</script>

<style scoped>
@import "../../style/public.css";


.putList > li.year {
  font-size: small;
  font-weight: 800;
}


.refine-by > ul > li {
  display: block;
  padding: 2px 4px 0 0;
  margin: 0;
  text-decoration: none;
  max-width: 250px;
}

.checkBox {
  font-size: smaller;
}

.dialogButton {
  font-size: smaller;
  text-align: left;
  padding: 0 20px;
}

.autGraph {
  height: 85vh;
  /*margin: auto;*/
  /*width: 100%;*/
}
</style>
