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
                        {{drownArry[radio]}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <router-link
                                :to="{path:'/search/complete'}" tag="span">
                            <el-dropdown-item>
                                <div @click="changeRadioToCom">
                                    组合搜素
                                </div>
                            </el-dropdown-item>
                        </router-link>
                        <router-link
                                :to="{path:'/search/author'}" tag="span">
                            <el-dropdown-item>
                                <div @click="changeRadioToAut">
                                    作者搜索
                                </div>
                            </el-dropdown-item>
                        </router-link>
                        <router-link
                                :to="{path:'/search/venue'}" tag="span">
                            <el-dropdown-item>
                                <div @click="changeRadioToVen">
                                    会议搜索
                                </div>
                            </el-dropdown-item>
                        </router-link>
                        <router-link
                                :to="{path:'/search/publicat'}" tag="span">
                            <el-dropdown-item>
                                <div @click="changeRadioToPub">
                                    出版物搜索
                                </div>
                            </el-dropdown-item>
                        </router-link>
                    </el-dropdown-menu>
                </el-dropdown>
                <!--            路由选择-->
                <!--     <el-menu background-color="#959595"
                              mode="horizontal"
                              class="searchRadio"
                              text-color="#fff">
                         &lt;!&ndash;                <el-submenu>111</el-submenu>&ndash;&gt;
                         <el-submenu index="searchLabel">
                             <template slot="title" style="width: 20px">
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

                             </el-radio-group>
                         </el-submenu>
                     </el-menu>-->
                <!--            搜索栏-->
                <el-input
                        class="searchInput"
                        @keyup.enter.native="putInputData"
                        v-model="inputData" clearable>
                </el-input>
                <el-button
                        @click="putInputData">
                    Search
                </el-button>
            </div>
        </div>
    </div>
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
                radio: 4,
                inputData: '',
                drownArry: ["组合搜素", "作者搜素", "会议搜素", "出版物搜素", "搜素模式"]
            }
        },

        watch: {
            "$store.state.inputfalg": function () {
                this.concatText();
                if (this.$store.state.inputfalg) {
                    this.putInputData();
                }
            },
            // "$store.state.inputData": function () {
            //     if (this.$store.state.inputData != null) {
            //         this.concatText();
            //     }
            // },
            radio:function () {
                if(this.radio != 4){
                    this.concatText()
                }
            },

            "$store.state.serchObj.conflag": function () {
                // if (this.$store.state.serchObj.conflag) {
                    this.concatText();
                // }
            }
        },

        methods: {
            //设置搜索条件
            putInputData() {
                // if (this.radio == 0)
                let input = this.splitText()
                if (input.title == '') {
                    this.$alert('搜索字段不包含title，请重新输入', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${action}`
                            });
                        }
                    });
                } else {
                    this.$store.commit("increment", {newInput: input, newLabel: this.radio});
                    this.$store.commit("incrementInputData", {data: this.inputData});
                }
                // console.log(this.$store.state.serchObj.conflag)

            },
            //设置搜索类型
            putRadioData() {
                this.$store.commit("incrementRadio", {newLabel: this.radio})
                // console.log(this.$store.state.radioLabel)
            },
            //选择组合搜索
            changeRadioToCom() {
                this.radio = 0;
                this.putRadioData()
            },
            //选择作者搜索
            changeRadioToAut() {
                this.radio = 1;
                this.putRadioData()
            },
            //选择会议搜索
            changeRadioToVen() {
                this.radio = 2;
                this.putRadioData()
            },
            //选择出版物搜索
            changeRadioToPub() {
                this.radio = 3;
                this.putRadioData()
            },
            //信息切割
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
            //信息拼装
            concatText() {
                let data = this.$store.state.serchObj;
                let text = data.title;

                if (this.$store.state.serchObj.year != '') {
                    let year = this.$store.state.serchObj.year.split(',');
                    if (year.length > 1) {
                        year = year[0] + ".." + year[year.length - 1];
                    } else {
                        year = year[0];
                    }
                    // console.log(year)
                    if (text == '')
                        text += "year:" + year;
                    else
                        text += "&year:" + year;
                }
                if (this.$store.state.serchObj.venue != '') {
                    if (text == '')
                        text += "venue:" + this.$store.state.serchObj.venue;
                    else
                        text += "&venue:" + this.$store.state.serchObj.venue;
                }
                if (this.$store.state.serchObj.authors.length > 0) {
                    let len = this.$store.state.serchObj.authors.length;
                    let author = this.$store.state.serchObj.authors[0];
                    for (let i = 1; i < len; i++) {
                        author += ',' + this.$store.state.serchObj.authors[i];
                    }
                    if (text == '')
                        text += "author:" + author;
                    else
                        text += "&author:" + author;
                }
                if (this.$store.state.serchObj.type != '') {
                    if (text == '')
                        text += "type:" + this.$store.state.serchObj.type;
                    else
                        text += "&type:" + this.$store.state.serchObj.type;
                }

                this.inputData = text;
                // console.log(text)
            }

        },

        mounted() {
            this.radio = this.$store.state.radioLabel;
        }
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
