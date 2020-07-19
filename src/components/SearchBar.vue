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
                            <el-radio :label="0" style="color: white">
                                <router-link :to="{path:'/search/complete'}">
                                    组合搜素
                                </router-link>
                            </el-radio>
                        </div>
                        <div @click="changeRadioToAut">
                            <el-radio :label="1" style="color: white">
                                <router-link :to="{path:'/search/author'}">
                                    作者搜索
                                </router-link>
                            </el-radio>
                        </div>
                        <div @click="changeRadioToVen">
                            <el-radio :label="2" style="color: white">
                                <router-link :to="{path:'/search/author'}">
                                    会议搜索
                                </router-link>
                            </el-radio>
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
                inputData: '',
            }
        },

        watch: {
            "$store.state.inputfalg": function () {
                if (this.$store.state.inputfalg && this.$store.state.radioLabel == 0) {
                    this.concatText();
                    this.putInputData();
                }
            }
        },

        methods: {
            putInputData() {
                // if (this.radio == 0)
                this.$store.commit("increment", {newInput: this.splitText(), newLabel: this.radio});
                this.$store.commit("incrementInputData", {data: this.inputData});
                // console.log(this.inputData)

            },

            putRadioData() {
                this.$store.commit("incrementRadio", {newLabel: this.radio})
            },

            changeRadioToAut() {
                this.radio = 1;
                this.putRadioData()
            },

            changeRadioToCom() {
                this.radio = 0;
                this.putRadioData()
            },

            changeRadioToVen() {
                this.radio = 2;
                this.putRadioData()
            },

            splitText() {
                let data = this.inputData.split("&");
                let len = data.length;
                for (let i = 0; i < len; i++) {
                    let temp = data[i].toString();
                    data[i] = temp.split(":");
                }

                let title = '';
                let year = '';
                let venue = '';
                let author = [];
                let type = '';
                let titleFlag = false;


                for (let i = 0; i < data.length; i++) {
                    switch (data[i].length) {
                        case 1:
                            if (data[i][0] != ' ') {
                                if (!titleFlag) {
                                    titleFlag = true;
                                    title = data[i][0]
                                } else {
                                    title += ' ' + data[i][0];
                                }
                            }
                            break;
                        default:
                            if (data[i][0] == "year") {
                                let yearData = data[i][1].split("..");
                                if (yearData.length > 1) {
                                    let starYear = Math.min(yearData[0], yearData[1]);
                                    let endYear = Math.max(yearData[0], yearData[1]);
                                    year = starYear;
                                    for (let j = starYear + 1; j <= endYear; j++) {
                                        year += ',' + j;
                                    }
                                } else {
                                    year = yearData[0];
                                }
                            } else if (data[i][0] == "author") {
                                let authorItem = data[i][1].split(",")
                                for (let j = 0; j < authorItem.length; j++) {
                                    author.push(authorItem[j])
                                }
                            } else if (data[i][0] == "venue") {
                                venue = data[i][1];
                            } else if (data[i][0] == "type") {
                                type = data[i][1];
                            } else {
                                break;
                            }
                            break;
                    }
                }
                // console.log(author)
                return {
                    title: title,
                    author: author,
                    year: year,
                    venue: venue,
                    type: type
                }
            },

            concatText() {
                let data = this.$store.state.serchObj;
                let text = data.title;

                if (this.$store.state.serchObj.year != '') {
                    text += "&year:" + this.$store.state.serchObj.year;
                }
                if (this.$store.state.serchObj.venue != '') {
                    text += "&venue:" + this.$store.state.serchObj.venue;
                }
                if (this.$store.state.serchObj.authors.length > 0) {
                    let len = this.$store.state.serchObj.authors.length;
                    let author = this.$store.state.serchObj.authors[0];
                    for (let i = 1; i < len; i++) {
                        author += ',' + this.$store.state.serchObj.authors[i];
                    }
                    text += "&author:" + author;
                }
                if (this.$store.state.serchObj.type != '') {
                    text += "&type:" + this.$store.state.serchObj.type;
                }
                // console.log(this.$store.state.serchObj)
                this.inputData = text;

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

    .searchCon {
        float: right;
        width: 400px;
    }

    .searchRadio {
        width: 80px;
        float: left;
        display: inline;
    }


    .searchInput {
        width: 300px;
        line-height: 90px;
    }

</style>
