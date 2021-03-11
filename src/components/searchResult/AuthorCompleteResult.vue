<template>
  <!--    人名精确搜素结果-->
  <el-container>
    <el-main style="padding-top: 0; max-width: 850px">
      <el-collapse v-model="activeName" accordion @change="changeFalg">
        <el-collapse-item name="1">
          <template slot="title">
            [{{ flag }}] 搜索结果
          </template>
          <ul v-show="dataFlag"
              class="putList"
              v-for="year in yearList" :key="year"
          >
            <!--                        年份排序文章列表-->
            <li class="year">{{ year }}</li>
            <li v-for="item in pubList[year]" :key="item.title + item.type">
              <BookAndTheseItem v-if="item.type == 'Book and Theses'"
                                :inner-data="item"
              ></BookAndTheseItem>
              <ConfAndWorkItem v-else-if="item.type == 'Conference and Workshop Papers'"
                               :inner-data="item"
              ></ConfAndWorkItem>
              <EditorShipItem v-else-if="item.type == 'Editorshop'"
                              :inner-data="item"
              ></EditorShipItem>
              <InformalPubItem v-else-if="item.type == 'Informal Publications'"
                               :inner-data="item"
              ></InformalPubItem>
              <PartInBookOrCollItem v-else-if="item.type == 'Parts in Books or Collections'"
                                    :inner-data="item"
              ></PartInBookOrCollItem>
              <JournalItem v-else-if="item.type == 'Journals Article'"
                           :inner-data="item"
              ></JournalItem>
              <ReferenceWorkItem v-else-if="item.type == 'Reference Works'"
                                 :inner-data="item">
              </ReferenceWorkItem>
              <WithdrawnItem v-else-if="item.type == 'Withdrawn Item'"
                             :inner-data="item">
              </WithdrawnItem>
            </li>
          </ul>
          <!--                    加载图标-->
          <ul v-show="loadFlag"
              class="putList">
            <li style="color: #409EFF">
              Loading
              <el-icon class="el-icon-loading"
                       style="font-size: 20px "
              ></el-icon>
            </li>
          </ul>
          <ul v-show="yearList.length == 0 && !loadFlag && dataFlag"
              class="putList">
            <li>
              结果为空
            </li>
          </ul>
        </el-collapse-item>
      </el-collapse>
    </el-main>
    <!--        右侧细化列表-->
    <el-aside class="asideCon">
      <el-collapse v-model="refineActiveName" accordion @change="changeRefineFalg">
        <el-collapse-item name="1">
          <template slot="title">
            [{{ flagRefine }}] 搜索优化列表
          </template>
          <!--                    数量统计-->
          <div class="refine-by"
               v-show="!loadFlag && dataFlag">
            <em>
              <span v-if="filterObj.size == 0 || filterObj.size == waitList.length">显示所有{{ waitList.length }}条记录</span>
              <span v-else>放大&nbsp;{{ waitList.length }}&nbsp;条记录中的&nbsp;{{ filterObj.size }}&nbsp;条</span>
            </em>
          </div>
          <!--                    输入栏-->
          <div class="refine-by">
            <p><b>按搜索词优化</b></p>
            <el-input size="mini"
                      v-model="refineInput"
                      style="width: 180px">
            </el-input>
          </div>
          <!--                    类型-->
          <el-main style="padding: 0">
            <div class="refine-by" style="padding: 0">
              <p><b>
                按照类型细化
              </b></p>
              <ul v-show="!typeLoadFlag">
                <el-checkbox-group v-model="typeList">
                  <li v-for="item in typeNameList"
                      :key="item.type">
                    <el-checkbox :label="item.label"
                                 size="mini"
                                 class="authorButton">
                                            <span class="checkBox">
                                                {{ item.type }}(only)
                                            </span>
                    </el-checkbox>
                  </li>
                </el-checkbox-group>
              </ul>
              <ul v-show="!typeLoadFlag">
                <li>
                  <el-button size="mini"
                             class="authorButton"
                             @click="handleCheckAllChange"
                             type="text">
                    全选
                  </el-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-button size="mini"
                             @click="handleDeleteAllChange"
                             class="authorButton"
                             type="text">
                    取消
                  </el-button>
                </li>
              </ul>
              <ul v-show="typeLoadFlag">
                <li>
                  <el-icon class="el-icon-loading"
                           style="font-size: 20px "
                  ></el-icon>
                </li>
              </ul>
              <ul v-show="typeNameList.length == 0 && !typeLoadFlag"
                  class="putList">
                <li>
                  结果为空
                </li>
              </ul>
            </div>
          </el-main>
          <!--                    作者-->
          <el-main style="padding: 0">
            <div class="refine-by">
              <p><b>
                按照协作者细化
                <el-button
                    v-show="!autLoadFlag"
                    class="dialogButton"
                    @click="openDialog"
                    type="text">
                  关系图
                </el-button>
              </b></p>
              <ul v-show="!autLoadFlag">
                <li v-for="(item,index) in authorList" :key="item._VALUE">
                  <i :class=item.img
                     class="icon"
                     v-show="item.show"></i>
                  <el-button type="text"
                             size="small"
                             @mouseenter.native="mouseAutEnter(index)"
                             @mouseleave.native="mouseAutLeave(index)"
                             @click="addAuthorToInput(index)"
                             :class="['authorButton' ,item.show ? 'buttonSelect' : '']">
                    {{ item._VALUE }}({{ toThousands(item.num) }})
                    <span v-show="item.show">✔</span>
                  </el-button>

                </li>
              </ul>
              <ul v-show="autLoadFlag">
                <li>
                  <el-icon class="el-icon-loading"
                           style="font-size: 20px "
                  ></el-icon>
                </li>
              </ul>
              <ul v-show="!autLoadFlag && autSqlSize - authorList.length > 0">
                <li>
                  <el-button
                      type="text"
                      @click="getMoreAutData"
                      class="authorButton"
                      size="samll">
                    <em>
                      {{ autSqlSize - authorList.length }}更多可选项
                    </em>
                  </el-button>
                </li>
              </ul>
              <ul v-show="authorList.length == 0 && !autLoadFlag"
                  class="putList">
                <li>
                  结果为空
                </li>
              </ul>
            </div>
          </el-main>
          <el-main style="padding: 0">
            <div class="refine-by">
              <p><b>
                按照会议细化
              </b></p>
              <ul v-show="!venLoadFlag">
                <li v-for="(item,index) in venueList" :key="item._VALUE">
                  <i :class=item.img
                     class="icon"
                     v-show="item.show"></i>
                  <el-button type="text"
                             size="small"
                             @mouseenter.native="mouseVenEnter(index)"
                             @mouseleave.native="mouseVenLeave(index)"
                             @click="addVenToInput(index)"
                             :class="['authorButton' ,item.show ? 'buttonSelect' : '']">
                    {{ item._VALUE }}({{ toThousands(item.num) }})
                    <span v-show="item.show">✔</span>
                  </el-button>
                </li>
              </ul>
              <ul v-show="venLoadFlag">
                <li>
                  <el-icon class="el-icon-loading"
                           style="font-size: 20px "
                  ></el-icon>
                </li>
              </ul>
              <ul v-show="!venLoadFlag && filterObj.venue === ''
                            && venSqlSize - venueList.length > 0">
                <li>
                  <el-button
                      type="text"
                      @click="getMoreVenData"
                      class="authorButton"
                      size="samll">
                    <em>
                      {{ venSqlSize - venueList.length }}更多可选项
                    </em>
                  </el-button>
                </li>
              </ul>
              <ul v-show="venueList.length == 0 && !venLoadFlag"
                  class="putList">
                <li>
                  结果为空
                </li>
              </ul>
            </div>
          </el-main>
        </el-collapse-item>
      </el-collapse>
    </el-aside>
    <!--        关系图弹窗-->
    <el-dialog
        :visible.sync="dialogVisible"
        fullscreen="true"
        center
    >
      <!--            <div>-->
      <div id="autGraph" class="autGraph"></div>
      <!--            </div>-->
    </el-dialog>
  </el-container>
