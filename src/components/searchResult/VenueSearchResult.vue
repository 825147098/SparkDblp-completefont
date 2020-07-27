<template>
    <el-main>
        <div v-show="webPage">
            <!--            面包头-->
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
            <!--            完整搜索结果-->
            <el-collapse-item name="1" v-if="webPage">
                <div class="body">
                    <p v-show="luckflag">幸运匹配项</p>
                    <!--                        随机列表-->
                    <ul v-show="luckList">
                        <el-collapse v-model="luckName">
                            <li v-for="luckly in luckList" :key="luckly.flag" style="height: auto">
                                <el-collapse-item :name="luckly.flag" style="height: auto">
                                    <!--                                    显示所有相同会议的不同名称-->
                                    <template slot="title" class="bodytitle name">
                                        <div class="titleLine">
                                        <span v-for="(booktitle,index) in luckly.booktitles" :key="booktitle + index"
                                              style="white-space: pre">
                                             <p class="mark" v-html="getMatch(booktitle)">{{getMatch(booktitle)}}</p>
                                            <span v-if="luckly.booktitles.indexOf(booktitle) < luckly.booktitles.length - 1">
                                            <el-divider direction="vertical"></el-divider>
                                           </span>
                                        </span>
                                        </div>
                                    </template>
                                    <!--                                    详细列表-->
                                    <ul class="bodyText">
                                        <li v-for="titles in luckly.venueArr" :key="titles.title + titles.booktitle">
                                            <router-link
                                                    class="name"
                                                    :to="{path:'/resVen',query: {venName:titles.title,cross:titles._key,book:titles.booktitle}}">
                                                <p class="mark" v-html="getMatch(titles.title)">
                                                    {{getMatch(titles.title)}}</p>
                                            </router-link>
                                        </li>
                                    </ul>
                                </el-collapse-item>
                            </li>
                        </el-collapse>
                    </ul>
                    <!--                    结果提示-->
                    <p v-if="totalElements > 0 && !loadFlag">所有{{totalElements}}条匹配项</p>
                    <p v-else v-show="!loadFlag">无匹配项</p>
                    <ul v-show="!loadFlag">
                        <el-collapse v-model="venueName">
                            <li v-for="venue in venueList" :key="venue.flag" style="height: auto">
                                <el-collapse-item :name="venue.flag" style="height: auto">
                                    <!--                                    完整列表booktitle-->
                                    <template slot="title" class="bodytitle name">
                                        <div class="titleLine">
                                           <span v-for="(booktitle,index) in venue.booktitles" :key="booktitle + index"
                                                 style="white-space: pre">
                                            <p class="mark" v-html="getMatch(booktitle)">{{getMatch(booktitle)}}</p>
                                            <span v-if="venue.booktitles.indexOf(booktitle) < venue.booktitles.length - 1">
                                                <el-divider direction="vertical"></el-divider>
                                           </span>
                                        </span>
                                        </div>
                                    </template>
                                    <ul class="bodyText">
                                        <!--                                        完整清单-->
                                        <li v-for="titles in venue.venueArr" :key="titles.title + titles.booktitle">
                                            <router-link
                                                    class="name"
                                                    :to="{path:'/resVen',query: {venName:titles.title,cross:titles._key}}">
                                                <p class="mark" v-html="getMatch(titles.title)">
                                                    {{getMatch(titles.title)}}</p>
                                            </router-link>
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
                    <!--                    幸运结果-->
                    <ul v-show="luckList.length > 0 && luckflag">
                        <el-collapse v-model="luckName" v-show="luckList.length > 0 && luckflag">
                            <li v-for="luckly in luckList" :key="luckly.flag">
                                <el-collapse-item :name="luckly.flag">
                                    <!--                                    显示所有相同会议的不同名称-->
                                    <template slot="title" class="bodytitle name">
                                        <div class="titleLine">
                                        <span v-for="(booktitle,index) in luckly.booktitles" :key="booktitle + index"
                                              style="white-space: pre">
                                             <p class="mark" v-html="getMatch(booktitle)">{{getMatch(booktitle)}}</p>
                                            <span v-if="luckly.booktitles.indexOf(booktitle) < luckly.booktitles.length - 1">
                                            <el-divider direction="vertical"></el-divider>
                                            </span>
                                        </span>
                                        </div>
                                    </template>
                                    <!--                                    会议下的具体会议-->
                                    <ul class="bodyText">
                                        <li v-for="titles in luckly.venueArr" :key="titles.title + titles.booktitle">
                                            <router-link
                                                    class="name"
                                                    :to="{path:'/resVen',query: {venName:titles.title,cross:titles._key}}">
                                                <p class="mark" v-html="getMatch(titles.title)">
                                                    {{getMatch(titles.title)}}</p>
                                            </router-link>
                                        </li>
                                    </ul>
                                </el-collapse-item>
                            </li>
                        </el-collapse>
                        <!--                        超长提示-->
                        <li v-show="!loadFlag && luckflag && luckList.length === 0">
                            <span class="name">
                                结果超长,请去查看所有选项
                            </span>
                        </li>
                        <!--                        跳转按钮-->
                        <li v-show="!loadFlag && luckflag && luckList.length > 0" style="text-align: left">
                            <router-link :to="{path:'/search/venue',query:{venName:searchTitle}}" class="name">
                                <el-button size="small" type="text">
                                    显示所有{{totalElements}}条匹配项
                                </el-button>
                            </router-link>
                        </li>
                    </ul>
                    <!--                    组合搜索完整显示-->
                    <ul v-show="venueList.length <= 6 && !loadFlag && !luckflag">
                        <el-collapse v-model="venueName" v-show="venueList.length <= 6">
                            <li v-for="venue in venueList" :key="venue.flag">
                                <el-collapse-item :name="venue.flag">
                                    <template slot="title" class="bodytitle name">
                                        <div class="titleLine">
                                        <span v-for="(booktitle,index) in venue.booktitles" :key="booktitle + index"
                                              style="white-space: pre">
                                            <p class="mark" v-html="getMatch(booktitle)">{{getMatch(booktitle)}}</p>
                                            <span v-if="venue.booktitles.indexOf(booktitle) < venue.booktitles.length - 1">
                                                <el-divider direction="vertical"></el-divider>
                                            </span>
                                        </span>
                                        </div>
                                    </template>
                                    <ul class="bodyText">
                                        <li v-for="titles in venue.venueArr" :key="titles.title + titles.booktitle">
                                            <router-link
                                                    class="name"
                                                    :to="{path:'/resVen',query: {venName:titles.title,cross:titles._key}}">
                                                <p class="mark" v-html="getMatch(titles.title)">
                                                    {{getMatch(titles.title)}}</p>
                                            </router-link>
                                        </li>
                                    </ul>
                                </el-collapse-item>
                            </li>
                        </el-collapse>
                    </ul>
                    <!--                    加载图标-->
                    <ul v-show="loadFlag"
                        class="putList">
                        <li style="color: #409EFF ;text-align: left">
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
                venueTestList: [
                    {
                        prefix2: "conf/casdmkm/",
                        venue: [
                            {
                                _key: "conf/casdmkm/2004",
                                title: "Data Mining and Knowledge Management, Chinese Academy of Sciences Symposium, CASDMKM 2004, Beijing, China, July 12-14, 2004, Revised Papers",
                                year: 2004,
                                type: "proceedings",
                                booktitle: "CASDMKM",
                                type_xml: "proceedings"
                            }
                        ],
                    },
                ],
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

            //获取数据
            getVenueData() {
                this.loadFlag = true;
                this.warnflag = false
                this.luckflag = false;
                this.luckList = []
                axios.get(this.$store.state.host + "/venueGroups/search/findAllByTextReturnList", {
                    params: {
                        booktitle: this.searchTitle,
                    }
                }).then(res => {
                    this.venueTestList = res.data._embedded.venueGroups;
                    this.totalElements = this.venueTestList.length;
                    this.getCleanData();
                    this.venueList = this.venueTestList
                    // console.log(this.venueList[0].booktitles.toString())
                    if (this.totalElements >= 20 )
                        this.getLuckly();
                    if (this.totalElements > 300)
                        this.warnflag = true;
                    this.loadFlag = false;
                }).catch(error => {
                    console.log(error);
                })
            },
            //随机列表
            getLuckly() {
                let list = [];
                let length = this.venueList.length;
                for (let i = 0; i < 6; i++) {
                    let num = Math.floor(Math.random() * length);
                    if ((list.indexOf(this.venueList[num]) == -1) && (this.venueList[num].booktitles.length <= 5)) {
                        list.push(this.venueList[num]);
                    } else {
                        i--;
                    }
                }
                this.luckList = list;
                this.luckflag = true;
                // console.log(this.lucklyList);
            },
            //数据清洗
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
            //匹配标记
            getMatch(val) {
                let str = this.searchTitle;

                if (val == null)
                    return

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
            // 完整搜索标记
            // '$store.state.serchObj.title': function () {
            //     if (this.$store.state.radioLabel == 2 || !this.webPage)
            //         if (this.$store.state.serchObj.title != '') {
            //             this.searchTitle = this.$store.state.serchObj.title;
            //             this.getVenueData();
            //             console.log(this.$store.state.radioLabel)
            //             console.log("v3")
            //         }
            // },
            // 碎片标记
            "$store.state.serchObj.conflag": function () {
                if (this.$store.state.serchObj.conflag ) {
                    this.searchName = this.$store.state.serchObj.title;
                    this.getVenueData();
                    // console.log("v2")
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
                // console.log(1)
            }
        }
        ,

        created() {
            if (this.searchVenue === true) {
                this.webPage = true;
            } else {
                this.webPage = false;
            }
            if (this.$store.state.inputData != null) {
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
    @import "../../style/public.css";

    .body > ul > div > li > div > div > div {
        height: auto;
    }

    .titleLine {
        line-height: 25px;
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

</style>
