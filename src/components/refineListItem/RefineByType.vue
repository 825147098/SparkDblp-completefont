<template>
  <el-main style="padding: 0;">
    <div class="refine-by" style="padding: 0">
      <p><b>按照类型细化</b></p>
      <ul v-if="typeList.length <= 0" class="putList">
        <li>结果为空</li>
      </ul>
      <ul v-else>
        <!--                列表类型显示//只显示返回数据类型-->
        <li v-for="item in typeList.slice(0,limit)"
            :key="item.type">
          <el-button type="text"
                     size="small"
                     @click="addTypeToInput(index)"
                     style="padding: 0">
            {{ item.show }}({{ item.num }})
          </el-button>
        </li>
        <el-button
            v-if="typeList.length - limit > 0"
            type="text"
            @click="load(10)"
            size="small">
          更多({{ typeList.length - limit }})
        </el-button>
      </ul>
    </div>
  </el-main>
</template>

<script>

export default {
  name: "RefineByType",
  data: function () {
    return {
      limit: 10
    }
  },
  methods: {
    addTypeToInput(value) {
      console.log("addTypeToInput " + value);
    },
    load(num) {
      this.limit += num
    }
  },
  watch: {
    "typeList": function () {
      this.limit = 10;
    },
  },
  computed: {
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
      return this.$store.state.typeRefineList
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
  }
}
</script>

<style scoped>
@import "../../style/public.css";


</style>