</template>

<script>
import axios from 'axios';
import BookAndTheseItem from "../bookTypeItem/BookAndTheseItem";
import ConfAndWorkItem from "../bookTypeItem/ConfAndWorkItem";
import EditorShipItem from "../bookTypeItem/EditorShipItem";
import InformalPubItem from "../bookTypeItem/InformalPubItem";
import JournalItem from "../bookTypeItem/JournalItem";
import PartInBookOrCollItem from "../bookTypeItem/PartInBookOrCollItem";
import ReferenceWorkItem from "../bookTypeItem/ReferenceWorkItem";
import WithdrawnItem from "../bookTypeItem/WithdrawnItem";
import {cumulativeStdNormalProbability} from 'simple-statistics'

export default {
  name: "AuthorCompleteResult",
  components: {
    WithdrawnItem,
    ReferenceWorkItem,
    PartInBookOrCollItem,
    JournalItem, InformalPubItem, EditorShipItem, ConfAndWorkItem, BookAndTheseItem
  },
  data: function () {
    return {
      //搜索参数
      author: '',
      page: 0,
      size: '',
      pageDetail: '',
      //折叠面板标记
      flagRefine: '-',
      refineActiveName: '1',
      flag: '-',
      activeName: '1',
      //书籍标记
      loadFlag: true,
      dataFlag: false,
      //书籍信息
      pubList: [],
      waitList: [],
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
    getPubData() {
      axios.get(this.$store.state.host + "/onlyDocs/search/findAllByAuthor__VALUE", {
        params: {
          author: this.author,
          size: 300
        }
      }).then(res => {
        this.waitList = res.data._embedded.onlyDocs;
        this.filterList = this.waitList;
        this.pageDetail = res.data.page;
        // console.log(this.waitList)

        this.changeType();
        this.getData()
        this.handleCheckAllChange()
      }).catch(error => {
        console.log(error);
      })
    },
    //分组函数
/*    group_signal(data, key) {
      return data.reduce(function (prev, cur) {
        (prev[cur[key]] = prev[cur[key]] || []).push(cur);
        return prev;
      }, {});
    },*/
    //列表按照年份分组
/*    groupBy() {
      if (this.pubList.length > 0) {
        this.pubList.splice(0, this.pubList);
      }
      this.pubList = this.group_signal(this.filterList, "year");
      // console.log(this.pubList)
    },*/
    //年份分组排序
/*    sortYear() {
      if (this.yearList.length > 0) {
        this.yearList.splice(0, this.yearList.length);
      }
      let yearArr = [];
      let length = this.filterList.length;
      for (let i = 0; i < length; i++) {
        // console.log(this.waitList[i].type)
        if (yearArr.indexOf(this.filterList[i].year) == -1) {
          yearArr.push(this.filterList[i].year);
        }
      }
      yearArr = yearArr.sort(function (a, b) {
        return b - a;
      });
      this.yearList = yearArr;
      // console.log(this.yearList)
    },*/
    //列表调用
    pubSort() {
      this.groupBy();
      this.sortYear();
      this.dataFlag = true
      this.loadFlag = false
    },
    //修改折叠面板标记
    changeFalg() {
      if (this.flag === '-')
        this.flag = '+';
      else
        this.flag = '-';
    },
    //细化列表标记
    changeRefineFalg() {
      if (this.flagRefine === '-')
        this.flagRefine = '+';
      else
        this.flagRefine = '-';
    },

    //type列表处理函数
    handleCheckAllChange() {
      this.typeList = (this.typeNameList || []).map(function (item) {
        return item.label;
      })
      // this.setTypeArray()
    },
    //type列表清空
    handleDeleteAllChange() {
      this.typeList = [];
      // this.setTypeArray()
    },
    //获取type选项参数
    getTypeData() {
      let data = this.waitList;
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
    mouseAutEnter(index) {
      if (this.authorList[index].img === "el-icon-circle-plus")
        this.authorList[index].show = true;
    },
    //鼠标移出
    mouseAutLeave(index) {
      if (this.authorList[index].img === "el-icon-circle-plus")
        this.authorList[index].show = false;
    },
    //作者选中
    addAuthorToInput(index) {
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
    },


    //会议方法
    getVenueData() {
      this.venLoadFlag = true;
      let cont = 0;
      this.venArrCount = 0;

      let data = this.filterList;
      let arr = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].journal != null) {
          arr.push({_VALUE: data[i].journal});
        } else {
          arr.push({_VALUE: data[i].booktitle});
        }
      }
      let sort = this.group_signal(arr, "_VALUE");
      let arrlist = [];

      for (let item in sort) {
        arrlist.push({venue: item, num: sort[item].length})
      }

      this.venTestList = arrlist.map(function (item) {
        return {
          "_VALUE": item.venue,
          "img": "el-icon-circle-plus",
          "index": cont++,
          "show": false,
          "num": item.num
        };
      })

      this.venTestList = this.venTestList.sort(function (a, b) {
        return b.num - a.num;
      })

      for (let i = 0; i < this.venTestList.length; i++) {
        if (this.filterObj.venue == '')
          break;
        else {
          if (this.filterObj.venue == this.venTestList[i]._VALUE) {
            this.venTestList[i].show = true;
            this.venTestList[i].img = "el-icon-remove";
          }
        }
      }

      if (this.venArrCount + 10 <= this.venTestList.length) {
        this.venueList = this.venTestList.slice(this.venArrCount, this.venArrCount + 10);
        this.venArrCount += 10;
      } else {
        this.venueList = this.venTestList.slice(this.venArrCount);
        this.venArrCount += this.venTestList.length;
      }

      this.venSqlSize = this.venTestList.length;


      this.venNumCount = cont
      this.venLoadFlag = false;
    },
    //会议获得更多
    getMoreVenData() {
      this.venLoadFlag = true;

      if (this.venArrCount + 10 < this.venTestList.length) {
        this.venueList = this.venueList.concat(this.venTestList.slice(this.venArrCount, this.venArrCount + 10));
        this.venArrCount += 10;
      } else {
        this.venueList = this.venTestList;
        this.venArrCount += this.venTestList.length;
      }
      // console.log(this.venTestList)
      this.venLoadFlag = false;
    },
    //会议鼠标移入
    mouseVenEnter(index) {
      if (this.venueList[index].img === "el-icon-circle-plus")
        this.venueList[index].show = true;
    },
    //会议鼠标移出
    mouseVenLeave(index) {

      if (this.venueList[index].img === "el-icon-circle-plus")
        this.venueList[index].show = false;
    },
    //会议选中
    addVenToInput(index) {
      if (this.venueList[index].img === "el-icon-circle-plus") {
        this.venueList[index].show = true;
        this.venueList[index].img = "el-icon-remove";

        let temp = this.venueList[index];
        this.filterObj.venue = temp._VALUE
        this.venueList = []
        this.venueList.push(temp)

      } else {
        this.venueList[index].show = false;
        this.venueList[index].img = "el-icon-circle-plus";

        this.filterObj.venue = '';
        this.venNumCount = 0;
        this.venArrCount = 0;
        this.getVenueData()
      }

      this.filterObj.flag = true;
    },
    //数量格式化
    toThousands(num) {
      num = (num || 0).toString();
      let result = '';
      while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
      }
      if (num) {
        result = num + result;
      }
      return result;
    },


    //类型转换处理
    changeType() {
      let len = this.waitList.length;
      for (let i = 0; i < len; i++) {
        switch (this.waitList[i].type) {
          case "inproceedings":
            this.waitList[i].type = 'Conference and Workshop Papers';
            break;
          case "book and thesis":
            this.waitList[i].type = 'Book and Theses';
            break;
          case 'series':
            this.waitList[i].type = 'Book and Theses';
            break;
          case 'proceedings':
            this.waitList[i].type = 'Editorshop';
            break;
          case "informal":
            this.waitList[i].type = 'Informal Publications';
            break;
          case "incollection":
            this.waitList[i].type = 'Parts in Books or Collections';
            break;
          case "journals article":
            this.waitList[i].type = 'Journals Article';
            break;
          case  "reference":
            this.waitList[i].type = 'Reference Works';
            break;
          case "withdrawn":
            this.waitList[i].type = 'Withdrawn Item';
            break;
        }
      }
    },
    //过滤函数
    listFilter() {
      //会议过滤
      let venArr = [];
      let ven = this.filterObj.venue;
      let len = this.waitList.length
      for (let i = 0; i < len; i++) {
        if (ven === '') {
          venArr = this.waitList;
          break;
        } else {
          if (ven == this.waitList[i].journal || ven == this.waitList[i].booktitle) {
            // console.log(this.waitList[i].booktitle)
            venArr.push(this.waitList[i])
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
    getData() {
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
        this.getData()

      }

    },

    name: function () {
      this.author = this.name;
      this.getPubData()
    }


  },

  computed: {},

  props: ['name'],

  mounted() {
    // this.getPubData();
    this.author = this.name;
    this.getPubData()
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
