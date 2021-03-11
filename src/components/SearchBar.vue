<template>
  <!--    搜索栏-->
  <div class="searchBarMain">
    <!--            导航栏-->
    <MainPageMenu class="searchBarMenu"></MainPageMenu>
    <!--        图标-->
    <!--        <el-image :src=url-->
    <!--                  class="searchBarImg"-->
    <!--                  fit="cover">-->
    <!--        </el-image>-->
    <div class="searchCon">
      <div style="justify-items: right">
        <el-dropdown type="primary">
          <el-button type="info">
            {{ drownArry[radio] }}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <!--            <router-link
                            :to="{path:'/search/complete'}" tag="span">
                          <el-dropdown-item>
                            <div @click="changeRadio(0);putInputData(inputData)">
                              组合搜素
                            </div>
                          </el-dropdown-item>
                        </router-link>-->
            <!--            <router-link
                            :to="{path:'/search/author'}" tag="span">
                          <el-dropdown-item>
                            <div @click="changeRadio(1);putInputData(inputData)">
                              作者搜索
                            </div>
                          </el-dropdown-item>
                        </router-link>
                        <router-link
                            :to="{path:'/search/venue'}" tag="span">
                          <el-dropdown-item>
                            <div @click="changeRadio(2);putInputData(inputData)">
                              会议搜索
                            </div>
                          </el-dropdown-item>
                        </router-link>-->
            <router-link :to="{path:'/search/publicat'}" tag="span">
              <el-dropdown-item>
                <div @click="publicationSearch(inputData)">
                  出版物搜索
                </div>
              </el-dropdown-item>
            </router-link>
          </el-dropdown-menu>
        </el-dropdown>
        <!--            路由选择-->
        <!--            搜索栏-->
        <el-input
            class="searchInput"
            v-model="inputData" clearable>
        </el-input>
        <!--        <el-input
                    class="searchInput"
                    @keyup.enter.native="putInputData(inputData)"
                    v-model="inputData" clearable>
                </el-input>-->
        <!--        <el-button
                    @click="putInputData(inputData)">
                  Search
                </el-button>-->
      </div>
    </div>
  </div>
</template>

<script>
import title_image from "../assets/title_2.png";
import MainPageMenu from "../components/MainPageMenu";
import axios from "axios";


export default {
  name: "SearchBar",
  // eslint-disable-next-line no-undef
  components: {
    MainPageMenu
  },

  data: function () {
    return {
      url: title_image,
      radio: 4,
      inputData: '',
      drownArry: ["组合搜素", "作者搜素", "会议搜素", "出版物搜素", "搜素模式"]
    }
  },

  /*  watch: {
      "$store.state.inputfalg": function () {
        this.concatText();
        if (this.$store.state.inputfalg) {
          this.putInputData();
        }
      },
      radio: function () {
        if (this.radio != 4) {
          this.concatText()
        }
      },

      "$store.state.serchObj.conflag": function () {
        // if (this.$store.state.serchObj.conflag) {
        this.concatText();
        // }
      }
    },*/

  methods: {
    //设置搜索条件
    publicationSearch(data) {
      // if (this.radio == 0)
      let splitText = (data) => {
        // eslint-disable-next-line no-unused-vars
        let filter;
        let re = new RegExp(/{.*}/)

        if (data.match(re) != null) {
          filter = data
              .match(re)[0]
              .replace("{", "")
              .replace("}", "")
        }
        // if (tmp[0] != null) temp = tmp[0].replaceAll("[\\{\\}]", "")
        let title = data.replace(re, "")
        return {
          title: title,
          filter: filter
        }
      };
      let getList = (qObj) => {
        let typeMap = new Map([
          ["inproceedings", 'Conference and Workshop Papers'],
          ["inproceedings", 'Conference and Workshop Papers'],
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
        /* qObj={
           title:'',
           filter: ''
         }*/
        axios.get(this.$store.state.host + "/onlyDocs/search/findAllByRSQL", {
          params: qObj
        }).then(res => {

          //refineList
          commitRefineList(qObj,"/onlyDocs/search/findAuthorRefineByRSQL",'setAuthorRefineList')
          commitRefineList(qObj,"/onlyDocs/search/findYearRefineByRSQL",'setYearRefineList')
          commitRefineList(qObj,"/onlyDocs/search/findPrefix2RefineByRSQL",'setVenueRefineList')
          commitRefineList(qObj,"/onlyDocs/search/findTypeRefineByRSQL",'setTypeRefineList')
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

      };
      let qObj = splitText(data)
      if (qObj.title == '') {
        this.$message.warning('空白的输入')
      } else {
        this.$store.commit("setQueryObj", qObj);
        // eslint-disable-next-line no-unused-vars
        getList(qObj)
      }
    },

    //选择组合搜索

    changeRadio(radio) {
      /*
       组合搜素 0
       作者搜索 1
       会议搜索 2
       出版物搜索 3
      */
      this.radio = radio;
      this.$store.commit("incrementRadio", radio)
    },
    //信息切割

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
