<template>
  <div>
    <div class="infoMatch">总共匹配到{{ total }}条记录</div>
    <div v-for="(value,year,index) in publicationList"
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
import _ from "lodash";

export default {
  name: 'PublicationList',
  components: {PublicationComponent},
  props: {
    plist: Object,
    total: Number
  },
  computed: {
    publicationList() {
      let typeMap = new Map([
        ["inproceedings", 'Conference and Workshop Papers'],
        ["inproceedings", 'Conference and Workshop Papers'],
        ["conference and workshop", 'Conference and Workshop Papers'],
        ["book and thesis", 'Book and Theses'],
        ['series', 'Book and Theses'],
        ['proceedings', 'Editorshop'],
        ["informal", 'Informal Publications'],
        ["incollection", 'Parts in Books or Collections'],
        ["journals article", 'Journals Article'],
        ["reference", 'Reference Works'],
        ["withdrawn", 'Withdrawn Item']
      ])
      let t = this.plist.map(it => {
        let t = it
        t.type = typeMap.get(it.type)
        return t
      });
      //加个负号是为了方便排序，显示的时候记得去掉
      return _.groupBy(t, it => -it.year)
    }
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