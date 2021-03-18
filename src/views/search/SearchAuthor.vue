<template>
  <div>
    <el-header style="padding: 0">
      <PageHeader head-name="搜索作者"/>
    </el-header>
    <div>
      <div class="infoMatch">总共匹配到{{ total }}条记录</div>
      <div class="infoMatch">已经显示{{ authorList.length }}条记录</div>
      <AuthorList v-loading="loadFlag.author"
                  :author-list="authorList"/>
    </div>
    <!--        作者搜索结果-->
    <!--       <AuthorSearchResult v-if="activeShow" :search-author="true"></AuthorSearchResult>-->
    <!--        <SearchRule v-else ></SearchRule>-->
  </div>
</template>

<script>
import AuthorList from "../../components/searchResult/AuthorList";
import PageHeader from "@/views/search/PageHeader";
import axios from "axios";
import _ from "lodash";

export default {
  name: "SearchAuthor",
  components: {PageHeader, AuthorList},
  data: function () {
    return {
      total: 0,
      authorListTemp: [],
      loadFlag: {
        author: true
      }
    }
  },

  methods: {
    initialize(qObj) {
      // console.log(qObj)
      this.getList(qObj)

    },
    getList(inputObj) {

      let qObj = {
        authorRegex: inputObj.queryValue,
        size: 500
      }
      //加载状态开关
      this.loadFlag.author = true;
      // this.loadFlag.author = true;
      // this.loadFlag.year = true;
      // this.loadFlag.venue = true;
      // this.loadFlag.type = true;
      // console.log(qObjWrapper(qObj));
      axios.get(this.$store.state.host + "/authorses/search/findAllBy_VALUEContainingIgnoreCase", {
        params: qObj
      }).then(res => {
        // 加载状态开关
        this.loadFlag.author = false;


        this.total = res.data.page.totalElements
        if (_(res.data).has("_embedded.authorses")) {
          this.authorListTemp = res.data._embedded.authorses.map(it => it);
        } else {
          this.authorListTemp = null;
        }
        // console.log(this.authorListTemp)

      }).catch(error => {
        console.log(error);
      })

    },
  },

  computed: {
    authorList() {
      return this.authorListTemp
    }
  },
  watch: {
    '$store.state.authorQueryObj': function (newValue) {
      this.initialize(newValue)
    },

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
  },
  mounted() {
    this.initialize(this.$store.state.authorQueryObj)
  }
}
</script>

<style scoped>
@import "../../style/public.css";

</style>
