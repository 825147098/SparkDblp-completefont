<template>
  <div>
    <!--作者细化-->
    <RefineList show-name="按照作者细化"
                :item-show-function="it=>`${it._VALUE}(${it.num})`"
                :limit-init="10"
                :loading="loadFlag.author"
                :list="authorList"/>
    <!--类型细化-->
    <RefineList show-name="按照类型细化"
                :item-show-function="it=>`${it.show}(${it.num})`"
                :limit-init="10"
                :loading="loadFlag.type"
                :list="typeList"/>
    <!--年份细化-->
    <RefineList show-name="按照年份细化"
                :item-show-function="it=>`${it._VALUE}(${it.num})`"
                :limit-init="10"
                :loading="loadFlag.year"
                :list="yearList"/>
    <!--会议细化-->
    <RefineList show-name="按照会议细化"
                :item-show-function="it=>`${it.prefix2 ? it.prefix2 : it._VALUE}(${it.num})`"
                :limit-init="10"
                :loading="loadFlag.venue"
                :list="venueList"/>
  </div>
</template>

<script>
import RefineList from "@/components/refineListItem/RefineList";
import axios from "axios";

// eslint-disable-next-line no-unused-vars
let getRefineList = (qObj, url) =>
   axios.get(this.$store.state.host + url, {
    params: qObj
  }).catch(error => {
    console.log(error)
  })

export default {
  name: "ComRefineList",
  components: {RefineList},
  data: function () {
    return {
      loadFlag: {
        author: true,
        year: true,
        type: true,
        venue: true
      }
    }
  },

  methods: {},

  computed: {
    authorList() {
      return this.$store.state.authorRefineList
          .map(item => {
            return {
              "_VALUE": item.first,
              "num": item.second,
            };
          })
          .sort((l, r) => l.num - r.num)
          .reverse()
    },
    typeList() {
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
      return this.$store.state.typeRefineList
          .map(item => {
            return {
              "_VALUE": item.first,
              "num": item.second,
              "show": typeMap.get(item.first),
            };
          })
          .sort((l, r) => l.num - r.num)
          .reverse()
    },
    yearList() {
      return this.$store.state.yearRefineList
          .map(item => {
            return {
              "_VALUE": item.first,
              "num": item.second,
            };
          })
          .sort((l, r) => l._VALUE - r._VALUE)
          .reverse()
    },
    venueList() {
      return this.$store.state.venueRefineList
          .map(item => {
            return {
              "_VALUE": item.first,
              "prefix2": item.second.first,
              "num": item.second.second,
            };
          })
          .sort((l, r) => l.num - r.num)
          .reverse()
    }
  },
/*  watch: {
    "$store.state.queryObj"(qObj) {
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

      let commitRefineList = (qObj, url, storeF) => {
        axios.get(this.$store.state.host + url, {
          params: qObj
        }).then(res => {
          let data = res.data;
          this.$store.commit(storeF, data);
        }).catch(error => {
          console.log(error)
        })
      }
      /!* qObj={
         title:'',
         filter: ''
       }*!/
      axios.get(this.$store.state.host + "/onlyDocs/search/findAllByRSQL", {
        params: qObj
      }).then(res => {

        //refineList
        commitRefineList(qObj, "/onlyDocs/search/findAuthorRefineByRSQL", 'setAuthorRefineList')
        commitRefineList(qObj, "/onlyDocs/search/findYearRefineByRSQL", 'setYearRefineList')
        commitRefineList(qObj, "/onlyDocs/search/findPrefix2RefineByRSQL", 'setVenueRefineList')
        commitRefineList(qObj, "/onlyDocs/search/findTypeRefineByRSQL", 'setTypeRefineList')
        // getAuthorData(qObj);
        // getYearData(qObj);

        let list = res.data._embedded.onlyDocs.map(it => {
          let t = it
          t.type = typeMap.get(it.type)
          return t
        });
        this.$store.commit("setReturnList", list);
      }).catch(error => {
        console.log(error);
      })

    }
  }*/
}
</script>

<style scoped>
@import "../../style/public.css";

</style>
