<template>
  <el-container>
    <el-header class="header">
      <h1 class="headline">搜索 Spark Dblp</h1>
    </el-header>
    <el-main style="background-color:aliceblue;">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadClass">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>搜索</el-breadcrumb-item>
      </el-breadcrumb>
      <header class="head-hide">
        <h3>
          <el-button size="mini"
                     @click="changeFalg"
                     type="text">
            [{{ flag }}]
          </el-button>
          请输入搜索查询
        </h3>
      </header>
      <!--            手风琴模式的搜索规则-->
      <el-collapse v-model="activeName"
                   accordion>
        <el-collapse-item
            name="1">
          <RuleCom></RuleCom>
        </el-collapse-item>
      </el-collapse>
    </el-main>
  </el-container>
</template>

<script>
import RuleCom from "../../components/RuleCom";

export default {
  name: "searchRule",
  components: {RuleCom},
  data: function () {
    return {
      activeName: '1',
      flag: '-',
    }
  },

  props: {
    titleShow: Boolean,
  },
  methods: {
    //修改手风琴标记
    changeFalg() {
      if (this.flag == '-')
        this.flag = '+';
      else
        this.flag = '-';
    },
  },

  watch: {
    //监视标记,手风琴标记为string格式
    flag: function () {
      switch (this.flag) {
        case '+':
          this.activeName = "0";
          break;
        case'-':
          this.activeName = "1";
          break;
      }
    },
  },
}
</script>

<style scoped>
@import "../../style/public.css";

ul {
  list-style: none;
}

</style>
