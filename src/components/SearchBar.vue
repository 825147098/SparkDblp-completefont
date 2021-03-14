<template>
  <!--    搜索栏-->
  <div class="searchBarMain">
    <!--            导航栏-->
    <MainPageMenu class="searchBarMenu"></MainPageMenu>
    <div class="searchCon">
      <div style="justify-items: right">
        <el-dropdown type="primary">
          <el-button type="info" @click="handleInput(radio,inputData)">
            {{ dropDownArray[radio].show }}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(it, index) in dropDownArray"
                              :key="index"
                              tag="span">
              <div @click="handleInput(index,inputData)">
                {{ it.show }}
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!--            搜索栏-->
        <el-input class="searchInput"
                  @keyup.enter.native="handleInput(radio,inputData)"
                  v-model="inputData"
                  clearable>
        </el-input>
      </div>
    </div>
  </div>
  <!--            <router-link
        :to="{path:'/search/complete'}" tag="span">
      <el-dropdown-item>
        <div @click="changeRadio(0);putInputData(inputData)">
          组合搜素
        </div>
      </el-dropdown-item>
    </router-link>-->
  <!--        <el-input
              class="searchInput"
              @keyup.enter.native="putInputData(inputData)"
              v-model="inputData" clearable>
          </el-input>-->
  <!--        <el-button
              @click="putInputData(inputData)">
            Search
          </el-button>-->
</template>

<script>
import title_image from "../assets/title_2.png";
import MainPageMenu from "../components/MainPageMenu";
// import axios from "axios";


export default {
  name: "SearchBar",
  // eslint-disable-next-line no-undef
  components: {
    MainPageMenu
  },

  data: function () {
    return {
      url: title_image,
      radio: 0,
      inputData: '',
      dropDownArray: [
        {show: "出版物搜素", routerPath: "/search/publicat"},
        {show: "作者搜素", routerPath: "/search/author"},
        {show: "会议搜素", routerPath: "/search/venue"},
      ]
    }
  },
  methods: {
    handleInput(radio, input) {
      if (input == '') {
        this.$message.warning('请重新输入')
      } else {
        /*
         出版物搜索 0
         作者搜索 1
         会议搜索 2
        */
        this.radio = radio;
        let path = this.dropDownArray[radio].routerPath
        if (this.$route.path !== path) {
          this.$router.push({path: path});
        }
        if (this.dropDownArray[radio].show === "出版物搜素") this.publicationSearch(input)
        // if (this.dropDownArray[radio].show === "作者搜素") this.authorSearch(input)
        // if (this.dropDownArray[radio].show === "会议搜素") this.venueSearch(input)

        // this.$store.commit("incrementRadio", radio)
      }
    },
    //设置搜索条件
    publicationSearch(data) {
      let splitText = (data) => {
        let re = new RegExp(/{.*}/)
        // eslint-disable-next-line no-unused-vars
        /*let filter;
        if (data.match(re) != null) {
          filter = data
              .match(re)[0]
              .replace("{", "")
              .replace("}", "")
        }*/
        // if (tmp[0] != null) temp = tmp[0].replaceAll("[\\{\\}]", "")
        let title = data.replace(re, "")
        return {
          title: title,
          filter: null
        }
      };
      // eslint-disable-next-line no-unused-vars
/*      let getList = (qObj) => {
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

      };*/
      let qObj = splitText(data)
      if (qObj.title == '') {
        this.$message.warning('空白的输入')
      } else {
        this.$store.commit("setQueryObj", qObj);
        // eslint-disable-next-line no-unused-vars
        // getList(qObj)
      }
    },

    // eslint-disable-next-line no-unused-vars
    authorSearch(data) {

    },

    // eslint-disable-next-line no-unused-vars
    VenueSearch(data) {

    }


  },

}
</script>

<style scoped>
.searchBarMain {
  /*background-color: #C1CBD7;*/
  /*background-color: #AFB0B2;*/
  background-color: #8696A6;
  /*background-color: #9CA8B8;*/
  /*margin: auto;*/
  /*width: 80%;*/
  min-width: 1000px;
  padding: 0;
  /*height: 120px;*/
  display: flex;
  flex-direction: column;
}

.searchBarImg {
  float: left;
  /*height: 120px;*/
  padding-top: 39px;
  padding-left: 0;
}

.searchBarMenu {
  display: inline;
  float: left;
}

.searchCon {
  /*float: right;*/
  /*width: 500px;*/
  display: flex;
  flex-direction: row-reverse;
  /*font-size: medium;*/
  /*height: auto;*/
  /*align-items: center;*/
  /*justify-content: right;*/
}

.searchRadio {
  /*width: 80px;*/
  /*float: left;*/
  /*display: inline;*/
  border-bottom: none;
}


.searchInput {
  width: 300px;
  /*line-height: 90px;*/
  align-self: center;
}

/*.searchLabel{*/
/*    width: 200px;*/
/*}*/

</style>
