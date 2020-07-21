<template>
    <el-main>
        <div v-show="webPage">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadClass">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>搜索</el-breadcrumb-item>
            </el-breadcrumb>
            <header class="head-hide">
                <h3>
                    <el-button size="mini"
                               @click="changeFalg"
                               type="text">
                        [{{flag}}]
                    </el-button>
                    会议搜索结果
                </h3>
            </header>
        </div>
        <el-collapse v-model="activeName" accordion @change="changeFalg">
            <el-collapse-item name="1" v-if="webPage">
                <div class="body">
                    <p v-show="luckflag">幸运匹配项</p>
                    <!--                        随机列表-->
                    <ul v-show="luckList">
                        <el-collapse v-model="luckName">
                            <li v-for="luckly in luckList" :key="luckly.flag" style="height: auto">
                                <el-collapse-item :name="luckly.flag" style="height: auto">
                                    <template slot="title" class="bodytitle name">
                                        <div class="titleLine">
                                        <span v-for="booktitle in luckly.booktitles" :key="booktitle"
                                              style="white-space: pre">
                                             <p class="mark" v-html="getMatch(booktitle)">{{getMatch(booktitle)}}</p>
                                            <span v-if="luckly.booktitles.indexOf(booktitle) < luckly.booktitles.length - 1">
                                            <el-divider direction="vertical"></el-divider>
                                           </span>
                                        </span>
                                        </div>
                                    </template>
                                    <ul class="bodyText">
                                        <li v-for="titles in luckly.venueArr" :key="titles.title">
                                            <p class="mark" v-html="getMatch(titles.title)">
                                                {{getMatch(titles.title)}}</p>
                                        </li>
                                    </ul>
                                </el-collapse-item>
                            </li>
                        </el-collapse>
                    </ul>
                    <!--                    <p v-if="totalElements > 300 && !loadFlag">前300条匹配项</p>-->
                    <p v-if="totalElements > 0 && !loadFlag">所有{{totalElements}}条匹配项</p>
                    <p v-else v-show="!loadFlag">无匹配项</p>
                    <ul v-show="!loadFlag">
                        <el-collapse v-model="venueName">
                            <li v-for="venue in venueList" :key="venue.flag" style="height: auto">
                                <el-collapse-item :name="venue.flag" style="height: auto">
                                    <template slot="title" class="bodytitle name">
                                        <div class="titleLine">
                                            <span v-for="booktitle in venue.booktitles" :key="booktitle"
                                                  style="white-space: pre">
                                            <p class="mark" v-html="getMatch(booktitle)">{{getMatch(booktitle)}}</p>
                                            <span v-if="venue.booktitles.indexOf(booktitle) < venue.booktitles.length - 1">
                                                <el-divider direction="vertical"></el-divider>
                                           </span>
                                        </span>
                                        </div>
                                    </template>
                                    <ul class="bodyText">
                                        <li v-for="titles in venue.venueArr" :key="titles.title">
                                            <p class="mark" v-html="getMatch(titles.title)">
                                                {{getMatch(titles.title)}}</p>
                                        </li>
                                    </ul>
                                </el-collapse-item>
                            </li>
                        </el-collapse>
                    </ul>
                    <ul v-show="loadFlag"
                        class="putList">
                        <li style="color: #409EFF">
                            Loading
                            <el-icon class="el-icon-loading"
                                     style="font-size: 20px "
                            ></el-icon>
                        </li>
                    </ul>
                </div>
            </el-collapse-item>
            <el-collapse-item name="1" v-else>
                <template slot="title">
                    [{{flag}}] 会议搜索结果
                </template>
                <div class="body">
                    <ul v-show="luckList && luckflag">
                        <el-collapse v-model="luckName">
                            <li v-for="luckly in luckList" :key="luckly.flag">
                                <el-collapse-item :name="luckly.flag">
                                    <template slot="title" class="bodytitle name">
                                        <div class="titleLine">
                                        <span v-for="booktitle in luckly.booktitles" :key="booktitle"
                                              style="white-space: pre">
                                             <p class="mark" v-html="getMatch(booktitle)">{{getMatch(booktitle)}}</p>
                                            <span v-if="luckly.booktitles.indexOf(booktitle) < luckly.booktitles.length - 1">
                                            <el-divider direction="vertical"></el-divider>
                                            </span>
                                        </span>
                                        </div>
                                    </template>
                                    <ul class="bodyText">
                                        <li v-for="titles in luckly.venueArr" :key="titles.title">
                                            <p class="mark" v-html="getMatch(titles.title)">
                                                {{getMatch(titles.title)}}</p>
                                        </li>
                                    </ul>
                                </el-collapse-item>
                            </li>
                        </el-collapse>
                        <li v-show="!loadFlag && luckflag && luckList">
                            <router-link :to="{path:'/search/venue',query:{venName:searchTitle}}" class="name">
                                <el-button size="small" type="text">
                                    显示所有{{totalElements}}条匹配项
                                </el-button>
                            </router-link>
                        </li>
                    </ul>
                    <ul v-show="venueList.length <= 6">
                        <el-collapse v-model="venueName">
                            <li v-for="venue in venueList" :key="venue.flag">
                                <el-collapse-item :name="venue.flag">
                                    <template slot="title" class="bodytitle name">
                                        <div class="titleLine">
                                        <span v-for="booktitle in venue.booktitles" :key="booktitle"
                                              style="white-space: pre">
                                            <p class="mark" v-html="getMatch(booktitle)">{{getMatch(booktitle)}}</p>
                                            <span v-if="venue.booktitles.indexOf(booktitle) < venue.booktitles.length - 1">
                                                <el-divider direction="vertical"></el-divider>
                                            </span>
                                        </span>
                                        </div>
                                    </template>
                                    <ul class="bodyText">
                                        <li v-for="titles in venue.venueArr" :key="titles.title">
                                            <p class="mark" v-html="getMatch(titles.title)">
                                                {{getMatch(titles.title)}}</p>
                                        </li>
                                    </ul>
                                </el-collapse-item>
                            </li>
                        </el-collapse>
                    </ul>
                    <ul v-show="loadFlag"
                        class="putList">
                        <li style="color: #409EFF">
                            Loading
                            <el-icon class="el-icon-loading"
                                     style="font-size: 20px "
                            ></el-icon>
                        </li>
                    </ul>
                </div>
            </el-collapse-item>
        </el-collapse>
    </el-main>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "VenueSearchResult",
        data: function () {
            return {
                loadFlag: false,

                activeName: '1',
                flag: '-',
                warnflag: false,
                //搜索信息
                searchTitle: '',

                totalElements: "",
                //幸运列表
                luckList: [],
                luckflag: false,
                luckName: [],

                venueList: [],
                venueTestList: [],
                venueName: [],

                webPage: true,


            }
        },

        methods: {
            //修改手风琴标记
            changeFalg() {
                if (this.flag === '-')
                    this.flag = '+';
                else
                    this.flag = '-';
                // console.log(this.flag)
            },


            getVenueData() {
                this.loadFlag = true;
                this.warnflag = false
                this.luckflag = false;
                this.luckList = []
                axios.get(this.$store.state.host + "/venueGroups/search/findAllByVenue_BooktitleContainingIgnoreCase", {
                    params: {
                        booktitle: this.searchTitle,
                    }
                }).then(res => {
                    this.venueTestList = res.data._embedded.venueGroups;
                    this.totalElements = this.venueTestList.length;
                    this.getCleanData();
                    this.venueList = this.venueTestList
                    // console.log(this.venueList[0].booktitles.toString())
                    if (this.totalElements >= 20)
                        this.getLuckly();
                    if (this.totalElements > 300)
                        this.warnflag = true;
                    this.loadFlag = false;
                }).catch(error => {
                    console.log(error);
                })
            },

            getLuckly() {
                let list = [];
                let length = this.venueList.length;
                for (let i = 0; i < 6; i++) {
                    let num = Math.floor(Math.random() * length);
                    if (list.indexOf(this.venueList[num]) == -1) {
                        list.push(this.venueList[num]);
                    } else {
                        i--;
                    }
                }
                this.luckList = list;
                this.luckflag = true;
                // console.log(this.lucklyList);
            },

            getCleanData() {
                let data = this.venueTestList;
                this.venueTestList = data.map(function (item) {
                    item.venue.sort(function (a, b) {
                        return b.year - a.year
                    });
                    let bookArr = [];
                    for (let i = 0; i < item.venue.length; i++) {
                        if (bookArr.indexOf(item.venue[i].booktitle) === -1) {
                            bookArr.push(item.venue[i].booktitle)
                        }
                    }

                    return {
                        year: item.venue[0].year,
                        booktitles: bookArr,
                        venueArr: item.venue,
                        flag: item.prefix2
                    }
                })
                this.venueTestList.sort(function (a, b) {
                    return b.year - a.year
                })
            },

            getMatch(val) {
                let str = this.searchTitle;

                let copyVal = val.toLowerCase();
                let copyStr = str.toLowerCase();

                let num = copyVal.indexOf(copyStr);

                if (num === -1) {
                    return val
                } else {
                    let or = val.substring(num, num + str.length)
                    // console.log(or + num)
                    let re = new RegExp(str, "gim")
                    return val.replace(re, "<mark style='background-color: #fff8c6'>" + or + "</mark>")
                }
            },


        },

        props: {
            searchVenue: Boolean,
        },

        watch: {
            '$store.state.serchObj.title': function () {
                if ((this.$store.state.radioLabel === 2 || !this.webPage) && this.$store.state.serchObj.title != '') {
                    this.searchTitle = this.$store.state.serchObj.title;
                    this.getVenueData();
                }
            },

            totalElements: function () {
                if (this.totalElements > 0) {
                    this.$store.commit("incrementSetSerchVen")
                } else {
                    this.$store.commit("incrementCleanSerchVen")
                }
            }


        },

        mounted() {
            if (this.$route.query.venName != null) {
                this.searchTitle = this.$route.query.venName;
                // console.log(this.activeShow)
                this.activeShow = true;
            }
            if (this.activeShow) {
                this.getVenueData();
            }
        }
        ,

        created() {
            if (this.searchVenue === true) {
                this.webPage = true;
            } else {
                this.webPage = false;
            }
            if (this.$store.state.inputData != '') {
                this.searchTitle = this.$store.state.serchObj.title;
                this.activeShow = true;
            } else {
                this.activeShow = false;
            }
            // this.searchTitle = 'acm';
            // this.getVenueData()

        }
    }
</script>

<style scoped>
    .breadClass {
        padding: 0 20px;
    }

    .head-hide {
        border-bottom: 2px #7d848a solid;
        min-height: 27px;
        padding: 0 16px 0 24px;
        text-align: left;
        margin: 20px 0 0 0;
    }

    .body {
        color: #505b62;
        font-family: 'Open Sans', sans-serif;
        font-size: 11pt;
        font-weight: 400;
        min-width: 768px;
        margin: 0;
        padding: 0;
        height: auto;
    }

    .body > p {
        text-align: left;
        margin-left: 24px;
    }

    .body > ul > div > li > div > div > div {
        height: auto;
    }

    .titleLine {
        line-height: 20px;
        text-align: left;
        align-self: flex-end;
    }

    .bodytitle {
        text-align: left;
        display: inline;
        height: auto;
    }

    .titleLine > span {
        text-decoration: none;
        text-align: left;
        font-size: 11px;
        margin: 0;
        white-space: pre;
    }

    .bodyText {
        font-size: smaller;
        text-align: left;
        margin: 0;
    }

    .mark {
        display: inline;
    }

    .name {
        color: #7d848a;
        text-decoration: none;
    }
</style>
