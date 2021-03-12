<template>
  <el-main style="padding: 0">
    <div class="refine-by">
      <p><b>按照作者细化</b></p>
      <ul v-if="authorList.length <= 0" class="putList">
        <li>结果为空</li>
      </ul>
      <!--                作者名单-->
      <ul v-else>
        <li v-for="item in authorList.slice(0, limit)"
            :key="item._VALUE">
          <el-button type="text"
                     size="small"
                     @click="addAuthorToInput(item._VALUE)"
                     style="padding: 0">
            {{ item._VALUE }}({{ item.num }})
          </el-button>
        </li>
        <el-button
            v-if="authorList.length - limit > 0"
            type="text"
            @click="load(10)"
            size="small">
          更多({{ authorList.length - limit }})
        </el-button>
      </ul>

      <!--            加载图标-->
      <!--      <ul v-show="loadFlag">
              <li>
                <el-icon class="el-icon-loading"
                         style="font-size: 20px "
                ></el-icon>
              </li>
            </ul>-->
      <!--            更多按钮-->
      <!--            null标识-->


    </div>
  </el-main>
</template>

<script>

export default {
  name: "RefineByAuthor",
  data: function () {
    return {
      limit: 10,
    }
  },
  methods: {
    //选中函数
    /*    addAuthorToInput(index) {
          if (this.authorList[index].img === "el-icon-circle-plus") {
            this.authorList[index].show = true;
            this.authorList[index].img = "el-icon-remove"
            this.$store.commit("incrementAuthor", {newAuthor: this.authorList[index]._VALUE})
            // console.log(this.$store.state)

          } else {
            this.authorList[index].show = false;
            this.authorList[index].img = "el-icon-circle-plus";
            this.$store.commit("incrementCleanAuthor", {moveAuthor: this.authorList[index]._VALUE})
          }
        },  */
    addAuthorToInput(value) {
      console.log("addAuthorToInput " + value);
    },
    load(num) {
      this.limit += num
    }
  },
  watch: {
    "authorList": function () {
      this.limit = 10;
    },
  },
  computed: {
    authorList() {
      return this.$store.state.authorRefineList
          .map(item => {
            return {
              "_VALUE": item.first,
              "num": item.second,
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
