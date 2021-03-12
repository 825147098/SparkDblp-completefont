<template>
  <el-main style="padding: 0">
    <div class="refine-by">
      <p><b>按照会议细化</b></p>
      <!--           null结果-->
      <ul v-if="venueList.length <= 0" class="putList">
        <li>结果为空</li>
      </ul>
      <ul v-else>
        <!--                会议列表-->
        <!-- {
         "_VALUE": item.first,
         "prefix2": item.second.first,
         "num": item.second.second,
          }
        -->
        <li v-for="item in venueList.slice(0, limit)"
            :key="item._VALUE">
          <el-tooltip effect="dark" :content="item._VALUE" placement="left">
            <el-button type="text"
                       size="small"
                       @click="addVenueToInput(item._VALUE)"
                       style="padding: 0">
              {{ item.prefix2 ? item.prefix2 : item._VALUE }}({{ item.num }})
            </el-button>
          </el-tooltip>
        </li>
        <el-button
            v-if="venueList.length - limit > 0"
            type="text"
            @click="load(10)"
            size="small">
          更多({{ venueList.length - limit }})
        </el-button>
      </ul>

    </div>
  </el-main>
</template>

<script>

export default {
  name: "RefineByVenue",

  data: function () {
    return {
      limit: 10
    }
  },

  methods: {
    //选中添加
    /*    addVenToInput(index) {
          if (this.venueList[index].img === "el-icon-circle-plus") {
            this.venueList[index].show = true;
            this.venueList[index].img = "el-icon-remove";
            this.$store.commit("incrementVenue", {newVenue: this.venueList[index].venue});

            // let temp = this.venueList[index];
            // // this.venueList = []
            // this.venueList.push(temp)
          } else {
            this.venueList[index].show = false;
            this.venueList[index].img = "el-icon-circle-plus";
            this.$store.commit("incrementCleanVenue")
            // this.getVenueData()
          }
        },*/
    addVenueToInput(value) {
      console.log("addVenueToInput " + value);
    },
    load(num) {
      this.limit += num
    }
  },

  watch: {
    "venueList": function () {
      this.limit = 10;
    },
  },
  computed: {
    venueList() {
      return this.$store.state.venueRefineList
          .map(item => {
            return {
              "_VALUE": item.first,
              "prefix2": item.second.first,
              "num": item.second.second,
            };
          })
          .sort((l, r) => l.num - r.num)
          .reverse()
    }
  }
}
</script>

<style scoped>
@import "../../style/public.css";
</style>

