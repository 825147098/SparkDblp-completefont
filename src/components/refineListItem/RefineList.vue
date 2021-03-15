<template>
  <div v-if="list.length > 0"
       class="refine-by">
    <p><b>{{ showName }}</b></p>
    <ul>
      <li v-for="(item,index) in list.slice(0, limit)"
          :key="index">
        <el-button
            class="authorButton"
            type="text"
            size="small"
            @click="itemClick(item,index)"
            style="padding: 0">
          {{ itemShowFunction(item) }}
        </el-button>
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
      //更新数组元素的操作是无法背监控的，需要强制刷新

      if (this.itemClickCallback != null) {
        this.itemClickCallback(item, index);
      }
      this.$forceUpdate();
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
  computed: {},
  watch: {
    'list'() {
      this.limit = this.limitInit
    }
  }
}
</script>
