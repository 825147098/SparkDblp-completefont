<!--作者搜索结果-->
<template>
  <div class="body" style="display: flex;align-items:start;flex-direction: column">
    <div v-for="it in authorList"
         :key="it._VALUE"
         style="margin-left: 5%">
      <AuthorItem :it="it"/>
    </div>
  </div>
</template>

<script>

import AuthorItem from "@/components/searchResult/AuthorItem";

export default {
  name: "AuthorList",
  components: {AuthorItem},
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

