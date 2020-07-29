<template>
    <el-container>
        <!--        标题-->
        <el-header class="header">
            <h1 class="headline">计算机科学 会议与研讨会</h1>
        </el-header>
        <el-main style="background-color:aliceblue;">
            <!--            搜索选择栏-->
            <div class="namePrefixCon">
                <span>跳转到期刊前缀为&nbsp;：</span>
                <el-input class="broInput"
                          v-model="nameValue"
                          size="mini"
                          @keyup.enter.native="getInputData"
                          placeholder="请输入关键词">
                </el-input>
            </div>
            <!--            前进后退按钮组-->
            <div class="buttonGrop">
                <el-button type="text"
                           @click="getPreData"
                           :disabled="preButton">
                    <i class="el-icon-arrow-left"></i>
                    &nbsp;前{{pageSize}}条数据&nbsp;]
                </el-button>
                <el-button type="text"
                           @click="getNextData"
                           :disabled="nextButton">
                    [&nbsp;后{{pageSize}}条数据&nbsp;
                    <i class="el-icon-arrow-right"></i>
                </el-button>
            </div>
            <header class="head-hide">
                <h3 v-if="confList[0].booktitles != null && !loadFlag">结果按照会议与研讨会前缀排序,从"{{confList[0].booktitles[0]}}"开始</h3>
            </header>
            <!--            列表显示期刊-->
            <div class="body">
                <el-collapse v-model="activeNames" class="broCollaps" v-show="!loadFlag">
                    <el-collapse-item v-for="(item,index) in confList" :key="item.prefix"
                                      :name="index">
                        <template slot="title">
                            <i class="el-icon-document" style="margin: 0 20px"></i>
                            {{item.booktitles[0]}}
                        </template>
                        <ul>
                            <li>
                                所有别称:
                                <span v-for="booktitle in item.booktitles" :key="booktitle">
                                    {{booktitle}}
                                    <span v-if="item.booktitles.indexOf(booktitle) < item.booktitles.length - 1">
                                        <el-divider direction="vertical"></el-divider>
                                    </span>
                                </span>
                            </li>
                            <li v-for="titles in item.venueArr"
                                :key="titles.title + titles.booktitle + titles._key">
                                <router-link
                                        class="name"
                                        :to="{path:'/resVen',query: {venName:titles.title,cross:titles._key}}">
                                    {{titles.title}},
                                    {{titles.year}}
                                </router-link>
                            </li>
                        </ul>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div v-show="loadFlag"
                 class="putList">
                <div style="color: #409EFF">
                    Loading
                    <el-icon class="el-icon-loading"
                             style="font-size: 20px "
                    ></el-icon>
                </div>
            </div>
            <div class="buttonGrop">
                <el-button type="text"
                           @click="getPreData"
                           :disabled="preButton">
                    <i class="el-icon-arrow-left"></i>
                    &nbsp;前{{pageSize}}条数据&nbsp;]
                </el-button>
                <el-button type="text"
                           @click="getNextData"
                           :disabled="nextButton">
                    [&nbsp;后{{pageSize}}条数据&nbsp;
                    <i class="el-icon-arrow-right"></i>
                </el-button>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "BrowseResultConf",
        data: function () {
            return {
                namePrefix: 'A',//作者名参数

                pageSize: 100,//页面作者数量

                activeNames: ['-1'],

                loadFlag: true,

                confList: [//列表格式
                    {
                        "prefix2": "conf/accas/",
                        "booktitle": [
                            "ACCAS"
                        ],
                        "title": [
                            "Computer Aided Surgery - 7th Asian Conference on Computer Aided Surgery, ACCAS 2011, Bangkok, Thailand, August 2011, Proceedings"
                        ],
                        "venue": [
                            {
                                "_key": "conf/accas/2011",
                                "title": "Computer Aided Surgery - 7th Asian Conference on Computer Aided Surgery, ACCAS 2011, Bangkok, Thailand, August 2011, Proceedings",
                                "year": 2012,
                                "type": "proceedings",
                                "booktitle": "ACCAS",
                                "type_xml": "proceedings",
                                "crossref": "conf/accas/2011"
                            }
                        ]
                    }
                ],
                confTestList: [],
                nameValue: "",//选择器绑定值

                nowPage: 0,//当前页码
                loading: false,
                //按钮组v-show值
                preButton: true,
                nextButton: false,
                //显示列表和v-show值
                showNamelist0: [],

                showNameFlag0: false,

            }
        },

        methods: {
            //选择器拉取选项

            //获取Conf列表
            getConfData() {
                this.loadFlag = true;
                axios.get(this.$store.state.host + "/venueGroups/search/findAllByBooktitleStartingWith", {
                    params: {
                        prefix: this.namePrefix,
                        page: this.nowPage,
                        size: this.pageSize,
                    }
                }).then(res => {
                    this.confTestList = res.data._embedded.venueGroups;
                    this.confTestList = this.confTestList.map(function (item) {
                        item.venue.sort(function (a, b) {
                            return b.year - a.year;
                        })

                        let bookArr = [];
                        for (let i = 0; i < item.booktitle.length; i++) {
                            if (bookArr.indexOf(item.booktitle[i]) === -1) {
                                bookArr.push(item.booktitle[i]);
                            }
                        }

                        bookArr.sort(function (a, b) {
                            return a.length - b.length;
                        })

                        return {
                            booktitles: bookArr,
                            venueArr: item.venue,
                            prefix: item.prefix2
                        }
                    })
                    console.log(this.confTestList)
                    this.confList = this.confTestList
                    this.loadFlag = false;
                }).catch(error => {
                    console.log(error);
                })
            },
            //上一页按钮函数
            getPreData() {
                if (this.nowPage > 0) {
                    this.nowPage--;
                    this.getConfData();
                }
            },
            //下一页按钮函数
            getNextData() {
                this.nowPage++;
                // console.log(this.nowPage);
                this.getConfData();
            },

            getInputData() {
                this.namePrefix = this.nameValue;
                this.nowPage = 0;
                this.getConfData();
            }

        },
        //监视器
        watch: {
            nowPage: function () {
                if (this.nowPage > 0) {
                    this.preButton = false;
                } else {
                    this.preButton = true;
                }
            },
            // nameValue: function () {
            //     this.namePrefix = this.nameValue;
            //     this.getConfData();
            // }
        },

        mounted() {
            this.getConfData();

        },

        created() {
            //接收路由跳转参数
            if (this.$route.query.prefix != null) {
                this.namePrefix = this.$route.query.prefix;
            }

        }
    }
</script>

<style scoped>
    @import "../../style/public.css";


    .drop-down-con > ul {
        padding: 0 0 0 15px;
        float: left;
    }


    .head-hide > h3 {
        margin: 0;
    }

    .router-link-text {
        text-decoration: none;
        color: #606266;
        font-size: 14px;
    }
</style>

