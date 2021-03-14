<template>
  <div>
    <div class="infoMatch">总共匹配到{{ total }}条记录</div>
    <div v-for="(value,year,index) in plist"
         :key="index"
         class="putList">
      <li class="year">{{ -year }}</li>
      <li v-for="item in value" :key="JSON.stringify(item)">
        <PublicationComponent :item="item"/>
      </li>
    </div>
  </div>
</template>
<script>
import PublicationComponent from "@/components/bookTypeItem/PublicationComponent"

export default {
  name: 'PublicationList',
  components: {PublicationComponent},
  props: {
    plist: Object,
    total: Number
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