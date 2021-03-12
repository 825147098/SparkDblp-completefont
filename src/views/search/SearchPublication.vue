<template>
  <el-container>
    <el-header class="header">
      <h1 class="headline">出版物</h1>
    </el-header>
    <el-container>
      <!--            出版物搜索结果-->
      <CompleteResult></CompleteResult>
      <ComRefineList></ComRefineList>
    </el-container>
  </el-container>
</template>

<script>
import CompleteResult from "../../components/searchResult/CompleteResult";
import ComRefineList from "../../components/refineList/ComRefineList";
import SearchRule from "./SearchRule";

export default {
  name: "SearchPublication",
  // eslint-disable-next-line vue/no-unused-components
  components: {SearchRule, ComRefineList, CompleteResult},

  data: function () {
    return {
      activeShow: false,
    }
  },

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
  }
}
</script>

<style scoped>
@import "../../style/public.css";

</style>
