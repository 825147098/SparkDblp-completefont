<template>
  <el-container>
    <el-header class="header">
      <PageHeader head-name="出版物"/>
    </el-header>
    <el-container v-loading="loadFlag.publication">
      <!--出版物搜索结果-->
      <el-main>
        <PublicationList :plist="pubList" :total="total"/>
        <el-button
            v-if="total - size > 0"
            type="text"
            @click="appendList(30)"
            size="medium">
          更多({{ total - size }})
        </el-button>
      </el-main>
      <el-aside>
        <RefineList show-name="按照作者细化"
                    :item-show-function="it=>`${it._VALUE}(${it.num})`"
                    :limit-init="10"
                    v-loading="loadFlag.author"
                    :list="authorList"/>
        <!--类型细化-->
        <RefineList show-name="按照类型细化"
                    :item-show-function="it=>`${it.show}(${it.num})`"
                    :limit-init="10"
                    v-loading="loadFlag.type"
                    :list="typeList"/>
        <!--年份细化-->
        <RefineList show-name="按照年份细化"
                    :item-show-function="it=>`${it._VALUE}(${it.num})`"
                    :limit-init="10"
                    v-loading="loadFlag.year"
                    :list="yearList"/>
        <!--会议细化-->
        <RefineList show-name="按照会议细化"
                    :item-show-function="it=>`${it.prefix2 ? it.prefix2 : it._VALUE}(${it.num})`"
                    :limit-init="10"
                    v-loading="loadFlag.venue"
                    :list="venueList"/>
        <!--        <ComRefineList/>-->
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import ComRefineList from "../../components/refineList/ComRefineList";
import PublicationList from "@/components/searchResult/PublicationList";
import _ from "lodash";
import PageHeader from "@/views/search/PageHeader";
import RefineList from "@/components/refineListItem/RefineList";
import axios from "axios";

let typeMap = new Map([
  ["inproceedings", 'Conference and Workshop Papers'],
  ["inproceedings", 'Conference and Workshop Papers'],
  ["conference and workshop", 'Conference and Workshop Papers'],
  ["book and thesis", 'Book and Theses'],
  ['series', 'Book and Theses'],
  ['proceedings', 'Editorshop'],
  ["informal", 'Informal Publications'],
  ["incollection", 'Parts in Books or Collections'],
  ["journals article", 'Journals Article'],
  ["reference", 'Reference Works'],
  ["withdrawn", 'Withdrawn Item']
])
export default {
  name: "SearchPublication",
  // eslint-disable-next-line vue/no-unused-components
  components: {PageHeader, PublicationList, ComRefineList, RefineList},

  data: function () {
    return {
      authorListTemp: [],
      typeListTemp: [],
      yearListTemp: [],
      venueListTemp: [],
      pubListTemp: [],
      total: 0,
      size: 30,
      loadFlag: {
        publication: true,
        author: true,
        year: true,
        type: true,
        venue: true
      }
    }
  },
  methods: {
    initialize(qObj) {
      this.getList(qObj);
      this.size = 30;
    },
    getList(qObj) {
      let getRefineList = (qObj, url) => axios
          .get(this.$store.state.host + url, {
            params: qObj
          })
          .catch(error => {
            console.log(error)
          })
      /* qObj={
         title:'',
         filter: ''
       }*/
      this.loadFlag.publication = true;
      this.loadFlag.author = true;
      this.loadFlag.year = true;
      this.loadFlag.venue = true;
      this.loadFlag.type = true;
      axios.get(this.$store.state.host + "/onlyDocs/search/findAllByRSQL", {
        params: qObj
      }).then(res => {

        this.loadFlag.publication = false;
        //refineList

        getRefineList(qObj, "/onlyDocs/search/findAuthorRefineByRSQL")
            .then(res => {
              this.authorListTemp = res.data
              this.loadFlag.author = false;
            });


        getRefineList(qObj, "/onlyDocs/search/findYearRefineByRSQL")
            .then(res => {
              this.yearListTemp = res.data
              this.loadFlag.year = false;
            });


        getRefineList(qObj, "/onlyDocs/search/findPrefix2RefineByRSQL")
            .then(res => {
              this.venueListTemp = res.data
              this.loadFlag.venue = false;
            });

        getRefineList(qObj, "/onlyDocs/search/findTypeRefineByRSQL")
            .then(res => {
              this.typeListTemp = res.data
              this.loadFlag.type = false;
            });

        this.total = res.data.page.totalElements
        this.pubListTemp = res.data._embedded.onlyDocs.map(it => {
          let t = it
          t.type = typeMap.get(it.type)
          return t
        })
      }).catch(error => {
        console.log(error);
      })

    },
    appendList(size) {
      let qObj = this.$store.state.queryObj;
      this.size += size;
      qObj.size = this.size

      this.loadFlag.publication = true;
      axios.get(this.$store.state.host + "/onlyDocs/search/findAllByRSQL", {
        params: qObj
      }).then(res => {

        this.loadFlag.publication = false;
        this.total = res.data.page.totalElements
        this.pubListTemp = res.data._embedded.onlyDocs.map(it => {
          let t = it
          t.type = typeMap.get(it.type)
          return t
        })
      }).catch(error => {
        console.log(error);
      })
    }
  },
  computed: {
    authorList() {
      return this.authorListTemp
          .map(item => {
            return {
              "_VALUE": item.first,
              "num": item.second,
            };
          })
          .sort((l, r) => l.num - r.num)
          .reverse()
    },
    typeList() {
      let typeMap = new Map([
        ["inproceedings", 'Conference and Workshop Papers'],
        ["inproceedings", 'Conference and Workshop Papers'],
        ["conference and workshop", 'Conference and Workshop Papers'],
        ["book and thesis", 'Book and Theses'],
        ['series', 'Book and Theses'],
        ['proceedings', 'Editorshop'],
        ["informal", 'Informal Publications'],
        ["incollection", 'Parts in Books or Collections'],
        ["journals article", 'Journals Article'],
        ["reference", 'Reference Works'],
        ["withdrawn", 'Withdrawn Item']
      ])
      return this.typeListTemp
          .map(item => {
            return {
              "_VALUE": item.first,
              "num": item.second,
              "show": typeMap.get(item.first),
            };
          })
          .sort((l, r) => l.num - r.num)
          .reverse()
    },
    yearList() {
      return this.yearListTemp
          .map(item => {
            return {
              "_VALUE": item.first,
              "num": item.second,
            };
          })
          .sort((l, r) => l._VALUE - r._VALUE)
          .reverse()
    },
    venueList() {
      return this.venueListTemp
          .map(item => {
            return {
              "_VALUE": item.first,
              "prefix2": item.second.first,
              "num": item.second.second,
            };
          })
          .sort((l, r) => l.num - r.num)
          .reverse()
    },
    pubList() {
      let t = this.pubListTemp;
      //加个负号是为了方便排序，显示的时候记得去掉
      return _.groupBy(t, it => -it.year)
    }
  },
  watch: {
    '$store.state.queryObj': function (newValue) {
      this.initialize(newValue)
    }

  },
  created() {
    this.initialize(this.$store.state.queryObj)
  }
}
</script>

