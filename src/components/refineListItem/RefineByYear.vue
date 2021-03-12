<template>
  <el-main style="padding: 0">
    <div class="refine-by">
      <p><b>按照年份细化</b></p>
      <ul v-if="yearList.length <= 0" class="putList">
        <li>结果为空</li>
      </ul>
      <ul v-else>
        <!--                年份列表-->
        <li v-for="item in yearList.slice(0, limit)" :key="item._VALUE">
          <el-button type="text"
                     size="small"
                     @click="addYearToInput(item._VALUE)"
                     style="padding: 0">
            {{ item._VALUE }}({{ item.num }})
          </el-button>
        </li>
        <el-button
            v-if="yearList.length - limit > 0"
            type="text"
            @click="load(10)"
            size="small">
          更多({{ yearList.length - limit }})
        </el-button>
      </ul>
    </div>
  </el-main>
</template>

<script>

export default {
  name: "RefineByYear",

  data: function () {
    return {
      limit: 10
    }
  },

  methods: {
    //显示更多结果
    addYearToInput(value) {
      console.log("addYearToInput " + value);
    },
    load(num) {
      this.limit += num
    }
  },
  watch: {
    "yearList": function () {
      this.limit = 10;
    },
  },
  computed: {
    yearList() {
      return this.$store.state.yearRefineList
          .map(item => {
            return {
              "_VALUE": item.first,
              "num": item.second,
            };
          })
          .sort((l, r) => l._VALUE - r._VALUE)
          .reverse()
    },
  },
}
</script>

<style scoped>
@import "../../style/public.css";

</style>
