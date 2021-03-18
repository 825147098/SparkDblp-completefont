<template>
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
</template>
<script>
export default {
  name: 'AuthorItem',
  props: {
    it: Object
  }
}
</script>
