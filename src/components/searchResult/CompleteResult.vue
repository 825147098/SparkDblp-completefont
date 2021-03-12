<template>
  <PublicationList :plist="pubList"/>
</template>

<script>
import _ from 'lodash'
import PublicationList from "@/components/searchResult/PublicationList";

export default {
  name: "CompleteResult",
  components: {
    PublicationList
  },
  data: function () {
    return {
      /*queryObj: {
        title: '',
        filter: ''
      },*/
      title: '',
      page: 0,
      size: '',
      pageDetail: {},

      flag: '-',
      activeName: '1',
      loadFlag: true,
      dataFlag: false,

      // pubList: [],
      // waitList: [],
      // yearList: [],

      parmasObj: {},
      parmasFlag: false
    }
  },


  methods: {},

  computed: {
    pubList() {
      let t = this.$store.state.returnList;
      /*let sorted = t.sort((it1, it2) => {
        let year1 = it1.year
        let year2 = it2.year
        if (year1 == null) year1 = 0;
        if (year2 == null) year1 = 0;
        return year2 - year1
        // return year1 - year2
      })
*/
      //加个负号是为了方便排序，显示的时候记得去掉
      return _.groupBy(t, it => -it.year)
    }
  },
  /*  watch: {
      "$store.state.returnList"(newVal, oldVal) {
        console.log(newVal);
        console.log(oldVal);
        this.waitList = this.$store.state.returnList
        // let sorted = this.sortByYear(this.waitList);
        // this.pubList = this.groupByYear(sorted);
        // console.log(this.pubList);
      }
    },*/
  /*
    mounted() {
      this.title = this.$store.state.serchObj.title;
      if (this.parmasFlag)
        this.getFilPubData()
      else
        this.getPubData()
    }*/
}
</script>

