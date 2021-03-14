<template>
  <div class="refine-by">
    <p><b>{{ showName }}</b></p>
    <!--空提示-->
    <ul v-if="list.length <= 0" class="putList">
      <li>结果为空</li>
    </ul>
    <!--细化列表-->
    <ul v-else>
      <li v-for="(item,index) in list.slice(0, limit)"
          :key="index">
        <i></i>
        <el-button
            :class="['authorButton' ,item.isSelected ? 'el-icon-circle-check' : '']"
                   type="text"
                   size="small"
                   @click="itemClick(item,index)"
                   style="padding: 0">
<!--          <i v-if="item.isSelected" class="el-icon-circle-check"/>-->
          {{ itemShowFunction(item) }}
        </el-button>
        <!--        <el-button v-show="item.isSelected"
                           class="authorButton"
                           type="text"
                           size="small"
                           @click="itemClick(item,index)"
                           style="padding: 0">
                  {{ itemShowFunction(item) }}
                </el-button>-->
      </li>
      <el-button
          v-if="list.length - limit > 0"
          type="text"
          @click="more(10)"
          size="small">
        更多({{ list.length - limit }})
      </el-button>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'RefineList',
  data: function () {
    return {
      limit: 0,
    }
  },
  methods: {
    itemClick(item, index) {
      let it = item
      it.isSelected = !it.isSelected
      this.$set(this.list, index, it)
      // this.list = l;
      // this.list.reverse()
      // this.list.reverse()
      if (this.itemClickCallback != null) {
        this.itemClickCallback(item, index);
      }
    },
    more(num) {
      this.limit += num;
    }
  },
  props: {
    showName: String,
    // loading: Boolean,
    itemShowFunction: Function,
    itemClickCallback: Function,
    list: Array,
    limitInit: Number
  },
  computed: {
    listToShow() {
      return this.list.map(it => {
        let t = it;
        t.isSelected = false;
        return t;
      });
    }
  },
  watch: {
    'list'() {
      this.limit = this.limitInit
    }
  }
}
</script>
