<template>
    <el-container>
        <!--        标题-->
        <el-header class="header">
            <h1 class="headline">计算机科学 期刊</h1>
        </el-header>
        <el-main style="background-color:aliceblue;">
            <!--            搜索选择栏-->
            <div class="namePrefixCon">
                <span>期刊模糊匹配&nbsp;：</span>
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
                <h3 v-if="journalList[0].journal != null && !loadFlag && !errorFlag">结果按照期刊模糊匹配结果排序,从"{{journalList[0].journal[0]}}"开始</h3>
            </header>
            <!--            列表显示期刊-->
                <div class="body" v-if="!errorFlag">
                    <el-collapse v-model="activeNames" class="broCollaps" v-if="!loadFlag">
                        <el-collapse-item v-for="(item,index) in journalList" :key="item.prefix"
                                          :name="index">
                            <template slot="title">
                                <i class="el-icon-document" style="margin: 0 20px"></i>
                                {{item.journal[0]}}
                            </template>
                            <ul>
                                <li v-for="num in item.volume" :key="num">
                                    <router-link
                                            target="_blank"
                                            :to="{path:'/resJou',query:{jourName:item.journal[0],prefix:item.prefix,volume:num}}"
                                            class="router-link-text">
                                        Volume : {{num}}
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
            <div v-show="errorFlag && !loadFlag"
                class="putList">
                <div>
                    结果为空
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
        name: "BrowseResultJournal",
        data: function () {
            return {
                namePrefix: 'A',//作者名参数

                pageSize: 100,//页面作者数量

                activeNames: ['-1'],

                loadFlag:true,

                pageDetail:null,

                journalList: [//列表格式
                    {
                        prefix1: "journals/",
                        prefix2: "journals/cib/",
                        volume: [
                            "1",
                            "10",
                            "11",
                            "12",
                            "13",
                            "14",
                            "15",
                            "16",
                            "17",
                            "18",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9"
                        ],
                        journal: [
                            "IEEE Intell. Informatics Bull."
                        ],
                        _links: {
                            self: {
                                href: "http://192.168.3.5:8080/journalIndexes/5f1fd5f6bb98210b07d7c869"
                            },
                            journalIndex: {
                                href: "http://192.168.3.5:8080/journalIndexes/5f1fd5f6bb98210b07d7c869"
                            }
                        }
                    },
                ],
                journalTestList:[],
                nameValue: "",//选择器绑定值

                nowPage: 0,//当前页码
                loading: false,
                //按钮组v-show值
                preButton: true,
                nextButton: false,
                //显示列表和v-show值
                showNamelist0: [],

                errorFlag:false,

                showNameFlag0: false,

            }
        },

        methods: {
            //选择器拉取选项

            //获取作者列表
            getJournalData() {
                this.loadFlag = true;
                this.nextButton = true;
                axios.get(this.$store.state.host + "/journalIndexes/search/findAllByJournalContaining", {
                    params: {
                        journal: this.namePrefix,
                        page: this.nowPage,
                        size: this.pageSize,
                    }
                }).then(res => {
                    this.journalTestList = res.data._embedded.journalIndexes;
                    if(this.journalTestList.length > 0){
                        this.pageDetail = res.data.page;
                        this.journalTestList = this.journalTestList.map(function (item) {
                            item.volume.sort(function (a,b) {
                                return b - a;
                            })
                            return {
                                prefix:item.prefix2,
                                volume:item.volume,
                                journal:item.journal
                            }
                        })
                        // console.log(this.journalTestList)
                        this.journalList = this.journalTestList
                        this.nextButton = false;
                        this.errorFlag = false;
                    } else {
                        this.errorFlag = true;
                    }
                    this.loadFlag = false;
                }).catch(error => {
                    console.log(error);
                })
            },
            //上一页按钮函数
            getPreData() {
                if (this.nowPage > 0) {
                    this.nowPage--;
                    this.getJournalData();
                }
            },
            //下一页按钮函数
            getNextData() {
                this.nowPage++;
                // console.log(this.nowPage);
                this.getJournalData();
            },

            getInputData(){
                this.namePrefix = this.nameValue;
                this.nowPage = 0;
                this.getJournalData();
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
            pageDetail:function () {
                if(this.pageDetail != null){
                    if(this.pageDetail.totalPages > this.nowPage + 1){
                        this.nextButton = false
                    } else {
                        this.nextButton = true;
                    }
                } else {
                    this.preButton = this.nextButton = true;
                }
            }
        },

        mounted() {
            this.getJournalData();

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
