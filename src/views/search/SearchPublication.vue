<template>
  <el-container>
    <el-header class="header">
      <PageHeader head-name="出版物"/>
    </el-header>
    <el-container>
      <!--出版物搜索结果-->
      <PublicationList :plist="pubList"/>
      <el-aside>
        <ComRefineList/>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import ComRefineList from "../../components/refineList/ComRefineList";
import PublicationList from "@/components/searchResult/PublicationList";
import _ from "lodash";
import PageHeader from "@/views/search/PageHeader";

export default {
  name: "SearchPublication",
  components: {PageHeader, PublicationList, ComRefineList},

  data: function () {
    return {
      activeShow: false,
    }
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
  /*
    watch: {
      '$store.state.inputfalg': function () {
        // console.log(this.$store.state)
        if (this.$store.state.inputfalg && this.$store.state.radioLabel === 3) {
          this.activeShow = true;
          // console.log(this.$store.state)
        }

      },

    },

    created() {
      this.activeShow = this.$store.state.inputfalg
      this.$store.commit("incrementRadio", {newLabel: 3});
      if (this.$store.state.inputData != null) {
        this.activeShow = true
      }
    }*/
}
</script>

