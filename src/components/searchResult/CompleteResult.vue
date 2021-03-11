<template>
  <!--    组合搜索结果-->
  <el-main style="padding-top: 0; max-width: 850px">
    <el-collapse v-model="activeName" accordion @change="changeFalg">
      <el-collapse-item name="1">
        <template slot="title" class="head-hide">
          [{{ flag }}] 出版物搜索结果
        </template>
        <!--        <p v-show="dataFlag"
                   class="infoMatch">
                  匹配到{{ pageDetail.totalElements }}条结果
                </p>-->
        <!--                出版物列表-->
        <div class="putList"
             v-for="(value,year,index) in pubList"
             :key="index">
          <li class="year">{{ -year }}</li>
          <li v-for="item in value" :key="JSON.stringify(item)">
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

        </div>
        <!--                加载图标-->
        <ul v-show="loadFlag"
            class="putList">
          <li style="color: #409EFF">
            Loading
            <el-icon class="el-icon-loading"
                     style="font-size: 20px "
            ></el-icon>
          </li>
        </ul>
        <!--                加载按钮-->
        <ul v-show="!loadFlag && this.page < this.pageDetail.totalPages - 1"
            class="putList">
          <li style="width: 100%">
            <el-button type="text" @click="load" style="float: left">
              点击获取更多
              <img src="https://dblp.uni-trier.de/img/waiting.anim.gif" alt="">
            </el-button>
            <div style="display: inline; float: right">
              当前页码：{{ page + 1 }} / {{ this.pageDetail.totalPages }}
            </div>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </el-main>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import BookAndTheseItem from "../bookTypeItem/BookAndTheseItem";
import ConfAndWorkItem from "../bookTypeItem/ConfAndWorkItem";
import EditorShipItem from "../bookTypeItem/EditorShipItem";
import InformalPubItem from "../bookTypeItem/InformalPubItem";
import JournalItem from "../bookTypeItem/JournalItem";
import ReferenceWorkItem from "../bookTypeItem/ReferenceWorkItem";
import WithdrawnItem from "../bookTypeItem/WithdrawnItem";
import PartInBookOrCollItem from "../bookTypeItem/PartInBookOrCollItem";
//onlydoc.type的映射规则
// eslint-disable-next-line no-unused-vars
/*let typeMap = new Map([
  ["inproceedings", 'Conference and Workshop Papers'],
  ["inproceedings", 'Conference and Workshop Papers'],
  ["book and thesis", 'Book and Theses'],
  ['series', 'Book and Theses'],
  ['proceedings', 'Editorshop'],
  ["informal", 'Informal Publications'],
  ["incollection", 'Parts in Books or Collections'],
  ["journals article", 'Journals Article'],
  ["reference", 'Reference Works'],
  ["withdrawn", 'Withdrawn Item']
])*/
import _ from 'lodash'
// let Array = import('lodash/array');
export default {
  name: "CompleteResult",
  components: {
    WithdrawnItem,
    ReferenceWorkItem,
    PartInBookOrCollItem,
    JournalItem,
    InformalPubItem,
    EditorShipItem,
    ConfAndWorkItem,
    BookAndTheseItem
  },
  data: function () {
    return {
      /*queryObj: {
        title: '',
        filter: ''
      },*/
      title: '',
      page: 0,
      size: '',
      pageDetail: {},

      flag: '-',
      activeName: '1',
      loadFlag: true,
      dataFlag: false,

      // pubList: [],
      // waitList: [],
      // yearList: [],

      parmasObj: {},
      parmasFlag: false
    }
  },


  methods: {
    //修改折叠板标记
    changeFalg() {
      if (this.flag === '-')
        this.flag = '+';
      else
        this.flag = '-';
    },
    //获得更多的加载函数
    load() {
      console.log("已废弃的函数load的引用");
    },

    /*    load() {
          if (this.dataFlag) {
            this.loadFlag = true;
            setTimeout(() => {
              this.page++;
              if (this.page > this.pageDetail.totalPages) {
                this.$alert('没有下一页了', '温馨提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$message({
                      type: 'info',
                      message: `action: ${action}`
                    });
                  }
                });
              }
              this.checkFlag();
              if (this.parmasFlag) {
                this.setParams();
                axios.get(this.$store.state.host + "/onlyDoc/findAllByText", {
                  params: this.paramsObj
                }).then(res => {

                  let newList = res.data._embedded.onlyDocs
                      .map(it => {
                        let t = it
                        t.type = typeMap.get(it.type)
                        return t
                      });
                  this.waitList = this.waitList.concat(newList);


                  this.pubSort()

                  this.loadFlag = false;
                  console.log(1)

                  // this.$store.commit("incrementCleanFlag", {flag: "conflag"})
                  // this.$store.commit("incrementCleanInputFlag");
                }).catch(error => {
                  console.log(error);
                })
              } else {
                axios.get(this.$store.state.host + "/onlyDocs/search/findAllByText", {
                  params: {
                    title: this.title,
                    page: this.page
                  }
                }).then(res => {
                  let newList = res.data._embedded.onlyDocs
                      .map(it => {
                        let t = it
                        t.type = typeMap.get(it.type)
                        return t
                      });
                  this.waitList = this.waitList.concat(newList);
                  this.pubSort();
                  this.loadFlag = false;

                  // this.$store.commit("incrementCleanFlag", {flag: "conflag"})
                  // this.$store.commit("incrementCleanInputFlag");
                }).catch(error => {
                  console.log(error);
                })
              }
            }, 2000)
          }
        },*/


    changeType() {
      console.log("发生已废弃的changeType的引用")
    },

  },

  computed: {
    pubList() {
      let t = this.$store.state.returnList;
      /*let sorted = t.sort((it1, it2) => {
        let year1 = it1.year
        let year2 = it2.year
        if (year1 == null) year1 = 0;
        if (year2 == null) year1 = 0;
        return year2 - year1
        // return year1 - year2
      })
*/
      //加个负号是为了方便排序，显示的时候记得去掉
      return _.groupBy(t, it => -it.year)
    }
  },
  /*  watch: {
      "$store.state.returnList"(newVal, oldVal) {
        console.log(newVal);
        console.log(oldVal);
        this.waitList = this.$store.state.returnList
        // let sorted = this.sortByYear(this.waitList);
        // this.pubList = this.groupByYear(sorted);
        // console.log(this.pubList);
      }
    },*/
  /*
    mounted() {
      this.title = this.$store.state.serchObj.title;
      if (this.parmasFlag)
        this.getFilPubData()
      else
        this.getPubData()
    }*/
}
</script>

<style scoped>
@import "../../style/public.css";

.year {
  font-size: small;
  font-weight: 800;
}

</style>
