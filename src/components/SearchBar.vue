<template>
    <el-main class="searchBarMain">
        <el-image :src=url
                  class="searchBarImg"
                  fit="cover">
        </el-image>
        <div class="searchCon">
            <MainPageMenu class="searchBarMenu"></MainPageMenu>
            <el-input size="mini"
                      class="searchInput"
                      @keyup.enter.native="putInputData"
                      v-model="inputData" clearable/>
            <el-menu background-color="#959595"
                     mode="horizontal"
                     class="searchRadio"
                     text-color="#fff">
                <el-submenu index="searchLabel">
                    <template slot="title">
                        <i class="el-icon-search" style="color: #ebebeb"></i>
                    </template>
                    <el-radio-group v-model="radio"
                                    style="margin-left: 10px">
                        <div @click="changeRadioToCom">
                            <el-radio :label="0" style="color: white" >
                                <router-link :to="{path:'/search/complete'}"  >
                                    组合搜素
                                </router-link>
                            </el-radio>
                        </div>
                        <div @click="changeRadioToAut">
                            <el-radio :label="1" style="color: white" >
                                <router-link :to="{path:'/search/author'}"  >
                                    作者搜索
                                </router-link>
                            </el-radio>
                        </div>
                        <div>
                            <el-radio :label="2" style="color: white">会议搜索</el-radio>
                        </div>
                        <div>
                            <el-radio :label="3" style="color: white">出版物搜索</el-radio>
                        </div>
                    </el-radio-group>
                </el-submenu>
            </el-menu>
        </div>
    </el-main>
</template>

<script>
    import title_image from "../assets/title_2.png";
    import MainPageMenu from "../components/MainPageMenu";

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
                inputData:'',
            }
        },

        methods:{
            putInputData(){
                this.$store.commit("increment",{newInput:this.inputData,newLabel:this.radio});
            },

            putRadioData(){
                this.$store.commit("incrementRadio",{newLabel:this.radio})
            },

            changeRadioToAut(){
              this.radio = 1;
              this.putRadioData()
            },

            changeRadioToCom(){
                this.radio = 0;
                this.putRadioData()
            }

        },

        mounted() {
            this.radio = this.$store.state.radioLabel;
        }
    }
</script>

<style scoped>
    .searchBarMain {
        background-color: #959595;
        margin: auto;
        /*width: 80%;*/
        min-width: 1000px;
        padding: 0;
        /*height: 120px;*/
    }

    .searchBarImg {
        float: left;
        /*height: 120px;*/
        padding: 39px;
    }

    .searchBarMenu {
        display: inline;
        /*float: right;*/
    }

    .searchCon{
        float: right;
        width: 400px;
    }

    .searchRadio{
        width: 80px;
        float: left;
        display: inline;
    }


    .searchInput{
        width: 300px;
        line-height: 90px;
    }

</style>
