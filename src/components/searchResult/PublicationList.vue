<template>
  <el-main>
    <div v-for="(value,year,index) in plist"
         :key="index"
         class="putList">
      <li class="year">{{ -year }}</li>
      <li v-for="item in value" :key="JSON.stringify(item)">
        <PublicationComponent :item="item"/>
      </li>
    </div>
  </el-main>
</template>
<script>
import PublicationComponent from "@/components/bookTypeItem/PublicationComponent"

export default {
  name: 'PublicationList',
  components: {PublicationComponent},
  props: {
    plist: {}
  }
}
</script>
<style scoped>
@import "../../style/public.css";

.year {
  font-size: small;
  font-weight: 800;
}

</style>