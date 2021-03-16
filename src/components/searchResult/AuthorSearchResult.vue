<!--作者搜索结果-->
<template>
  <div class="body" style="display: flex;align-items:start;flex-direction: column">
    <div v-for="it in authorList"
         :key="it._VALUE"
         style="margin-left: 5%">
      <el-button type="text" size="medium">
        <router-link :to="{path:'/resAut',query:{autName:it._VALUE}}"
                     target="_blank"
                     class="name">
          <el-tooltip class="item" effect="dark" :content=it._orcid placement="bottom-end"
                      v-if="it._orcid != null">
            <i class="el-icon-user-solid"/>
          </el-tooltip>
          {{ it._VALUE }}
          <!--            <p class="mark" v-html="getMatch(it._VALUE)">{{ getMatch(it._VALUE) }}</p>-->
        </router-link>
      </el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "AuthorList",
  data: function () {
    return {}
  },

  methods: {},

  props: {
    searchAuthor: Boolean,
    authorList: Array
  },

  watch: {
    //监控搜索标记


  }
}
</script>

<style scoped>
@import "../../style/public.css";

</style>
