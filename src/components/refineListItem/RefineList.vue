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
        <el-button class="authorButton"
            type="text"
            size="small"
            @click="itemClickCallback(item,index)"
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
  watch: {
    'list'() {
      this.limit = this.limitInit
    }
  }
}
</script>
