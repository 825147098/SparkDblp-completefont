<template>
  <!--    搜索主页-->
  <div style="width: 80%;margin: auto; max-width: 1150px">
    <div style="padding: 0;display: flex;flex-direction: column">
      <SearchBar></SearchBar>
    </div>
    <!--        子路由-->
    <router-view></router-view>
  </div>
</template>

<script>
import SearchBar from "../../components/SearchBar";

export default {
  name: "search",
  components: {SearchBar}
}
</script>

<style scoped>

</style>
