<template>
  <el-container>
    <el-header>
      <PageHeader head-name="搜索作者"/>
    </el-header>

    <!--        作者搜索结果-->
    <AuthorSearchResult></AuthorSearchResult>
    <!--       <AuthorSearchResult v-if="activeShow" :search-author="true"></AuthorSearchResult>-->
    <!--        <SearchRule v-else ></SearchRule>-->
  </el-container>
</template>

<script>
import AuthorSearchResult from "../../components/searchResult/AuthorSearchResult";
import PageHeader from "@/views/search/PageHeader";
import axios from "axios";
import _ from "lodash";

export default {
  name: "SearchAuthor",
  components: {PageHeader, AuthorSearchResult},
  data: function () {
    return {
      total: 30,
      authorListTemp: [],
    }
  },

  methods: {
    initialize(qObj) {
      // console.log(qObj)
      this.getList(qObj)

    },
    getList(inputObj) {

      let qObj = {
        authorRegex: inputObj.queryValue
      }
      //加载状态开关
      // this.loadFlag.publication = true;
      // this.loadFlag.author = true;
      // this.loadFlag.year = true;
      // this.loadFlag.venue = true;
      // this.loadFlag.type = true;
      // console.log(qObjWrapper(qObj));
      axios.get(this.$store.state.host + "/authorses/search/findAllBy_VALUEContainingIgnoreCase", {
        params: qObj
      }).then(res => {
        //加载状态开关
        // this.loadFlag.publication = false;


        this.total = res.data.page.totalElements
        if (_(res.data).has("_embedded.authorses")) {
          this.authorListTemp = res.data._embedded.authorses.map(it => it);
        } else {
          this.authorListTemp = null;
        }
        console.log(this.authorListTemp)

      }).catch(error => {
        console.log(error);
      })

    },
  },

  watch: {
    '$store.state.authorQueryObj': function (newValue) {
      this.initialize(newValue)
    },
    mounted() {
      this.initialize(this.$store.state.authorQueryObj)
    }
    /*  mounted() {
        if (this.$route.query.autName != null) {
          // this.searchName = this.$route.query.autName;
          // console.log(this.activeShow)
          this.activeShow = true;
        }
      },*/

    /*  created() {
        this.$store.commit("incrementRadio", {newLabel: 1});
        if (this.$store.state.inputData != null) {
          this.activeShow = true
        }
      }*/
  }
}
</script>

<style scoped>
@import "../../style/public.css";

</style>
